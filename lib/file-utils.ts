/**
 * Downloads content as a text file with the specified filename
 */
export function downloadAsFile(content: string, filename: string, fileType: "txt" = "txt") {
    try {
      // Create a Blob with the content
      const blob = new Blob([content], { type: "text/plain" })
  
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob)
  
      // Create a temporary anchor element
      const a = document.createElement("a")
      a.href = url
      a.download = `${filename}.${fileType}`
  
      // Append to the document, click, and remove
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
  
      // Release the URL object
      URL.revokeObjectURL(url)
  
      return true
    } catch (error) {
      console.error(`Error downloading file:`, error)
      return false
    }
  }
  
  