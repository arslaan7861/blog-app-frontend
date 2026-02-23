"use client";

import Link from "next/link";
import { usePublicBlog } from "@/features/blogs/blog.hooks";
import { useAuthStore } from "@/store/auth.store";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import {
  ArrowLeft,
  MessageCircle,
  Sparkles,
  Share2,
  Bookmark,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-6 mt-6 text-gray-600 dark:text-gray-400 text-sm">
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
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {blog.author.name}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(blog.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>
                {Math.ceil(blog.content.split(" ").length / 200)} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="mb-12">
          <div className="prose-custom max-w-none dark:prose-invert">
            <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>
        </article>

        <div className="border-t border-gray-200 dark:border-gray-800 border-b py-6 mb-12">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              {isAuthenticated ? (
                <>
                  <LikeButton
                    blogId={blog.id}
                    initialLiked={blog.likedByUser || false}
                    initialCount={blog.likesCount || 0}
                  />
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">
                      {blog.commentsCount || 0}
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  <Link
                    href="/login"
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    Sign in
                  </Link>{" "}
                  to engage with this post
                </p>
              )}
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
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-12 border border-gray-200 dark:border-gray-800">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${blog.author.name}`}
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-lg">
                {getInitials(blog.author.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {blog.author.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Author • {blog.isPublished ? "Published author" : "New writer"}
              </p>
              {isAuthenticated && user?.id !== blog.author.id && (
                <Button size="sm" variant="outline">
                  Follow
                </Button>
              )}
            </div>
          </div>
        </div>

        <CommentsSection blogId={blog.id} />
      </main>

      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            More from {blog.author.name}
          </h2>
          <Button asChild className="mt-4">
            <Link href={`/feed?author=${blog.author.id}`}>View all posts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
