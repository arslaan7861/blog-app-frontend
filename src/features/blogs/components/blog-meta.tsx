"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BlogMetaProps {
  title: string;
  authorName: string;
  createdAt: string;
  contentLength: number;
}

export function BlogMeta({
  title,
  authorName,
  createdAt,
  contentLength,
}: BlogMetaProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
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
          {title}
        </h1>

        <div className="flex items-center gap-6 mt-6 text-gray-600 dark:text-gray-400 text-sm flex-wrap">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`}
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                {getInitials(authorName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {authorName}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span>{Math.ceil(contentLength / 200)} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
}
