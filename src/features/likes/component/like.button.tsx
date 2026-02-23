"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLikeBlog, useLikeStatus, useUnlikeBlog } from "../like.hooks";

interface LikeButtonProps {
  blogId: string;
  initialLiked?: boolean;
  initialCount?: number;
}

export function LikeButton({
  blogId,
  initialLiked = false,
  initialCount = 0,
}: LikeButtonProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [optimisticLiked, setOptimisticLiked] = useState(initialLiked);
  const [optimisticCount, setOptimisticCount] = useState(initialCount);

  const { data: status } = useLikeStatus(blogId);
  const likeMutation = useLikeBlog(blogId);
  const unlikeMutation = useUnlikeBlog(blogId);

  // Sync with server data when available
  useEffect(() => {
    if (status) {
      setOptimisticLiked(status.liked);
      setOptimisticCount(status.likesCount);
    }
  }, [status]);

  const handleClick = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Optimistic update
    if (optimisticLiked) {
      setOptimisticLiked(false);
      setOptimisticCount((prev) => Math.max(prev - 1, 0));
      try {
        await unlikeMutation.mutateAsync();
      } catch {
        // Revert on error
        setOptimisticLiked(true);
        setOptimisticCount((prev) => prev + 1);
      }
    } else {
      setOptimisticLiked(true);
      setOptimisticCount((prev) => prev + 1);
      try {
        await likeMutation.mutateAsync();
      } catch {
        // Revert on error
        setOptimisticLiked(false);
        setOptimisticCount((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={cn(
        "gap-2",
        optimisticLiked && "text-red-500 hover:text-red-600",
      )}
      disabled={likeMutation.isPending || unlikeMutation.isPending}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all",
          optimisticLiked && "fill-current",
        )}
      />
      <span>{optimisticCount}</span>
    </Button>
  );
}
