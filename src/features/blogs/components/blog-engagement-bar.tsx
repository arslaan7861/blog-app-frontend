"use client";

import Link from "next/link";
import { MessageCircle, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LikeButton } from "@/features/likes/component/like.button";

interface BlogEngagementBarProps {
  blogId: string;
  likesCount: number;
  commentsCount: number;
  initialLiked?: boolean;
  isAuthenticated: boolean;
}

export function BlogEngagementBar({
  blogId,
  likesCount,
  commentsCount,
  initialLiked = false,
  isAuthenticated,
}: BlogEngagementBarProps) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 border-b py-6 mb-12">
      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <LikeButton
                blogId={blogId}
                initialLiked={initialLiked}
                initialCount={likesCount}
              />
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer">
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">{commentsCount}</span>
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
  );
}
