"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface BlogAuthorCardProps {
  authorName: string;
  authorId: string;
  isPublished: boolean;
  isCurrentUser: boolean;
}

export function BlogAuthorCard({
  authorName,
  authorId,
  isPublished,
  isCurrentUser,
}: BlogAuthorCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-12 border border-gray-200 dark:border-gray-800">
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`}
          />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold text-lg">
            {getInitials(authorName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {authorName}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Author • {isPublished ? "Published author" : "New writer"}
          </p>
          {!isCurrentUser && (
            <Button size="sm" variant="outline">
              Follow
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
