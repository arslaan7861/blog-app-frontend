"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Sparkles, Shield } from "lucide-react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!token) {
      router.replace("/login");
    }
  }, [hydrated, token, router]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-grid-blue-100/50 dark:bg-grid-blue-900/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />

        <div className="relative w-full max-w-md">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 rounded-lg blur-lg opacity-75 animate-pulse" />

          <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient-x" />

            <div className="p-8 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-50 animate-ping" />
                <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <Shield className="h-10 w-10 text-white" />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Authenticating
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Please wait while we verify your credentials
              </p>

              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-gray-700" />
                  <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                </div>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Checking authentication...
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                  </div>
                  <span className="text-gray-400">Verifying permissions</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                  </div>
                  <span className="text-gray-400">Loading dashboard</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  <span>BlogPlatform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
