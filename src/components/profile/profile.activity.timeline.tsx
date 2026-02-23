"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { TrendingUp, Heart, MessageCircle, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/features/blogs/blog.types";

interface ActivityTimelineProps {
  blogs: Blog[];
}

export function ActivityTimeline({ blogs }: ActivityTimelineProps) {
  return (
    <Card className="mt-8 bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest engagement metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  {blog.title}
                </Link>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {blog.likesCount || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {blog.commentsCount || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(blog.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              >
                Active
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
