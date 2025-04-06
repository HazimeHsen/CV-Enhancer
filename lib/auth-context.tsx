"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  type User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  applyActionCode,
  confirmPasswordReset,
  onIdTokenChanged,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import LoadingScreen from "@/components/loading-screen";

export interface User {
  uid: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  provider: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (actionCode: string) => Promise<void>;
  confirmResetPassword: (
    actionCode: string,
    newPassword: string
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUpWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signUpWithGithub: () => Promise<void>;
  updateUserProfile: (
    firstName: string,
    lastName: string,
    photoURL?: string
  ) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to convert Firebase user to our User type
const formatUser = async (user: FirebaseUser | null): Promise<User | null> => {
  if (!user) return null;

  // Try to get additional user data from Firestore
  let firstName = null;
  let lastName = null;
  let provider = null;
  let emailVerified = null;

  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      firstName = userData.firstName || null;
      lastName = userData.lastName || null;
      provider = userData.provider || null;
      emailVerified = userData.emailVerified || user.emailVerified;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  return {
    uid: user.uid,
    email: user.email,
    firstName,
    lastName,
    emailVerified,
    photoURL: user.photoURL,
    provider,
  };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(user);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const formattedUser = await formatUser(firebaseUser);
      setUser(formattedUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen for token changes and store in cookie for server-side auth
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get the token
        const token = await firebaseUser.getIdToken();

        // Store it in a cookie (for server-side auth if needed)
        document.cookie = `firebase-auth-token=${token}; path=/; max-age=3600; SameSite=Strict; Secure`;
      } else {
        // Remove the cookie when signed out
        document.cookie =
          "firebase-auth-token=; path=/; max-age=0; SameSite=Strict; Secure";
      }
    });

    return () => unsubscribe();
  }, []);

  // Refresh token periodically
  useEffect(() => {
    const refreshToken = setInterval(async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Force token refresh
        await currentUser.getIdToken(true);
      }
    }, 10 * 60 * 1000); // Refresh every 10 minutes

    return () => clearInterval(refreshToken);
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        firstName: firstName || "",
        lastName: lastName || "",
        provider: "email",
        createdAt: new Date().toISOString(),
      });

      await sendEmailVerification(userCredential.user);

      const formattedUser = await formatUser(userCredential.user);
      setUser(formattedUser);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      // Use the new manage-user page with mode=resetPassword
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/sign-in`,
        handleCodeInApp: false,
      });
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  };

  // Verify email
  const verifyEmail = async (actionCode: string) => {
    try {
      await applyActionCode(auth, actionCode);

      // Refresh the user to get updated emailVerified status
      if (auth.currentUser) {
        await auth.currentUser.reload();
        const formattedUser = await formatUser(auth.currentUser);
        setUser(formattedUser);
      }
    } catch (error) {
      console.error("Verify email error:", error);
      throw error;
    }
  };

  // Confirm password reset
  const confirmResetPassword = async (
    actionCode: string,
    newPassword: string
  ) => {
    try {
      await confirmPasswordReset(auth, actionCode, newPassword);
    } catch (error) {
      console.error("Confirm reset password error:", error);
      throw error;
    }
  };

  // Sign in with Google - for existing users only
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();

      // Try to sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.email) {
        throw new Error("Failed to get email from Google account");
      }

      // Check if this user exists in our system
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        // User doesn't exist in our system
        await firebaseSignOut(auth);
        throw new Error(
          "No account found with this Google account. Please sign up first."
        );
      }

      // User exists, check if they registered with Google
      const userData = userDoc.data();
      if (userData.provider !== "google") {
        // User exists but registered with a different provider
        await firebaseSignOut(auth);
        throw new Error(
          `This email is registered with ${userData.provider}. Please use ${userData.provider} to sign in.`
        );
      }

      // User exists and registered with Google, proceed with sign in
      // No need to do anything else, Firebase has already signed them in
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    }
  };

  // Sign up with Google - for new users only
  const signUpWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();

      // Try to sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (!user.email) {
        throw new Error("Failed to get email from Google account");
      }

      // Check if this user already exists in our system
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        // User already exists
        await firebaseSignOut(auth);
        throw new Error(
          "This Google account is already registered. Please sign in instead."
        );
      }

      // Try to extract first and last name from display name
      let firstName = "";
      let lastName = "";

      if (user.displayName) {
        const nameParts = user.displayName.split(" ");
        firstName = nameParts[0] || "";
        lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
      }

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
        photoURL: user.photoURL,
        provider: "google",
        emailVerified: true,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Google sign up error:", error);
      throw error;
    }
  };

  // Sign in with GitHub - for existing users only
  const signInWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();

      // Try to sign in with GitHub
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if this user exists in our system
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        // User doesn't exist in our system
        await firebaseSignOut(auth);
        throw new Error(
          "No account found with this GitHub account. Please sign up first."
        );
      }

      // User exists, check if they registered with GitHub
      const userData = userDoc.data();
      if (userData.provider !== "github") {
        // User exists but registered with a different provider
        await firebaseSignOut(auth);
        throw new Error(
          `This email is registered with ${userData.provider}. Please use ${userData.provider} to sign in.`
        );
      }

      // User exists and registered with GitHub, proceed with sign in
      // No need to do anything else, Firebase has already signed them in
    } catch (error) {
      console.error("GitHub sign in error:", error);
      throw error;
    }
  };

  // Sign up with GitHub - for new users only
  const signUpWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();

      // Try to sign in with GitHub
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if this user already exists in our system
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        // User already exists
        await firebaseSignOut(auth);
        throw new Error(
          "This GitHub account is already registered. Please sign in instead."
        );
      }

      // Try to extract first and last name from display name
      let firstName = "";
      let lastName = "";

      if (user.displayName) {
        const nameParts = user.displayName.split(" ");
        firstName = nameParts[0] || "";
        lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
      }

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
        photoURL: user.photoURL,
        provider: "github",
        emailVerified: true,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("GitHub sign up error:", error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (
    firstName: string,
    lastName: string,
    photoURL?: string
  ) => {
    try {
      if (auth.currentUser) {
        // Only update photoURL in Firebase profile, not displayName
        await updateProfile(auth.currentUser, {
          photoURL: photoURL || auth.currentUser.photoURL,
        });

        // Update Firestore document
        await setDoc(
          doc(db, "users", auth.currentUser.uid),
          {
            firstName,
            lastName,
            photoURL: photoURL || auth.currentUser.photoURL,
          },
          { merge: true }
        );

        // Update local user state
        const formattedUser = await formatUser(auth.currentUser);
        setUser(formattedUser);
      } else {
        throw new Error("No user is signed in");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  // Send verification email
  const sendVerificationEmail = async () => {
    try {
      if (auth.currentUser) {
        // Use the new manage-user page with mode=verifyEmail
        await sendEmailVerification(auth.currentUser);
      } else {
        throw new Error("No user is signed in");
      }
    } catch (error) {
      console.error("Send verification email error:", error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    verifyEmail,
    confirmResetPassword,
    signInWithGoogle,
    signUpWithGoogle,
    signInWithGithub,
    signUpWithGithub,
    updateUserProfile,
    sendVerificationEmail,
  };

  if (!user && isLoading) return <LoadingScreen />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
