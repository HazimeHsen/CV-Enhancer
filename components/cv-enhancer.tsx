"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "./file-uploader"
import { JobDescriptionForm } from "./job-description-form"
import { EnhancedCv } from "./enhanced-cv"
import { CoverLetter } from "./cover-letter"
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

type ProcessingStatus = "idle" | "processing" | "complete" | "error"

interface ApiResponse {
  enhancedCv: any
  coverLetter: string
  originalCvText?: string
  success?: boolean
  error?: string
}

export function CvEnhancer() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [status, setStatus] = useState<ProcessingStatus>("idle")
  const [enhancedCv, setEnhancedCv] = useState<any>(null)
  const [coverLetter, setCoverLetter] = useState("")
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("upload")
  const [originalCvText, setOriginalCvText] = useState("")
  const [activeResultTab, setActiveResultTab] = useState("cv")
  const [useEconomyMode, setUseEconomyMode] = useState(true)

  const handleSubmit = async () => {
    if (!file || !jobDescription) {
      setError("Please upload a CV and provide a job description")
      return
    }

    try {
      setStatus("processing")
      setError("")

      // Convert file to base64
      const fileBase64 = await fileToBase64(file)

      console.log("Sending request with file:", {
        name: file.name,
        type: file.type,
        size: file.size,
        base64Length: fileBase64.length,
      })

      // Send as JSON with axios
      const response = await axios.post<ApiResponse>(
        "/api/enhance",
        {
          cvBase64: fileBase64,
          fileName: file.name,
          fileType: file.type,
          jobDescription,
          mode: useEconomyMode ? "economy" : "premium",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          // Increase timeout for large files and processing time
          timeout: 120000, // 2 minutes
        },
      )

      const data = response.data

      if (data.error) {
        throw new Error(data.error)
      }

      if (!data.enhancedCv || !data.coverLetter) {
        throw new Error("Invalid response from server: Missing enhanced CV or cover letter")
      }

      setEnhancedCv(data.enhancedCv)
      setCoverLetter(data.coverLetter)
      setOriginalCvText(data.originalCvText || "")
      setStatus("complete")
      setActiveTab("results")
    } catch (err: any) {
      console.error("Error:", err)
      setStatus("error")

      // Handle axios errors specifically
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(`Server error: ${err.response.data?.error || err.message}`)
        } else if (err.request) {
          // The request was made but no response was received
          setError("No response from server. Please try again later.")
        } else {
          // Something happened in setting up the request that triggered an Error
          setError(`Request error: ${err.message}`)
        }
      } else {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      }
    }
  }

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === "string") {
          // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
          const base64 = reader.result.split(",")[1]
          resolve(base64)
        } else {
          reject(new Error("Failed to convert file to base64"))
        }
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const isFormComplete = !!file && !!jobDescription

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      {activeTab === "upload" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Upload Your CV</h2>
            <FileUploader file={file} setFile={setFile} />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Job Description</h2>
            <JobDescriptionForm jobDescription={jobDescription} setJobDescription={setJobDescription} />
          </div>

          <div className="md:col-span-2">
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200 mb-4">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex items-center justify-between border rounded-md p-4 bg-gray-50 mb-4">
              <div>
                <h3 className="font-medium">Processing Mode</h3>
                <p className="text-sm text-gray-500">
                  Economy mode uses GPT-3.5 (faster, more affordable). Premium mode uses GPT-4 (higher quality, more
                  expensive).
                </p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={!useEconomyMode}
                    onChange={() => setUseEconomyMode(!useEconomyMode)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {useEconomyMode ? "Economy" : "Premium"}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Button
                onClick={handleSubmit}
                disabled={!isFormComplete || status === "processing"}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {status === "processing" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Analyze CV & Generate Cover Letter"
                )}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("upload")}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Upload
            </Button>

            <Tabs value={activeResultTab} onValueChange={setActiveResultTab} className="w-full sm:w-auto">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="cv" className="data-[state=active]:bg-white">
                  CV Analysis
                </TabsTrigger>
                <TabsTrigger value="cover-letter" className="data-[state=active]:bg-white">
                  Cover Letter
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {activeResultTab === "cv" ? (
            <EnhancedCv content={enhancedCv} originalFile={file} originalText={originalCvText} />
          ) : (
            <CoverLetter content={coverLetter} />
          )}
        </div>
      )}
    </div>
  )
}

