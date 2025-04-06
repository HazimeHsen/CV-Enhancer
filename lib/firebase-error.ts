import { FirebaseError } from "firebase/app"

export function getFirebaseErrorMessage(error: unknown): string {
  // Handle custom errors
  if (error instanceof Error && !(error instanceof FirebaseError)) {
    // Check for provider-specific errors
    if (error.message.includes("registered with")) {
      return error.message
    }
    return error.message
  }

  if (!(error instanceof FirebaseError)) {
    return "An unexpected error occurred. Please try again."
  }

  switch (error.code) {
    // Auth errors
    case "auth/email-already-in-use":
      return "This email is already in use. Please sign in or use a different email."
    case "auth/invalid-email":
      return "Invalid email address format."
    case "auth/user-disabled":
      return "This account has been disabled."
    case "auth/user-not-found":
      return "No account found with this email address."
    case "auth/wrong-password":
      return "Invalid email or password."
    case "auth/weak-password":
      return "Password is too weak. Please use a stronger password."
    case "auth/invalid-action-code":
      return "The link is invalid or has expired. Please request a new one."
    case "auth/popup-closed-by-user":
      return "" // Don't show an error when user closes the popup
    case "auth/too-many-requests":
      return "Too many requests. Please try again later."
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection and try again."
    case "auth/requires-recent-login":
      return "This operation requires a recent login. Please sign in again."
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email address but different sign-in credentials. Please sign in using the original provider."

    // Firestore errors
    case "permission-denied":
      return "You do not have permission to perform this action."
    case "unavailable":
      return "The service is currently unavailable. Please try again later."

    // Default
    default:
      return `An error occurred (${error.code}). Please try again.`
  }
}

