"use client";

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { token } = useAuthStore();

  const [hydrated, setHydrated] = useState(false);

  // wait for Zustand persist hydration
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!token) {
      router.replace("/login");
    }
  }, [hydrated, token, router]);

  // Prevent flicker
  if (!hydrated) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
