"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface JobDescriptionFormProps {
  jobDescription: string
  setJobDescription: (description: string) => void
}

export function JobDescriptionForm({ jobDescription, setJobDescription }: JobDescriptionFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="job-description">Job Description</Label>
        <Textarea
          id="job-description"
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="min-h-[200px]"
        />
      </div>
    </div>
  )
}

