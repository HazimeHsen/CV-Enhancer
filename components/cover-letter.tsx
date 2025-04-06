"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Check, Download } from "lucide-react"

interface CoverLetterProps {
  content: string
}

export function CoverLetter({ content }: CoverLetterProps) {
  const [copied, setCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadAsFile = (content: string, filename: string, fileType = "txt") => {
    try {
      // Create a Blob with the content
      const blob = new Blob([content], { type: "text/plain" })

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob)

      // Create a temporary anchor element
      const a = document.createElement("a")
      a.href = url
      a.download = `${filename}.${fileType}`

      // Append to the document, click, and remove
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // Release the URL object
      URL.revokeObjectURL(url)

      return true
    } catch (error) {
      console.error(`Error downloading file:`, error)
      return false
    }
  }

  const handleDownload = async (fileType: "txt") => {
    try {
      setIsDownloading(true)
      downloadAsFile(content, "cover-letter", fileType)
    } catch (error) {
      console.error("Error downloading cover letter:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Card className="border-none">
      <CardContent className="pt-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Cover Letter</h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownload("txt")}
              disabled={isDownloading}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download"}
            </Button>

            <Button variant="outline" size="sm" onClick={handleCopy} className="flex items-center gap-1">
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap bg-gray-50 p-4 text-sm font-mono">{content}</div>
        </div>
      </CardContent>
    </Card>
  )
}

