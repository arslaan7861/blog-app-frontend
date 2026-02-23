"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { FeedCardSkeleton } from "@/features/blogs/components/blog.skeleton";

export function FeedPageSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <Skeleton className="h-10 w-1/2 mb-2" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8 space-y-4">
          <Skeleton className="h-10 w-full" />

          <div className="flex gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <FeedCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
