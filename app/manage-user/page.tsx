"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  Mail,
  ArrowRight,
} from "lucide-react";
import { getFirebaseErrorMessage } from "@/lib/firebase-error";

export default function ManageUserPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [mode, setMode] = useState<"verifyEmail" | "resetPassword" | null>(
    null
  );
  const verificationProcessed = useRef(false);

  const { user, verifyEmail, confirmResetPassword, sendVerificationEmail } =
    useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const oobCode = searchParams.get("oobCode");
  const modeParam = searchParams.get("mode");

  useEffect(() => {
    if (modeParam === "verifyEmail") {
      setMode("verifyEmail");

      if (oobCode && !verificationProcessed.current) {
        verificationProcessed.current = true;
        handleVerifyEmail(oobCode);
      } else {
        setIsLoading(false);
      }
    } else if (modeParam === "resetPassword") {
      setMode("resetPassword");
      setIsLoading(false);
    } else {
      setError("Invalid request. Please use the link sent to your email.");
      setIsLoading(false);
    }
  }, [modeParam, oobCode]);

  const handleVerifyEmail = async (code: string) => {
    setIsProcessing(true);
    try {
      await verifyEmail(code);
      setIsComplete(true);
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setIsProcessing(false);
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!oobCode) {
      setError("Invalid reset code");
      return;
    }

    setIsProcessing(true);

    try {
      await confirmResetPassword(oobCode, password);
      setIsComplete(true);
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResendVerification = async () => {
    setError("");
    setIsProcessing(true);

    try {
      await sendVerificationEmail();
      alert("Verification email has been resent. Please check your inbox.");
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-stretch bg-white">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {mode === "verifyEmail" && (
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                Verify your email
              </h1>
              <p className="mt-2 text-gray-600">
                We need to verify your email address to complete your account
                setup
              </p>
            </div>
          )}

          {mode === "resetPassword" && (
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900">
                Reset your password
              </h1>
              <p className="mt-2 text-gray-600">
                Enter a new password for your account
              </p>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {mode === "verifyEmail" &&
            (isComplete ? (
              <div className="text-center py-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Email verified
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Your email has been verified successfully. You can now access
                  all features of your account.
                </p>
                <div className="mt-6">
                  <Link href="/dashboard">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800">
                      Go to dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Check your inbox
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  We've sent a verification link to{" "}
                  {user?.email || "your email"}. Please check your inbox and
                  click the link to verify your email address.
                </p>
                <div className="mt-6 space-y-3">
                  <Button
                    onClick={handleResendVerification}
                    variant="outline"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Resend verification email"
                    )}
                  </Button>
                </div>
              </div>
            ))}

          {mode === "resetPassword" &&
            (isComplete ? (
              <div className="text-center py-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  Password reset complete
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Your password has been reset successfully. You can now sign in
                  with your new password.
                </p>
                <div className="mt-6">
                  <Link href="/sign-in">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800">
                      Sign in
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      New Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                      minLength={8}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Must be at least 8 characters
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm New Password
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-md"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting password...
                    </>
                  ) : (
                    "Reset password"
                  )}
                </Button>
              </form>
            ))}

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <Link
                href="/support"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 bg-gray-100">
        <div className="h-full flex items-center justify-center">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mode === "verifyEmail" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                )}
              </svg>
            </div>
            <div className="absolute inset-0">
              <svg viewBox="0 0 200 200" className="text-gray-200">
                <defs>
                  <pattern
                    id="grid"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
