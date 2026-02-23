"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";
import { FeedItem } from "@/features/blogs/blog.types";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface EnhancedBlogCardProps {
  blog: FeedItem;
}

export function EnhancedBlogCard({ blog }: EnhancedBlogCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.author.name}`}
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                {getInitials(blog.author.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                {blog.author.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(blog.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <Link href={`/blog/${blog.slug}`}>
        <CardContent className="pt-4 cursor-pointer flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
            {blog.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {blog.summary}
          </p>
        </CardContent>
      </Link>

      <CardFooter className="pt-0 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
            <Heart className="h-4 w-4" />
            <span>{blog.likesCount}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span>{blog.commentsCount || 0}</span>
          </button>
        </div>
        <Link href={`/blog/${blog.slug}`}>
          <Button variant="ghost" size="sm" className="gap-1">
            <span className="text-xs">Read More</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
