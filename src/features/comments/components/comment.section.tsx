"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { MessageCircle, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { CommentForm } from "./comment.form";
import { CommentItem } from "./comment.card";
import { useCreateComment, useInfiniteComments } from "../comment.hooks";

interface CommentsSectionProps {
  blogId: string;
}

export function CommentsSection({ blogId }: CommentsSectionProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [showForm, setShowForm] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteComments(blogId, 5);

  const createComment = useCreateComment(blogId);

  const allComments = data?.pages.flatMap((page) => page.data) || [];
  const totalComments = data?.pages[0]?.meta.total || 0;

  const handleCreateComment = async (data: { content: string }) => {
    await createComment.mutateAsync(data);
    setShowForm(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Comments</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 dark:bg-red-900/20 border-red-200">
        <CardContent className="pt-6">
          <div className="text-center py-4">
            <p className="text-red-600 dark:text-red-400 mb-2">
              Failed to load comments
            </p>
            <Button variant="outline" size="sm">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Comments ({totalComments})</h3>
        </div>

        {!showForm && isAuthenticated && (
          <Button
            size="sm"
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Add Comment
          </Button>
        )}
      </div>

      {/* Comment Form */}
      {showForm && (
        <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-0">
          <CardContent className="pt-6">
            <CommentForm
              blogId={blogId}
              onSubmit={handleCreateComment}
              onCancel={() => setShowForm(false)}
              isPending={createComment.isPending}
              mode="create"
            />
          </CardContent>
        </Card>
      )}

      {/* Login Prompt */}
      {!isAuthenticated && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-0">
          <CardContent className="pt-6">
            <div className="text-center py-4">
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Join the conversation
              </p>
              <Button
                size="sm"
                onClick={() => router.push("/login")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              >
                Sign in to comment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      {allComments.length > 0 ? (
        <div className="space-y-4">
          {allComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} blogId={blogId} />
          ))}

          {/* Load More */}
          {hasNextPage && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="hover:border-blue-600 hover:text-blue-600"
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More Comments"
                )}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No comments yet
              </p>
              {isAuthenticated && !showForm && (
                <Button
                  variant="outline"
                  onClick={() => setShowForm(true)}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Be the first to comment
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
