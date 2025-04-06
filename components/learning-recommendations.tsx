"use client"

import { Badge } from "@/components/ui/badge"
import { BookOpen, Award, ExternalLink } from "lucide-react"

interface LearningRecommendation {
  name: string
  value: string
  howToAcquire: string
}

interface LearningRecommendationsProps {
  recommendations: LearningRecommendation[]
}

export function LearningRecommendations({ recommendations }: LearningRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) {
    return <div className="text-center py-8 text-gray-500">No learning recommendations available</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-medium">Learning Recommendations</h3>
      </div>

      <div className="space-y-6">
        {recommendations.map((rec, index) => (
          <div key={index} className="bg-white border border-gray-100 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-gray-50">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">{rec.name}</h3>
              </div>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">Recommended</Badge>
            </div>

            <div className="p-3">
              <p className="text-gray-700 mb-3">{rec.value}</p>

              <div className="mt-3">
                <div className="flex items-center gap-1 text-blue-700 font-medium mb-1">
                  <ExternalLink className="h-4 w-4" />
                  How to acquire:
                </div>
                <p className="text-gray-600 text-sm">{rec.howToAcquire}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

