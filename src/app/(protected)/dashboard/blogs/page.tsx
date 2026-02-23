"use client";

import Link from "next/link";
import { useUserBlogs } from "@/features/blogs/blog.hooks";
import { PenSquare, FileText, Filter, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogCardSkeleton } from "@/features/blogs/components/blog.skeleton";
import { BlogCard } from "@/features/blogs/components/blog.card";

export default function BlogsPage() {
  const { data: blogs, isLoading, error } = useUserBlogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const filteredBlogs = blogs?.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "published"
          ? blog.isPublished
          : !blog.isPublished;
    return matchesSearch && matchesFilter;
  });

  const publishedCount = blogs?.filter((b) => b.isPublished).length || 0;
  const draftCount = blogs?.filter((b) => !b.isPublished).length || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/50">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  Error Loading Blogs
                </h3>
                <p className="text-gray-600 mb-6">
                  Failed to load your blogs. Please try again.
                </p>
                <Button onClick={() => window.location.reload()}>
                  Refresh Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                My Blogs
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                You haven't created any blogs yet
              </p>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            >
              <Link href="/dashboard/blogs/new">
                <PenSquare className="mr-2 h-4 w-4" />
                Create First Blog
              </Link>
            </Button>
          </div>

          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Get started by creating your first blog post and share your
                  thoughts with the world
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                >
                  <Link href="/dashboard/blogs/new">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Create Your First Blog
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My Blogs
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              You have {blogs.length} {blogs.length === 1 ? "blog" : "blogs"} •{" "}
              {publishedCount} published • {draftCount} drafts
            </p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          >
            <Link href="/dashboard/blogs/new">
              <PenSquare className="mr-2 h-4 w-4" />
              Create New Blog
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Input
              placeholder="Search blogs by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-gray-800 border-2 focus:border-blue-500"
            />
          </div>
          <Select
            value={filter}
            onValueChange={(value: any) => setFilter(value)}
          >
            <SelectTrigger className="w-full sm:w-48 bg-white dark:bg-gray-800 border-2">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Blogs</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredBlogs && filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No blogs found</h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "Try adjusting your search"
                    : "No blogs match the selected filter"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
