"use client";

import Link from "next/link";
import { usePopularBlogs } from "@/features/blogs/blog.hooks";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

export function PopularBlogs() {
  const { data: blogs, isLoading, error } = usePopularBlogs(5);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Popular Blogs
          </CardTitle>
          <CardDescription>Most liked posts this week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error || !blogs || blogs.length === 0) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Popular Blogs
        </CardTitle>
        <CardDescription>Most liked posts this week</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="flex gap-3 group"
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback>{getInitials(blog.author.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                {blog.title}
              </h4>
              <p className="text-xs text-gray-500 mb-1">
                by {blog.author.name} •{" "}
                {formatDistanceToNow(new Date(blog.createdAt), {
                  addSuffix: true,
                })}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {blog.likesCount}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {blog.commentsCount}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
