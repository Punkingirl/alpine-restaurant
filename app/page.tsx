"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Loader2, Store } from "lucide-react";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is logged in, redirect to dashboard
        router.push("/dashboard");
      } else {
        // User is not logged in, redirect to auth
        router.push("/auth");
      }
    }
  }, [user, loading, router]);

  // Show loading spinner while checking auth state
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] to-white flex items-center justify-center">
      <div className="text-center">
        <div className="bg-emerald-600 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
          <Store className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Alpine Delivery Co.
        </h1>
        <p className="text-gray-600 mb-4">Restaurant Portal</p>
        <Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-600" />
      </div>
    </div>
  );
}
