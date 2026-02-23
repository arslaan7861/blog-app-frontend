"use client";

import { BlogsEmpty } from "@/components/blog/empty.blog";
import { BlogsError } from "@/components/blog/error.blog";
import { BlogsFilters } from "@/components/blog/filter.blog";
import { BlogsGrid } from "@/components/blog/grid.blog";
import { BlogsHeader } from "@/components/blog/header.blog";
import { BlogsLoading } from "@/components/blog/loading.blog";
import { useUserBlogs } from "@/features/blogs/blog.hooks";
import { useState, useMemo } from "react";

export default function BlogsPage() {
  const { data: blogs, isLoading, error } = useUserBlogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];

    return blogs.filter((blog) => {
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
  }, [blogs, searchTerm, filter]);

  const publishedCount = blogs?.filter((b) => b.isPublished).length || 0;
  const draftCount = blogs?.filter((b) => !b.isPublished).length || 0;

  if (isLoading) {
    return <BlogsLoading />;
  }

  if (error) {
    return <BlogsError />;
  }

  if (!blogs || blogs.length === 0) {
    return <BlogsEmpty />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <BlogsHeader
          totalBlogs={blogs.length}
          publishedCount={publishedCount}
          draftCount={draftCount}
        />

        <BlogsFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filter={filter}
          onFilterChange={setFilter}
        />

        <BlogsGrid
          blogs={filteredBlogs}
          searchTerm={searchTerm}
          filter={filter}
        />
      </div>
    </div>
  );
}
