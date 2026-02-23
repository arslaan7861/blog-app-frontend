import { blogsServiceServer } from "@/features/blogs/blog.service.server";
import { Suspense } from "react";
import { FeedPageSkeleton } from "./feed-skeleton";
import { FeedPageClientComponent } from "./feed-client";

export const revalidate = 30;

async function FeedContent() {
  try {
    const feedData = await blogsServiceServer.getFeed(1, 50, 30);
    const blogs = feedData?.data || [];

    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Explore Stories
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Discover amazing content from our community ({blogs.length} posts)
            </p>
          </div>
        </div>

        <FeedPageClientComponent blogs={blogs} />
      </div>
    );
  } catch (error) {
    console.error("Error loading feed:", error);
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Explore Stories
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Discover amazing content from our community
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
            <p className="text-red-600 dark:text-red-400">
              Unable to load feed. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default function FeedPage() {
  return (
    <Suspense fallback={<FeedPageSkeleton />}>
      <FeedContent />
    </Suspense>
  );
}
