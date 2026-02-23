"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommentHeaderProps {
  totalComments: number;
  isAuthenticated: boolean;
  onAddComment: () => void;
}

export function CommentHeader({
  totalComments,
  isAuthenticated,
  onAddComment,
}: CommentHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Comments ({totalComments})</h3>
      </div>

      {isAuthenticated && (
        <Button
          size="sm"
          onClick={onAddComment}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
        >
          <span className="text-lg">✨</span>
          Add Comment
        </Button>
      )}
    </div>
  );
}
