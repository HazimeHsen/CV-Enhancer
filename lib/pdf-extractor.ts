import pdfParse from "pdf-parse/lib/pdf-parse"

export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Use the direct import of pdf-parse to avoid test file issues
    const data = await pdfParse(buffer)

    return data.text || ""
  } catch (error) {
    console.error("Error extracting text from PDF:", error)
    throw new Error("Failed to extract text from PDF: " + (error instanceof Error ? error.message : "Unknown error"))
  }
}

export async function extractTextFromBase64Pdf(base64: string): Promise<string> {
  try {
    // Convert base64 to buffer
    const buffer = Buffer.from(base64, "base64")

    // Use the direct import of pdf-parse to avoid test file issues
    const data = await pdfParse(buffer)

    return data.text || ""
  } catch (error) {
    console.error("Error extracting text from base64 PDF:", error)
    throw new Error("Failed to extract text from PDF: " + (error instanceof Error ? error.message : "Unknown error"))
  }
}

