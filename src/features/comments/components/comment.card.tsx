"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "../comment.types";
import { useAuthStore } from "@/store/auth.store";
import { useDeleteComment, useUpdateComment } from "../comment.hooks";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CommentForm } from "./comment.form";

interface CommentItemProps {
  comment: Comment;
  blogId: string;
}

export function CommentItem({ comment, blogId }: CommentItemProps) {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const deleteComment = useDeleteComment(blogId);
  const updateComment = useUpdateComment(blogId, comment.id);

  const isOwner = user?.id === comment.user.id;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleDelete = async () => {
    await deleteComment.mutateAsync(comment.id);
    setShowDeleteDialog(false);
  };

  const handleUpdate = async (data: { content: string }) => {
    await updateComment.mutateAsync(data);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="pl-14">
        <CommentForm
          blogId={blogId}
          initialValue={comment.content}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          isPending={updateComment.isPending}
          mode="edit"
        />
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{getInitials(comment.user.name)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <div>
                <span className="font-medium text-sm">{comment.user.name}</span>
                <span className="text-xs text-gray-500 ml-2">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              {isOwner && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setShowDeleteDialog(true)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <p className="text-gray-700 text-sm whitespace-pre-wrap break-words">
              {comment.content}
            </p>
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
