"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { FeedItem } from "@/features/blogs/blog.types";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

  // Generate a random gradient for card background
  const gradients = [
    "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
    "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
    "from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20",
    "from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20",
  ];

  const gradientIndex =
    blog.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <Card
      className={`group relative overflow-hidden bg-gradient-to-br ${gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-blue-100/50 dark:bg-grid-blue-900/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/50 dark:bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-200/50 dark:bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-gray-800">
              <AvatarImage
                src={`https://avatar.vercel.sh/${blog.author.email}`}
              />
              <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                {getInitials(blog.author.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {blog.author.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(blog.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
          >
            {blog.likesCount} likes
          </Badge>
        </div>
      </CardHeader>

      <Link href={`/blog/${blog.slug}`}>
        <CardContent className="relative cursor-pointer">
          <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {blog.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
            {blog.summary}
          </p>
        </CardContent>
      </Link>

      <CardFooter className="relative flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 hover:text-red-500"
          >
            <Heart className="h-4 w-4" />
            <span>{blog.likesCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 hover:text-blue-500"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{blog.commentsCount}</span>
          </Button>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
