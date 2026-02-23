"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EnhancedBlogCard } from "@/features/blogs/components/blog.enhanced.card";
import { FeedItem } from "@/features/blogs/blog.types";

interface HomepageFeaturedBlogsProps {
  blogs: FeedItem[];
  isLoading: boolean;
}

export function HomepageFeaturedBlogs({
  blogs,
  isLoading,
}: HomepageFeaturedBlogsProps) {
  if (isLoading) {
    return <div className="h-96" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4">
          <Sparkles className="h-4 w-4" />
          <span>Latest Stories</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Discover Amazing Stories
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Read the latest insights, tutorials, and stories from our community
        </p>
      </div>

      {blogs.length === 0 ? (
        <Card className="border border-gray-200 dark:border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center py-16">
              <Sparkles className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No blogs published yet
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <EnhancedBlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/feed">
                View all stories <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
