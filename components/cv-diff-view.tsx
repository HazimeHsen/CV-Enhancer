"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AlertCircle, CheckCircle, PlusCircle, MinusCircle, Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CvDiffViewProps {
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
      explanation: string;
    }>;
  };
}

export function CvDiffView({ analysisData }: CvDiffViewProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">CV Analysis & Recommendations</h3>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="updates">Updates ({analysisData.sectionsToUpdate.length})</TabsTrigger>
            <TabsTrigger value="additions">Additions ({analysisData.sectionsToAdd.length})</TabsTrigger>
            <TabsTrigger value="removals">Removals ({analysisData.sectionsToRemove.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Overall Assessment</AlertTitle>
              <AlertDescription className="mt-2">
                {analysisData.overallAssessment}
              </AlertDescription>
            </Alert>
            
            <div className="mt-4 grid grid-cols-3 gap-4">
              <Card className="bg-blue-50">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="rounded-full bg-blue-100 p-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-center">Sections to Update</h4>
                  <p className="text-2xl font-bold text-center">{analysisData.sectionsToUpdate.length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="rounded-full bg-green-100 p-2 mb-2">
                    <PlusCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <h4 className="font-medium text-center">Sections to Add</h4>
                  <p className="text-2xl font-bold text-center">{analysisData.sectionsToAdd.length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-red-50">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="rounded-full bg-red-100 p-2 mb-2">
                    <MinusCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <h4 className="font-medium text-center">Sections to Remove</h4>
                  <p className="text-2xl font-bold text-center">{analysisData.sectionsToRemove.length}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="updates" className="mt-4">
            <Accordion type="single" collapsible className="w-full">
              {analysisData.sectionsToUpdate.map((section, index) => (
                <AccordionItem key={index} value={`update-${index}`}>
                  <AccordionTrigger className="hover:bg-gray-50 px-4 py-2 rounded-md">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                      <span>{section.sectionName}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Current Content:</h4>
                        <div className="bg-gray-100 p-3 rounded-md text-sm whitespace-pre-wrap">
                          {section.currentContent}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Recommended Content:</h4>
                        <div className="bg-green-50 border border-green-100 p-3 rounded-md text-sm whitespace-pre-wrap">
                          {section.recommendedContent}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Explanation:</h4>
                        <p className="text-sm text-gray-700">{section.explanation}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
              
              {analysisData.sectionsToUpdate.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No sections to update
                </div>
              )}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="additions" className="mt-4">
            <Accordion type="single" collapsible className="w-full">
              {analysisData.sectionsToAdd.map((section, index) => (
                <AccordionItem key={index} value={`add-${index}`}>
                  <AccordionTrigger className="hover:bg-gray-50 px-4 py-2 rounded-md">
                    <div className="flex items-center">
                      <PlusCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span>{section.sectionName}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Recommended Content:</h4>
                        <div className="bg-green-50 border border-green-100 p-3 rounded-md text-sm whitespace-pre-wrap">
                          {section.recommendedContent}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Explanation:</h4>
                        <p className="text-sm text-gray-700">{section.explanation}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
              
              {analysisData.sectionsToAdd.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No sections to add
                </div>
              )}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="removals" className="mt-4">
            <Accordion type="single" collapsible className="w-full">
              {analysisData.sectionsToRemove.map((section, index) => (
                <AccordionItem key={index} value={`remove-${index}`}>
                  <AccordionTrigger className="hover:bg-gray-50 px-4 py-2 rounded-md">
                    <div className="flex items-center">
                      <MinusCircle className="h-4 w-4 text-red-600 mr-2" />
                      <span>{section.sectionName}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Explanation:</h4>
                        <p className="text-sm text-gray-700">{section.explanation}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
              
              {analysisData.sectionsToRemove.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No sections to remove
                </div>
              )}
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
