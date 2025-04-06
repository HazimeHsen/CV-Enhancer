// Fallback PDF text extraction using a simpler approach
export async function extractTextFromBase64PdfFallback(base64: string): Promise<string> {
  try {
    // This is a simplified approach that may not work for all PDFs
    // but can serve as a fallback when pdf-parse fails

    // Look for text objects in the PDF
    const pdfText = atob(base64)

    // Extract text between BT (Begin Text) and ET (End Text) markers
    const textRegex = /BT\s*(.*?)\s*ET/gs
    const matches = [...pdfText.matchAll(textRegex)]

    if (matches.length === 0) {
      return "Could not extract text from PDF. Please try a different file or manually enter the CV content."
    }

    // Extract text content from matches
    const extractedText = matches
      .map((match) => {
        // Try to extract text content
        const textContent = match[1].replace(/\[$$(.*?)$$\]/g, "$1")
        return textContent
      })
      .join("\n")

    return extractedText || "Text extraction completed, but content may be limited."
  } catch (error) {
    console.error("Error in fallback PDF extraction:", error)
    return "PDF text extraction failed. Please try a different file."
  }
}

