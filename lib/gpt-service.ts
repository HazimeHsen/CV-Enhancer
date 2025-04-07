import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function processCV(cvText: string, jobDescription: string) {
  const prompt = `
  You are a professional resume writer and career advisor. Analyze the following resume and provide specific recommendations to improve it based on the job description. Then, write a personalized cover letter.
  
  Here is the candidate's current resume:
  
  ${cvText}
  
  And here is the job description they're applying for:
  
  ${jobDescription}
  
  PART 1: CV ANALYSIS
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
  
  PART 2: COVER LETTER
  Write a personalized cover letter with the following guidelines:
  - Format the letter properly with date, recipient info, greeting, body paragraphs, closing, and signature
  - Introduce the applicant and their interest in the position
  - Highlight the most relevant experiences and skills
  - Use information extracted directly from the CV and job description
  - Explain why the applicant is a great fit for the role
  - Include a call to action
  - Maintain a confident and professional tone
  - DO NOT include placeholders like [Company Name] or [Your Name] — extract actual details from the input
  - Length: around 300–400 words
  - Use today's date (${new Date().toLocaleDateString()})
  
  Format your response in JSON as follows:
  \`\`\`json
  {
  "enhancedCv": {
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
  },
  "coverLetter": "The full text of the cover letter"
  }
  \`\`\`
  
  Focus on making the resume more targeted to the job description, highlighting relevant skills and experiences, and using strong action verbs and quantifiable achievements.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume analyst and professional resume writer. You provide detailed, actionable feedback to improve resumes for specific job applications and write personalized cover letters.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      response_format: { type: "json_object" },
      max_tokens: 3000,
    });

    const content = response.choices[0].message.content || "";

    try {
      const result = JSON.parse(content);

      return result;
    } catch (error) {
      console.error("Error parsing GPT response:", error);

      // Fallback: If JSON parsing fails, return a simplified structure
      return {
        enhancedCv: {
          overallAssessment:
            "Unable to parse the full analysis. Please try again.",
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
        },
        coverLetter:
          "We encountered an error generating your cover letter. Please try again.",
        rawResponse: content, // Include the raw response for debugging
      };
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error(
      "Failed to process CV: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
}
