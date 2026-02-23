"use client";

import { FileText } from "lucide-react";
import { Blog } from "@/features/blogs/blog.types";
import { Card, CardContent } from "@/components/ui/card";
import { BlogCard } from "@/features/blogs/components/blog.card";

interface BlogsGridProps {
  blogs: Blog[];
  searchTerm?: string;
  filter?: string;
}

export function BlogsGrid({ blogs, searchTerm, filter }: BlogsGridProps) {
  if (blogs.length === 0) {
    return (
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No blogs found</h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search"
                : filter !== "all"
                  ? `No ${filter} blogs match the selected filter`
                  : "No blogs match the selected filter"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
