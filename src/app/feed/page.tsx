"use client";

import { useInfiniteFeed } from "@/features/blogs/blog.hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, Loader2, TrendingUp, Filter } from "lucide-react";
import { FeedCardSkeleton } from "@/features/blogs/components/blog.skeleton";
import { FeedCard } from "@/features/blogs/components/feed.card";

export default function FeedPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteFeed(12);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              Explore Stories
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Discover amazing content from our community
            </p>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <FeedCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
              Unable to Load Feed
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We encountered an error loading the blogs. Please try again.
            </p>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const allBlogs = data?.pages.flatMap((page) => page.data) || [];

  const filteredBlogs = searchTerm
    ? allBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : allBlogs;

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === "popular") {
      return (b.likesCount || 0) - (a.likesCount || 0);
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

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
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search blogs by title or author..."
              className="pl-12 py-3 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredBlogs.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Sort by:
              </span>
              <button
                onClick={() => setSortBy("recent")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  sortBy === "recent"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Latest
              </button>
              <button
                onClick={() => setSortBy("popular")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  sortBy === "popular"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                Trending
              </button>
            </div>
          )}
        </div>

        {sortedBlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4">
              <Search className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto" />
            </div>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {searchTerm
                ? "No blogs match your search"
                : "No blogs published yet"}
            </p>
            <p className="text-gray-400 dark:text-gray-600 mt-2 text-sm">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Be the first to share a story"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedBlogs.map((blog) => (
              <FeedCard key={blog.id} item={blog} />
            ))}
          </div>
        )}

        {hasNextPage && !searchTerm && (
          <div className="mt-12 text-center">
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              variant="outline"
              size="lg"
              className="gap-2 border-gray-300 dark:border-gray-700"
            >
              {isFetchingNextPage ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading more...
                </>
              ) : (
                <>
                  <span>Load More Stories</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
