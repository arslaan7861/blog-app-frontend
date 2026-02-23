"use client";

import { UpdateBlogInput } from "@/features/blogs/blog.schema";
import { Blog } from "@/features/blogs/blog.types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogForm } from "@/features/blogs/components/blog.form";

interface EditBlogFormProps {
  blog: Blog;
  onSubmit: (data: UpdateBlogInput) => Promise<void>;
  isPending: boolean;
}

export function EditBlogForm({ blog, onSubmit, isPending }: EditBlogFormProps) {
  return (
    <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-2xl">
      {/* Decorative Elements */}
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
          isPending={isPending}
        />
      </CardContent>
    </Card>
  );
}
