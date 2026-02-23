"use client";

import Link from "next/link";
import { PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogsHeaderProps {
  totalBlogs: number;
  publishedCount: number;
  draftCount: number;
}

export function BlogsHeader({
  totalBlogs,
  publishedCount,
  draftCount,
}: BlogsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          My Blogs
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          You have {totalBlogs} {totalBlogs === 1 ? "blog" : "blogs"} •{" "}
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
  );
}
