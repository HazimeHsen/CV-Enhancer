import { type NextRequest, NextResponse } from "next/server"
import { extractTextFromBase64Pdf } from "@/lib/pdf-extractor"
import { extractTextFromBase64PdfFallback } from "@/lib/pdf-extractor-fallback"
import { enhanceCvWithGpt, generateCoverLetterWithGpt } from "@/lib/gpt-service"

export async function POST(request: NextRequest) {
  try {
    // Parse JSON request
    const { cvBase64, fileName, fileType, jobDescription } = await request.json()

    console.log("Received request:", {
      fileName,
      fileType,
      jobDescriptionLength: jobDescription?.length,
      base64Length: cvBase64?.length,
    })

    if (!cvBase64 || !jobDescription) {
      return NextResponse.json({ error: "CV file and job description are required" }, { status: 400 })
    }

    // Try to extract text from PDF (base64)
    let cvText = ""
    try {
      cvText = await extractTextFromBase64Pdf(cvBase64)
    } catch (pdfError) {
      console.error("Primary PDF extraction failed, trying fallback:", pdfError)
      // Try fallback method if primary fails
      cvText = await extractTextFromBase64PdfFallback(cvBase64)
    }

    if (!cvText || cvText.trim() === "") {
      return NextResponse.json(
        { error: "Could not extract text from the PDF file. Please try a different file or format." },
        { status: 400 },
      )
    }

    console.log("Extracted CV text length:", cvText.length)

    // Use GPT to enhance CV and generate cover letter
    try {
      // Use GPT to enhance CV and generate cover letter
      const enhancedCv = await enhanceCvWithGpt(cvText, jobDescription)
      const coverLetter = await generateCoverLetterWithGpt(cvText, jobDescription)

      console.log("Generated content:", {
        enhancedCvType: typeof enhancedCv,
        coverLetterLength: coverLetter.length,
      })

      return NextResponse.json({
        enhancedCv,
        coverLetter,
        originalCvText: cvText,
        success: true,
      })
    } catch (error) {
      console.error("Error processing CV:", error)

      // Provide more detailed error information
      const errorMessage = error instanceof Error ? error.message : "Failed to process CV"
      const errorDetails = error instanceof Error && error.cause ? JSON.stringify(error.cause) : undefined

      return NextResponse.json(
        {
          error: errorMessage,
          details: errorDetails,
          stack:
            process.env.NODE_ENV === "development" ? (error instanceof Error ? error.stack : undefined) : undefined,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error processing CV:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to process CV",
      },
      { status: 500 },
    )
  }
}

