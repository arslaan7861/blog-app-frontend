"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BlogRelatedContentProps {
  authorName: string;
  authorId: string;
}

export function BlogRelatedContent({
  authorName,
  authorId,
}: BlogRelatedContentProps) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 py-12 mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          More from {authorName}
        </h2>
        <Button asChild className="mt-4">
          <Link href={`/feed?author=${authorId}`}>View all posts</Link>
        </Button>
      </div>
    </div>
  );
}
