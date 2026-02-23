"use client";

import { useInfiniteFeed } from "@/features/blogs/blog.hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { FeedCardSkeleton } from "@/features/blogs/components/blog.skeleton";
import { FeedCard } from "@/features/blogs/components/feed.card";

export default function FeedPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteFeed(10);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Public Feed</h1>
          <p className="text-gray-600 mt-1">
            Discover blogs from our community
          </p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <FeedCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Error Loading Feed
          </h3>
          <p className="text-gray-600 mb-6">
            Failed to load blogs. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>Refresh Page</Button>
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

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Public Feed</h1>
        <p className="text-gray-600 mt-1">Discover blogs from our community</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search blogs by title or author..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Feed Content */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm
              ? "No blogs match your search"
              : "No blogs published yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map((blog) => (
            <FeedCard key={blog.id} item={blog} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && !searchTerm && (
        <div className="mt-8 text-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
            size="lg"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
