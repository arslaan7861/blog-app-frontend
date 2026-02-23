"use client";

import Link from "next/link";
import { ArrowLeft, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditBlogHeaderProps {
  blogTitle: string;
}

export function EditBlogHeader({ blogTitle }: EditBlogHeaderProps) {
  return (
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
        Update your blog post - "{blogTitle}"
      </p>
    </div>
  );
}
