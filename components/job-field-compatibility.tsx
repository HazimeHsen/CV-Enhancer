"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react"

interface JobFieldCompatibilityProps {
  compatibility: "high" | "medium" | "low" | "unknown"
  currentField: string
  targetField: string
  recommendations?: string[]
}

export function JobFieldCompatibility({
  compatibility,
  currentField,
  targetField,
  recommendations = [],
}: JobFieldCompatibilityProps) {
  const getCompatibilityDetails = () => {
    switch (compatibility) {
      case "high":
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          title: "Good Field Match",
          description: `Your background in ${currentField} aligns well with this ${targetField} position.`,
          badgeColor: "bg-green-100 text-green-800 border-green-200",
          alertColor: "bg-green-50 border-green-200",
        }
      case "medium":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
          title: "Partial Field Match",
          description: `Your background in ${currentField} has some overlap with this ${targetField} position, but you may need to highlight transferable skills.`,
          badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
          alertColor: "bg-amber-50 border-amber-200",
        }
      case "low":
        return {
          icon: <AlertCircle className="h-5 w-5 text-red-500" />,
          title: "Field Mismatch",
          description: `Your background in ${currentField} is different from this ${targetField} position. Focus on transferable skills and relevant projects.`,
          badgeColor: "bg-red-100 text-red-800 border-red-200",
          alertColor: "bg-red-50 border-red-200",
        }
      default:
        return {
          icon: <HelpCircle className="h-5 w-5 text-blue-500" />,
          title: "Field Compatibility Unknown",
          description: "We couldn't determine the compatibility between your background and this position.",
          badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
          alertColor: "bg-blue-50 border-blue-200",
        }
    }
  }

  const details = getCompatibilityDetails()

  return (
    <Card className="">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {details.icon}
          <span>Field Compatibility</span>
          <Badge className={`ml-2 ${details.badgeColor}`}>
            {compatibility === "high"
              ? "High"
              : compatibility === "medium"
                ? "Medium"
                : compatibility === "low"
                  ? "Low"
                  : "Unknown"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className={`${details.alertColor} mb-4`}>
          <AlertTitle className="font-medium">{details.title}</AlertTitle>
          <AlertDescription>{details.description}</AlertDescription>
        </Alert>

        {recommendations.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Recommendations:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

