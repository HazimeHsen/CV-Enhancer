"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { FileText, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploaderProps {
  file: File | null
  setFile: (file: File | null) => void
}

export function FileUploader({ file, setFile }: FileUploaderProps) {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null)

      if (acceptedFiles.length === 0) {
        return
      }

      const selectedFile = acceptedFiles[0]

      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a PDF file")
        return
      }

      setFile(selectedFile)
    },
    [setFile],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  })

  const removeFile = () => {
    setFile(null)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Upload Your CV</h2>

      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="text-sm text-gray-600">Drag & drop your CV here, or click to select a file</p>
            <p className="text-xs text-gray-500">PDF only (max 10MB)</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={removeFile} className="text-gray-500 hover:text-red-500">
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

