"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Loader2 } from "lucide-react";
import { FeedCard } from "@/features/blogs/components/feed.card";
import { Card, CardContent } from "@/components/ui/card";
import { FeedItem } from "@/features/blogs/blog.types";

interface FeedPageContentProps {
  initialBlogs: FeedItem[];
}

export function FeedPageContent({ initialBlogs = [] }: FeedPageContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");

  const filteredBlogs = searchTerm
    ? initialBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : initialBlogs;

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
              className="pl-10 text-base border-gray-300 dark:border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <Button
              variant={sortBy === "recent" ? "default" : "outline"}
              onClick={() => setSortBy("recent")}
              size="sm"
              className="gap-2"
            >
              Latest
            </Button>
            <Button
              variant={sortBy === "popular" ? "default" : "outline"}
              onClick={() => setSortBy("popular")}
              size="sm"
              className="gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </Button>
          </div>
        </div>

        {sortedBlogs.length > 0 ? (
          <div className="space-y-6">
            {sortedBlogs.map((blog) => (
              <FeedCard key={blog.id} item={blog} />
            ))}
          </div>
        ) : (
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No blogs found matching your search
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
