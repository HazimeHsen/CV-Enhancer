import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function enhanceCvWithGpt(cvText: string, jobDescription: string) {
  const prompt = `
You are a professional resume writer and career advisor. Analyze the following resume and provide specific recommendations to improve it based on the job description.

Here is the candidate's current resume:

${cvText}

And here is the job description they're applying for:

${jobDescription}

Please provide your analysis in the following format:

1. First, provide a brief overall assessment of the resume (2-3 sentences).

2. Then, for each section that needs improvement, provide:
 - The section name (e.g., "Summary", "Experience", "Skills", etc.)
 - What's currently in the resume for this section
 - Your recommended replacement text
 - A brief explanation of why this change improves the resume (1-2 sentences)

3. If any new sections should be added, specify:
 - The new section name
 - The recommended content
 - Why this section should be added

4. If any sections should be removed, specify:
 - The section name
 - Why it should be removed

5. Provide learning recommendations:
 - Identify 3-5 specific skills, certifications, or qualifications that would make the candidate more competitive for this role
 - For each recommendation, provide:
   - The name of the skill/certification/qualification
   - Why it's valuable for this role
   - A brief suggestion on how to acquire it (e.g., specific course, certification program, etc.)

6. Analyze field compatibility:
 - Determine the candidate's current field/profession based on their resume
 - Determine the field/profession of the job they're applying for
 - Rate the compatibility as "high", "medium", or "low"
 - Provide 2-3 specific recommendations for addressing any field mismatch

Format your response in JSON as follows:
\`\`\`json
{
"overallAssessment": "Brief assessment of the resume",
"sectionsToUpdate": [
  {
    "sectionName": "Section name",
    "currentContent": "Current content in the resume",
    "recommendedContent": "Recommended replacement",
    "explanation": "Why this change improves the resume"
  }
],
"sectionsToAdd": [
  {
    "sectionName": "New section name",
    "recommendedContent": "Recommended content",
    "explanation": "Why this section should be added"
  }
],
"sectionsToRemove": [
  {
    "sectionName": "Section to remove",
    "explanation": "Why this section should be removed"
  }
],
"learningRecommendations": [
  {
    "name": "Skill/certification/qualification name",
    "value": "Why it's valuable for this role",
    "howToAcquire": "How to acquire this skill/certification"
  }
],
"fieldCompatibility": {
  "currentField": "Candidate's current field/profession",
  "targetField": "Field/profession of the job",
  "compatibility": "high/medium/low",
  "recommendations": [
    "Specific recommendation for addressing field mismatch"
  ]
}
}
\`\`\`

Focus on making the resume more targeted to the job description, highlighting relevant skills and experiences, and using strong action verbs and quantifiable achievements.
`

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo", // Use gpt-4-turbo which supports response_format
    messages: [
      {
        role: "system",
        content:
          "You are an expert resume analyst and professional resume writer. You provide detailed, actionable feedback to improve resumes for specific job applications.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    response_format: { type: "json_object" },
  })

  const content = response.choices[0].message.content || ""

  try {
    // Parse the JSON response
    return JSON.parse(content)
  } catch (error) {
    console.error("Error parsing GPT response:", error)

    // Fallback: If JSON parsing fails, return a simplified structure
    return {
      overallAssessment: "Unable to parse the full analysis. Please try again.",
      sectionsToUpdate: [],
      sectionsToAdd: [],
      sectionsToRemove: [],
      learningRecommendations: [],
      fieldCompatibility: {
        currentField: "Unknown",
        targetField: "Unknown",
        compatibility: "unknown",
        recommendations: [],
      },
      rawResponse: content, // Include the raw response for debugging
    }
  }
}

export async function generateCoverLetterWithGpt(cvText: string, jobDescription: string): Promise<string> {
  const prompt = `
Write a personalized cover letter using the following details:

CV:
${cvText}

Job Description:
${jobDescription}

Guidelines:
- Format the letter properly with date, recipient info, greeting, body paragraphs, closing, and signature
- Introduce the applicant and their interest in the position
- Highlight the most relevant experiences and skills
- Use information extracted directly from the CV and job description
- Explain why the applicant is a great fit for the role
- Include a call to action
- Maintain a confident and professional tone
- DO NOT include placeholders like [Company Name] or [Your Name] — extract actual details from the input
- Length: around 300–400 words
- Return only the cover letter text, cleanly formatted
- Use today's date (${new Date().toLocaleDateString()})
`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that writes fully personalized cover letters without using placeholders.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    return completion.choices[0]?.message.content?.trim() ?? "No response."
  } catch (error) {
    console.error("Error generating cover letter with GPT:", error)
    throw new Error("Failed to generate cover letter: " + (error instanceof Error ? error.message : "Unknown error"))
  }
}

