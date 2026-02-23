"use client";

import Link from "next/link";
import { Mail, LogOut, FileText, Heart } from "lucide-react";
import { useLogout } from "@/features/auth/auth.hooks";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

interface ProfileHeaderProps {
  user: {
    name?: string;
    email?: string;
  } | null;
  stats: {
    publishedCount: number;
    totalLikes: number;
  };
}

export function ProfileHeader({ user, stats }: ProfileHeaderProps) {
  const logout = useLogout();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Card className="relative overflow-hidden mb-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-xl">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200/20 dark:bg-indigo-500/10 rounded-full blur-3xl" />

      <CardContent className="relative pt-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Avatar with ring */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-md opacity-50 animate-pulse" />
            <Avatar className="h-28 w-28 ring-4 ring-white dark:ring-gray-800 relative">
              <AvatarImage src={`https://avatar.vercel.sh/${user?.email}`} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-3xl">
                {user?.name ? getInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-800" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {user?.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
              </div>

              {/* Logout Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-red-200 hover:border-red-600 hover:text-red-600 dark:border-red-900 dark:hover:border-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl flex items-center gap-2">
                      <LogOut className="h-6 w-6 text-red-600" />
                      Confirm Logout
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base">
                      Are you sure you want to logout from your account?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Stats Pills */}
            <div className="flex flex-wrap gap-3">
              <Badge
                variant="secondary"
                className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
              >
                <FileText className="h-3 w-3 mr-1" />
                {stats.publishedCount} Published
              </Badge>
              <Badge
                variant="secondary"
                className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
              >
                <Heart className="h-3 w-3 mr-1" />
                {stats.totalLikes} Likes
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
