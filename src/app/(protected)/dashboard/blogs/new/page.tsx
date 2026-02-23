"use client";

import { NewBlogForm } from "@/components/blog/create/create.form";
import { NewBlogHeader } from "@/components/blog/create/header.create";
import { ProTipsCard } from "@/components/blog/create/protips.card";
import { useCreateBlog } from "@/features/blogs/blog.hooks";
import { CreateBlogInput } from "@/features/blogs/blog.schema";

export default function NewBlogPage() {
  const createBlogMutation = useCreateBlog();

  const onSubmit = async (data: CreateBlogInput) => {
    await createBlogMutation.mutateAsync(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <NewBlogHeader />
        <NewBlogForm
          onSubmit={onSubmit}
          isPending={createBlogMutation.isPending}
        />
        <ProTipsCard />
      </div>
    </div>
  );
}
