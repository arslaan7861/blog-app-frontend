"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCreateBlog } from "@/features/blogs/blog.hooks";
import { CreateBlogInput } from "@/features/blogs/blog.schema";
import { BlogForm } from "@/features/blogs/components/blog.form";
import { ArrowLeft, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NewBlogPage() {
  const router = useRouter();
  const createBlogMutation = useCreateBlog();

  const onSubmit = async (data: CreateBlogInput) => {
    await createBlogMutation.mutateAsync(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header with gradient */}
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
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create New Blog
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg ml-14">
            Share your thoughts and ideas with the world
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl" />

          <CardHeader className="relative">
            <CardTitle className="text-2xl">Blog Details</CardTitle>
            <CardDescription className="text-base">
              Fill in the information below to create your blog post
            </CardDescription>
          </CardHeader>

          <CardContent className="relative">
            <BlogForm
              mode="create"
              onSubmit={onSubmit}
              isPending={createBlogMutation.isPending}
            />
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-0">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">!</span>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Pro Tips for Great Blogs
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Use engaging titles that grab attention</li>
                  <li>• Break up text with headings and paragraphs</li>
                  <li>• Proofread before publishing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
