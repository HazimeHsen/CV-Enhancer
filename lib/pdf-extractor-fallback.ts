export async function extractTextFromBase64PdfFallback(
  base64: string
): Promise<string> {
  try {
    const pdfText = atob(base64);

    const textRegex = /BT\s*(.*?)\s*ET/gs;
    const matches = [...pdfText.matchAll(textRegex)];

    if (matches.length === 0) {
      return "Could not extract text from PDF. Please try a different file or manually enter the CV content.";
    }

    const extractedText = matches
      .map((match) => {
        const textContent = match[1].replace(/\[$$(.*?)$$\]/g, "$1");
        return textContent;
      })
      .join("\n");

    return (
      extractedText || "Text extraction completed, but content may be limited."
    );
  } catch (error) {
    console.error("Error in fallback PDF extraction:", error);
    return "PDF text extraction failed. Please try a different file.";
  }
}
