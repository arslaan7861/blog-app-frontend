"use client";

import Link from "next/link";
import { PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomepageAuthenticatedCTA() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Start Writing Today
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Share your thoughts, ideas, and experiences with our community
        </p>
        <Button
          size="lg"
          asChild
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 font-semibold"
        >
          <Link href="/dashboard/blogs/new">
            <PenSquare className="mr-2 h-5 w-5" />
            Write New Post
          </Link>
        </Button>
      </div>
    </div>
  );
}
