"use client";

import Link from "next/link";
import { PenSquare, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function BlogsEmpty() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My Blogs
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              You haven't created any blogs yet
            </p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          >
            <Link href="/dashboard/blogs/new">
              <PenSquare className="mr-2 h-4 w-4" />
              Create First Blog
            </Link>
          </Button>
        </div>

        <Card className="bg-white/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center">
                <FileText className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No blogs yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Get started by creating your first blog post and share your
                thoughts with the world
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              >
                <Link href="/dashboard/blogs/new">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Create Your First Blog
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
