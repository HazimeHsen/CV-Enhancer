"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, FileText, AlertCircle, BookOpen } from "lucide-react";
import { GitHubDiffView } from "./github-diff-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearningRecommendations } from "./learning-recommendations";
import { JobFieldCompatibility } from "./job-field-compatibility";

interface CvGithubAnalysisProps {
  analysisData: {
    overallAssessment: string;
    sectionsToUpdate: Array<{
      sectionName: string;
      currentContent: string;
      recommendedContent: string;
      explanation: string;
    }>;
    sectionsToAdd: Array<{
      sectionName: string;
      recommendedContent: string;
      explanation: string;
    }>;
    sectionsToRemove: Array<{
      sectionName: string;
      currentContent?: string;
      explanation: string;
    }>;
    learningRecommendations?: Array<{
      name: string;
      value: string;
      howToAcquire: string;
    }>;
    fieldCompatibility?: {
      currentField: string;
      targetField: string;
      compatibility: "high" | "medium" | "low" | "unknown";
      recommendations: string[];
    };
  };
  originalText?: string;
}

export function CvGithubAnalysis({
  analysisData,
  originalText,
}: CvGithubAnalysisProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("changes");

  const totalChanges =
    analysisData.sectionsToUpdate.length +
    analysisData.sectionsToAdd.length +
    analysisData.sectionsToRemove.length;

  const handleCopy = async () => {
    // Create a formatted string of the recommendations
    let textToCopy = `CV ANALYSIS & RECOMMENDATIONS\n\n`;
    textToCopy += `Overall Assessment:\n${analysisData.overallAssessment}\n\n`;

    if (analysisData.sectionsToUpdate.length > 0) {
      textToCopy += `SECTIONS TO UPDATE:\n\n`;
      analysisData.sectionsToUpdate.forEach((section, index) => {
        textToCopy += `${index + 1}. ${section.sectionName}\n`;
        textToCopy += `Current: ${section.currentContent}\n`;
        textToCopy += `Recommended: ${section.recommendedContent}\n`;
        textToCopy += `Explanation: ${section.explanation}\n\n`;
      });
    }

    if (analysisData.sectionsToAdd.length > 0) {
      textToCopy += `SECTIONS TO ADD:\n\n`;
      analysisData.sectionsToAdd.forEach((section, index) => {
        textToCopy += `${index + 1}. ${section.sectionName}\n`;
        textToCopy += `Recommended: ${section.recommendedContent}\n`;
        textToCopy += `Explanation: ${section.explanation}\n\n`;
      });
    }

    if (analysisData.sectionsToRemove.length > 0) {
      textToCopy += `SECTIONS TO REMOVE:\n\n`;
      analysisData.sectionsToRemove.forEach((section, index) => {
        textToCopy += `${index + 1}. ${section.sectionName}\n`;
        textToCopy += `Explanation: ${section.explanation}\n\n`;
      });
    }

    if (
      analysisData.learningRecommendations &&
      analysisData.learningRecommendations.length > 0
    ) {
      textToCopy += `LEARNING RECOMMENDATIONS:\n\n`;
      analysisData.learningRecommendations.forEach((rec, index) => {
        textToCopy += `${index + 1}. ${rec.name}\n`;
        textToCopy += `Value: ${rec.value}\n`;
        textToCopy += `How to acquire: ${rec.howToAcquire}\n\n`;
      });
    }

    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Field Compatibility */}
        {analysisData.fieldCompatibility && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-5">
            <JobFieldCompatibility
              compatibility={analysisData.fieldCompatibility.compatibility}
              currentField={analysisData.fieldCompatibility.currentField}
              targetField={analysisData.fieldCompatibility.targetField}
              recommendations={analysisData.fieldCompatibility.recommendations}
            />
          </div>
        )}

        {/* Overall Assessment */}
        <div className="bg-white p-5 rounded-lg md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium text-lg">Overall Assessment</h3>
          </div>
          <p className="text-gray-700">{analysisData.overallAssessment}</p>
        </div>
      </div>

      {/* Summary Stats & Copy Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-lg mb-6 gap-3">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-gray-600" />
          <span className="font-medium">CV Analysis</span>
          <span className="text-sm text-gray-600 ml-2">
            {totalChanges} {totalChanges === 1 ? "change" : "changes"}{" "}
            recommended
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex items-center gap-1"
        >
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

      {/* Tabs for Changes and Learning */}
      <div className="bg-white rounded-lg overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 p-0 h-12 bg-gray-100">
            <TabsTrigger
              value="changes"
              className="rounded-none data-[state=active]:bg-white"
            >
              Changes ({totalChanges})
            </TabsTrigger>
            <TabsTrigger
              value="learning"
              className="rounded-none data-[state=active]:bg-white"
            >
              <span className="flex items-center">
                Learning <BookOpen className="h-4 w-4 ml-1" />
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="changes" className="p-5 pt-6">
            {/* Grid layout for changes */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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

              {totalChanges === 0 && (
                <div className="text-center py-8 text-gray-500 col-span-full">
                  No changes recommended
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="learning" className="p-5 pt-6">
            <LearningRecommendations
              recommendations={analysisData.learningRecommendations || []}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
