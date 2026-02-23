"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function BlogsError() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/50">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-red-600 mb-2">
                Error Loading Blogs
              </h3>
              <p className="text-gray-600 mb-6">
                Failed to load your blogs. Please try again.
              </p>
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
