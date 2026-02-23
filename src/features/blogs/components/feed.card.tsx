"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle } from "lucide-react";
import { FeedItem } from "../blog.types";

interface FeedCardProps {
  item: FeedItem;
}

export function FeedCard({ item }: FeedCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{getInitials(item.author.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Link href={`/blog/${item.slug}`}>
              <CardTitle className="text-xl hover:text-primary transition-colors">
                {item.title}
              </CardTitle>
            </Link>
            <CardDescription>
              by {item.author.name} •{" "}
              {formatDistanceToNow(new Date(item.createdAt), {
                addSuffix: true,
              })}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-3">{item.summary}</p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{item.likesCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{item.commentsCount}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
