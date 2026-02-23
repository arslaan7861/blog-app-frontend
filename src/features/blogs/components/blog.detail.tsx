"use client";

import Link from "next/link";
import { usePublicBlog } from "@/features/blogs/blog.hooks";
import { useAuthStore } from "@/store/auth.store";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Calendar,
  User,
  Sparkles,
  Share2,
  Bookmark,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { BlogDetailSkeleton } from "./blog.details.skeleton";
import { LikeButton } from "@/features/likes/component/like.button";
import { CommentsSection } from "@/features/comments/components/comment.section";

interface BlogDetailClientProps {
  slug: string;
}

export function BlogDetailClient({ slug }: BlogDetailClientProps) {
  const { isAuthenticated, user } = useAuthStore();
  const { data: blog, isLoading, error } = usePublicBlog(slug, true);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (error || !blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              BlogPlatform
            </Link>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Avatar className="h-8 w-8 ring-2 ring-blue-100">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${user?.email}`}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  >
                    <Link href="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4">
        <Button variant="ghost" asChild className="mb-6 group">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </Button>

        <article className="relative">
          {/* Background Decoration */}
          <div className="absolute inset-0 bg-grid-blue-100/50 dark:bg-grid-blue-900/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] -z-10" />

          <Card className="overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-2xl">
            <CardHeader className="pb-4">
              {/* Author Info */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 ring-4 ring-blue-100 dark:ring-blue-900">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${blog.author.email}`}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                      {getInitials(blog.author.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xl font-semibold">{blog.author.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={blog.createdAt}>
                        {formatDistanceToNow(new Date(blog.createdAt), {
                          addSuffix: true,
                        })}
                      </time>
                    </div>
                  </div>
                </div>

                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-4 py-1"
                >
                  {blog.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {blog.title}
              </h1>

              {/* Engagement Bar */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {isAuthenticated && (
                    <LikeButton
                      blogId={blog.id}
                      initialLiked={blog.likedByUser || false}
                      initialCount={blog.likesCount || 0}
                    />
                  )}
                  <div className="flex items-center gap-2 text-gray-500">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">
                      {blog.commentsCount || 0} comments
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Bookmark className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Separator className="my-8" />

              {/* Blog Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                  {blog.content}
                </div>
              </div>

              {/* Reading Time Estimate */}
              <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span>
                  {Math.ceil(blog.content.split(" ").length / 200)} min read
                </span>
              </div>

              <Separator className="my-8" />

              {/* Comments Section */}
              <CommentsSection blogId={blog.id} />
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  );
}
