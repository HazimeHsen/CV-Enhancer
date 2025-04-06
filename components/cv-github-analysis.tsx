"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, FileText, AlertCircle, BookOpen } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { GitHubDiffView } from "./github-diff-view"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LearningRecommendations } from "./learning-recommendations"
import { JobFieldCompatibility } from "./job-field-compatibility"

interface CvGithubAnalysisProps {
  analysisData: {
    overallAssessment: string
    sectionsToUpdate: Array<{
      sectionName: string
      currentContent: string
      recommendedContent: string
      explanation: string
    }>
    sectionsToAdd: Array<{
      sectionName: string
      recommendedContent: string
      explanation: string
    }>
    sectionsToRemove: Array<{
      sectionName: string
      currentContent?: string
      explanation: string
    }>
    learningRecommendations?: Array<{
      name: string
      value: string
      howToAcquire: string
    }>
    fieldCompatibility?: {
      currentField: string
      targetField: string
      compatibility: "high" | "medium" | "low" | "unknown"
      recommendations: string[]
    }
  }
  originalText?: string
}

export function CvGithubAnalysis({ analysisData, originalText }: CvGithubAnalysisProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("changes")

  const totalChanges =
    analysisData.sectionsToUpdate.length + analysisData.sectionsToAdd.length + analysisData.sectionsToRemove.length

  const handleCopy = async () => {
    // Create a formatted string of the recommendations
    let textToCopy = `CV ANALYSIS & RECOMMENDATIONS\n\n`
    textToCopy += `Overall Assessment:\n${analysisData.overallAssessment}\n\n`

    if (analysisData.sectionsToUpdate.length > 0) {
      textToCopy += `SECTIONS TO UPDATE:\n\n`
      analysisData.sectionsToUpdate.forEach((section, index) => {
        textToCopy += `${index + 1}. ${section.sectionName}\n`
        textToCopy += `Current: ${section.currentContent}\n`
        textToCopy += `Recommended: ${section.recommendedContent}\n`
        textToCopy += `Explanation: ${section.explanation}\n\n`
      })
    }

    if (analysisData.sectionsToAdd.length > 0) {
      textToCopy += `SECTIONS TO ADD:\n\n`
      analysisData.sectionsToAdd.forEach((section, index) => {
        textToCopy += `${index + 1}. ${section.sectionName}\n`
        textToCopy += `Recommended: ${section.recommendedContent}\n`
        textToCopy += `Explanation: ${section.explanation}\n\n`
      })
    }

    if (analysisData.sectionsToRemove.length > 0) {
      textToCopy += `SECTIONS TO REMOVE:\n\n`
      analysisData.sectionsToRemove.forEach((section, index) => {
        textToCopy += `${index + 1}. ${section.sectionName}\n`
        textToCopy += `Explanation: ${section.explanation}\n\n`
      })
    }

    if (analysisData.learningRecommendations && analysisData.learningRecommendations.length > 0) {
      textToCopy += `LEARNING RECOMMENDATIONS:\n\n`
      analysisData.learningRecommendations.forEach((rec, index) => {
        textToCopy += `${index + 1}. ${rec.name}\n`
        textToCopy += `Value: ${rec.value}\n`
        textToCopy += `How to acquire: ${rec.howToAcquire}\n\n`
      })
    }

    await navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {analysisData.fieldCompatibility && (
        <JobFieldCompatibility
          compatibility={analysisData.fieldCompatibility.compatibility}
          currentField={analysisData.fieldCompatibility.currentField}
          targetField={analysisData.fieldCompatibility.targetField}
          recommendations={analysisData.fieldCompatibility.recommendations}
        />
      )}

      <Alert className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 stroke-blue-80" />
        <AlertTitle className="text-blue-800">Overall Assessment</AlertTitle>
        <AlertDescription className="text-blue-800">{analysisData.overallAssessment}</AlertDescription>
      </Alert>

      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md border">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-gray-600" />
          <span className="font-medium">CV Analysis</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-600">Changes:</span>
            <span className="font-medium">{totalChanges}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleCopy} className="flex items-center gap-1">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy All</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="changes">Changes ({totalChanges})</TabsTrigger>
          <TabsTrigger value="learning">
            Learning <BookOpen className="h-4 w-4 ml-1" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="changes" className="pt-4">
          <div className="space-y-4">
            {analysisData.sectionsToUpdate.map((section, index) => (
              <GitHubDiffView
                key={`update-${index}`}
                type="update"
                sectionName={section.sectionName}
                currentContent={section.currentContent}
                recommendedContent={section.recommendedContent}
                explanation={section.explanation}
              />
            ))}

            {analysisData.sectionsToAdd.map((section, index) => (
              <GitHubDiffView
                key={`add-${index}`}
                type="add"
                sectionName={section.sectionName}
                recommendedContent={section.recommendedContent}
                explanation={section.explanation}
              />
            ))}

            {analysisData.sectionsToRemove.map((section, index) => (
              <GitHubDiffView
                key={`remove-${index}`}
                type="remove"
                sectionName={section.sectionName}
                currentContent={section.currentContent || ""}
                explanation={section.explanation}
              />
            ))}

            {totalChanges === 0 && <div className="text-center py-8 text-gray-500">No changes recommended</div>}
          </div>
        </TabsContent>

        <TabsContent value="learning" className="pt-4">
          <LearningRecommendations recommendations={analysisData.learningRecommendations || []} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

