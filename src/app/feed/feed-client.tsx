"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp } from "lucide-react";
import { FeedCard } from "@/features/blogs/components/feed.card";
import { Card, CardContent } from "@/components/ui/card";
import { FeedItem } from "@/features/blogs/blog.types";

interface FeedPageClientComponentProps {
  blogs: FeedItem[];
}

export function FeedPageClientComponent({
  blogs,
}: FeedPageClientComponentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");

  const filteredBlogs = searchTerm
    ? blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : blogs;

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === "popular") {
      return (b.likesCount || 0) - (a.likesCount || 0);
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
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
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Sort by:
            </span>
            <Button
              onClick={() => setSortBy("recent")}
              variant={sortBy === "recent" ? "default" : "outline"}
              size="sm"
            >
              Latest
            </Button>
            <Button
              onClick={() => setSortBy("popular")}
              variant={sortBy === "popular" ? "default" : "outline"}
              size="sm"
              className="gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </Button>
          </div>
        )}
      </div>

      {sortedBlogs.length === 0 ? (
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center py-16">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
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
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedBlogs.map((blog) => (
            <FeedCard key={blog.id} item={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
