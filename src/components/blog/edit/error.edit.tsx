"use client";

import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function EditBlogError() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/dashboard/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Link>
        </Button>

        <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/50">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
                Blog Not Found
              </h3>
              <p className="text-red-600 dark:text-red-300 mb-6">
                The blog you're looking for doesn't exist or you don't have
                permission to edit it.
              </p>
              <Button asChild>
                <Link href="/dashboard/blogs">Go to Blogs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
