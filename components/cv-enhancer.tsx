"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
    <Card className="">
      <CardContent className="p-6">
        {activeTab === "upload" ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center mb-6">Upload Your CV & Job Description</h2>

            <FileUploader file={file} setFile={setFile} />

            <JobDescriptionForm jobDescription={jobDescription} setJobDescription={setJobDescription} />

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between mt-6">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Button onClick={handleSubmit} disabled={!isFormComplete || status === "processing"}>
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
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("upload")}
                className="flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Upload
              </Button>

              <Tabs value={activeResultTab} onValueChange={setActiveResultTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="cv">CV Analysis</TabsTrigger>
                  <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
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
      </CardContent>
    </Card>
  )
}

