"use client";

import * as React from "react";
import { useBlog, useUpdateBlog } from "@/features/blogs/blog.hooks";
import { UpdateBlogInput } from "@/features/blogs/blog.schema";
import { EditBlogLoading } from "@/components/blog/edit/loading.edit";
import { EditBlogError } from "@/components/blog/edit/error.edit";
import { EditBlogForm } from "@/components/blog/edit/form.edit";
import { InfoCard } from "@/components/blog/edit/info.card.edit";
import { EditBlogHeader } from "@/components/blog/edit/header.edit";
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
    return <EditBlogLoading />;
  }

  if (error || !blog) {
    return <EditBlogError />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <EditBlogHeader blogTitle={blog.title} />

        <EditBlogForm
          blog={blog}
          onSubmit={onSubmit}
          isPending={updateBlogMutation.isPending}
        />

        <InfoCard />
      </div>
    </div>
  );
}
