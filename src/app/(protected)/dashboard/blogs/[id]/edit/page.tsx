"use client";

import Link from "next/link";
import * as React from "react";
import { useBlog, useUpdateBlog } from "@/features/blogs/blog.hooks";
import { BlogForm } from "@/features/blogs/components/blog.form";
import { UpdateBlogInput } from "@/features/blogs/blog.schema";
import { ArrowLeft, Edit3, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface EditBlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = React.use(params);

  const { data: blog, isLoading, error } = useBlog(id);
  const updateBlogMutation = useUpdateBlog(id);

  const onSubmit = async (data: UpdateBlogInput) => {
    await updateBlogMutation.mutateAsync(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <Button variant="ghost" disabled className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>

          <Card className="overflow-hidden">
            <CardHeader>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>

          <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/50">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
                  Blog Not Found
                </h3>
                <p className="text-red-600 dark:text-red-300 mb-6">
                  The blog you're looking for doesn't exist or you don't have
                  permission to edit it.
                </p>
                <Button asChild>
                  <Link href="/dashboard/blogs">Go to Blogs</Link>
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
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            asChild
            className="mb-4 hover:bg-blue-50 dark:hover:bg-blue-950/50 group"
          >
            <Link href="/dashboard/blogs">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blogs
            </Link>
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Edit3 className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Edit Blog
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg ml-14">
            Update your blog post - "{blog.title}"
          </p>
        </div>

        <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl" />

          <CardHeader className="relative">
            <CardTitle className="text-2xl">Edit Blog Details</CardTitle>
            <CardDescription className="text-base">
              Make changes to your blog post below
            </CardDescription>
          </CardHeader>

          <CardContent className="relative">
            <BlogForm
              mode="edit"
              initialData={blog}
              onSubmit={onSubmit}
              isPending={updateBlogMutation.isPending}
            />
          </CardContent>
        </Card>

        <Card className="mt-6 bg-blue-50/50 dark:bg-blue-950/20 border-0">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Changes will be visible immediately. Make sure to review your
                content before saving.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
