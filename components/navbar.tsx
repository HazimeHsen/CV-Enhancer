"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Menu, X, AlertCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, sendVerificationEmail } = useAuth();
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleResendVerification = async () => {
    try {
      await sendVerificationEmail();
      setVerificationSent(true);
      setTimeout(() => setVerificationSent(false), 5000);
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  return (
    <>
      {user && !user.emailVerified && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="bg-transparent border-0 p-0 flex items-center md:justify-between justify-center flex-wrap">
              <div className="text-amber-800 flex items-center gap-2">
                <div>
                  <AlertCircle className="h-4 w-4 stroke-amber-600" />
                </div>
                <span>Please verify your email to access all features.</span>
              </div>
              {!verificationSent ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResendVerification}
                  className="ml-4 text-amber-800 border-amber-300 hover:bg-amber-100"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Resend verification email
                </Button>
              ) : (
                <span className="text-green-600 text-sm ml-4">
                  Verification email sent!
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-2">
                <FileText className="h-6 w-6" />
              </div>
              <span className="font-bold text-xl text-gray-900">
                CV Enhancer
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="#benefits"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Benefits
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline">Dashboard</Button>
                  </Link>
                  {user.emailVerified ? (
                    <Link href="/enhancer">
                      <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
                        CV Enhancer
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="bg-gray-400 hover:bg-gray-500 rounded-full px-6 cursor-not-allowed"
                      disabled
                      title="Please verify your email to access this feature"
                    >
                      CV Enhancer
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link href="/enhancer">
                    <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 sm:px-6 lg:px-8 shadow-lg">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#benefits"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Benefits
              </Link>
              <div className="pt-2 border-t border-gray-100">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full mb-2">
                        Dashboard
                      </Button>
                    </Link>
                    {user.emailVerified ? (
                      <Link
                        href="/enhancer"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button className="bg-blue-600 hover:bg-blue-700 w-full rounded-full">
                          CV Enhancer
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        className="bg-gray-400 hover:bg-gray-500 w-full rounded-full cursor-not-allowed"
                        disabled
                        title="Please verify your email to access this feature"
                      >
                        CV Enhancer
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button variant="outline" className="w-full mb-2">
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      href="/enhancer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="bg-blue-600 hover:bg-blue-700 w-full rounded-full">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
