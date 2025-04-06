"use client"

import { CvGithubAnalysis } from "./cv-github-analysis"

interface EnhancedCvProps {
  content: any
  originalFile: File | null
  originalText?: string
}

export function EnhancedCv({ content, originalFile, originalText }: EnhancedCvProps) {
  return (
    <div className="w-full">
      {typeof content === "object" ? (
        <CvGithubAnalysis analysisData={content} originalText={originalText} />
      ) : (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg">No analysis data available</div>
      )}
    </div>
  )
}

