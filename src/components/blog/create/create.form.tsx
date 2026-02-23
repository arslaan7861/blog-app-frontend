"use client";

import { CreateBlogInput } from "@/features/blogs/blog.schema";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogForm } from "@/features/blogs/components/blog.form";

interface NewBlogFormProps {
  onSubmit: (data: CreateBlogInput) => Promise<void>;
  isPending: boolean;
}

export function NewBlogForm({ onSubmit, isPending }: NewBlogFormProps) {
  return (
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
        <BlogForm mode="create" onSubmit={onSubmit} isPending={isPending} />
      </CardContent>
    </Card>
  );
}
