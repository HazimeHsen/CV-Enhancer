"use client";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  FileText,
  User,
  Settings,
  LogOut,
  Mail,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DashboardPage() {
  const { user, signOut, sendVerificationEmail } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationEmailSent, setVerificationEmailSent] = useState(false);

  useEffect(() => {
    if (searchParams.get("verification") === "required") {
      setShowVerificationModal(true);
    }
  }, [searchParams]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleResendVerification = async () => {
    try {
      await sendVerificationEmail();
      setVerificationEmailSent(true);
      setTimeout(() => setVerificationEmailSent(false), 5000);
    } catch (error) {
      console.error("Error sending verification email:", error);
      alert("Failed to send verification email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Dialog
        open={showVerificationModal}
        onOpenChange={setShowVerificationModal}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              Email Verification Required
            </DialogTitle>
            <DialogDescription>
              You need to verify your email address before you can access the CV
              Enhancer.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-amber-50 p-4 rounded-md border border-amber-200 my-4">
            <p className="text-sm text-amber-800">
              We've sent a verification link to <strong>{user?.email}</strong>.
              Please check your inbox and click the link to verify your email
              address.
            </p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="flex items-center"
              onClick={handleResendVerification}
              disabled={verificationEmailSent}
            >
              <Mail className="h-4 w-4 mr-2" />
              {verificationEmailSent
                ? "Email sent!"
                : "Resend verification email"}
            </Button>
            <Button onClick={() => setShowVerificationModal(false)}>
              I understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
            <Link href="/" className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-2">
                <FileText className="h-6 w-6" />
              </div>
              <span className="font-bold text-xl text-gray-900">
                CV Enhancer
              </span>
            </Link>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-600 rounded-full h-8 w-8 flex items-center justify-center mr-2">
                  {user?.firstName
                    ? user.firstName.charAt(0).toUpperCase()
                    : user?.email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.firstName
                    ? `${user.firstName} ${user.lastName || ""}`
                    : user?.email}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-gray-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dashboard</CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Link
                    href="/dashboard"
                    className="flex items-center px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 border-l-2 border-blue-600"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </Link>
                  <Link
                    href={user?.emailVerified ? "/enhancer" : "#"}
                    className={`flex items-center px-4 py-3 text-sm font-medium ${
                      user?.emailVerified
                        ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                    onClick={(e) => {
                      if (!user?.emailVerified) {
                        e.preventDefault();
                        setShowVerificationModal(true);
                      }
                    }}
                  >
                    <FileText className="h-4 w-4 mr-3" />
                    CV Enhancer
                    {!user?.emailVerified && (
                      <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        Verify email
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Manage your personal information and account settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal">
                  <TabsList className="grid w-full grid-cols-2 h-auto">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4 mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-500">
                          First Name
                        </h3>
                        <p className="text-base">
                          {user?.firstName || "Not set"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-500">
                          Last Name
                        </h3>
                        <p className="text-base">
                          {user?.lastName || "Not set"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-gray-500">
                        Email
                      </h3>
                      <div className="flex items-center">
                        <p className="text-base mr-2">{user?.email}</p>
                        {user?.emailVerified ? (
                          <div className="flex items-center text-green-600 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </div>
                        ) : (
                          <div className="flex items-center text-amber-600 text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Not verified
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button>Edit Profile</Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="account" className="space-y-4 mt-6">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-gray-500">
                        Account ID
                      </h3>
                      <p className="text-base">{user?.uid}</p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-gray-500">
                        Email Verification
                      </h3>
                      {user?.emailVerified ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Your email is verified
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center text-amber-600">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Your email is not verified
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            onClick={handleResendVerification}
                            disabled={verificationEmailSent}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            {verificationEmailSent
                              ? "Email sent!"
                              : "Resend verification email"}
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 pt-2">
                      <h3 className="text-sm font-medium text-gray-500">
                        Password
                      </h3>
                      <p className="text-base">••••••••</p>
                      <Button variant="outline" size="sm">
                        Change password
                      </Button>
                    </div>

                    <div className="pt-4 border-t mt-6">
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
