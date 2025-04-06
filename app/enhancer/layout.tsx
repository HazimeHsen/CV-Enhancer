"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";
import { Loader2 } from "lucide-react";
import LoadingScreen from "@/components/loading-screen";

export default function EnhancerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const redirectedRef = useRef(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (user) {
      if (!user.emailVerified && !redirectedRef.current) {
        redirectedRef.current = true;
        router.push("/dashboard?verification=required");
      } else if (user.emailVerified) {
        setIsChecking(false);
      }
    } else if (user === null) {
      setIsChecking(false);
    }
  }, [user, router]);

  if (isChecking) {
    return <LoadingScreen />;
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
}
