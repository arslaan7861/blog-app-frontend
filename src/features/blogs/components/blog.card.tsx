"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Edit, Eye, Trash2, Heart, MessageCircle, Clock } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDeleteBlog } from "../blog.hooks";
import { Blog } from "../blog.types";

interface BlogCardProps {
  blog: Blog;
  onDelete?: () => void;
}

export function BlogCard({ blog, onDelete }: BlogCardProps) {
  const deleteBlogMutation = useDeleteBlog();

  const handleDelete = async () => {
    await deleteBlogMutation.mutateAsync(blog.id);
    onDelete?.();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="group relative overflow-hidden bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

      <CardHeader className="pb-3 relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 ring-2 ring-blue-100 dark:ring-blue-900">
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xs">
                {getInitials(blog.author.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {blog.author.name}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(new Date(blog.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={
              blog.isPublished
                ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:from-green-900/30 dark:to-emerald-900/30 dark:text-green-400 border-0"
                : "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 dark:from-yellow-900/30 dark:to-amber-900/30 dark:text-yellow-400 border-0"
            }
          >
            {blog.isPublished ? "Published" : "Draft"}
          </Badge>
        </div>

        <Link href={`/blog/${blog.slug}`} className="block mt-3">
          <CardTitle className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {blog.title}
          </CardTitle>
        </Link>

        <CardDescription className="line-clamp-2 text-gray-600 dark:text-gray-400">
          {blog.summary || blog.content.substring(0, 120)}...
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-3 relative">
        {(blog.likesCount !== undefined ||
          blog.commentsCount !== undefined) && (
          <div className="flex items-center gap-4 text-sm">
            {blog.likesCount !== undefined && (
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <Heart className="w-4 h-4 text-pink-500" />
                <span className="font-medium">{blog.likesCount}</span>
              </div>
            )}
            {blog.commentsCount !== undefined && (
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                <span className="font-medium">{blog.commentsCount}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-700 relative">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex-1 border-gray-200 dark:border-gray-700 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <Link href={`/blog/${blog.slug}`}>
            <Eye className="w-4 h-4 mr-2" />
            View
          </Link>
        </Button>

        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex-1 border-gray-200 dark:border-gray-700 hover:border-indigo-600 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400 transition-colors"
        >
          <Link href={`/dashboard/blogs/${blog.id}/edit`}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-gray-200 dark:border-gray-700 hover:border-red-600 hover:text-red-600 dark:hover:border-red-500 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white dark:bg-gray-900">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl">
                Are you sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                This action cannot be undone. This will permanently delete your
                blog and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-gray-200 dark:border-gray-700">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white border-0"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
