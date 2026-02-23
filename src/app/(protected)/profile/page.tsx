"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { useUserBlogs } from "@/features/blogs/blog.hooks";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useLogout } from "@/features/auth/auth.hooks";
import {
  Calendar,
  FileText,
  Heart,
  MessageCircle,
  Edit3,
  Mail,
  Sparkles,
  TrendingUp,
  Clock,
  LogOut,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
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
import { BlogCardSkeleton } from "@/features/blogs/components/blog.skeleton";
import { BlogCard } from "@/features/blogs/components/blog.card";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const logout = useLogout();
  const { data: blogs, isLoading } = useUserBlogs();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const publishedBlogs = blogs?.filter((blog) => blog.isPublished) || [];
  const draftBlogs = blogs?.filter((blog) => !blog.isPublished) || [];

  const totalLikes = publishedBlogs.reduce(
    (sum, blog) => sum + (blog.likesCount || 0),
    0,
  );
  const totalComments = publishedBlogs.reduce(
    (sum, blog) => sum + (blog.commentsCount || 0),
    0,
  );

  // Calculate engagement rate
  const totalViews = totalLikes * 10; // Approximate views based on likes
  const engagementRate =
    totalViews > 0 ? Math.round((totalLikes / totalViews) * 100) : 0;

  // Get join date (mock for now - in real app would come from user object)
  const joinDate = new Date(2024, 0, 15); // Example date

  const handleLogout = async () => {
    await logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto py-8 px-4">
          {/* Profile Header Skeleton */}
          <Card className="mb-8 overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-64 mb-4" />
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Skeleton */}
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>

          {/* Tabs Skeleton */}
          <Skeleton className="h-10 w-64 mb-6" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
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
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${user?.email}`}
                  />
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
                    className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Joined {formatDistanceToNow(joinDate, { addSuffix: true })}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    {publishedBlogs.length} Published
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  >
                    <Heart className="h-3 w-3 mr-1" />
                    {totalLikes} Likes
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Blogs</p>
                  <p className="text-3xl font-bold mt-1">
                    {blogs?.length || 0}
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <Progress
                value={
                  blogs?.length
                    ? (publishedBlogs.length / blogs.length) * 100
                    : 0
                }
                className="mt-4 bg-white/20 [&>div]:bg-white"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Published</p>
                  <p className="text-3xl font-bold mt-1">
                    {publishedBlogs.length}
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Eye className="h-6 w-6" />
                </div>
              </div>
              <p className="text-indigo-100 text-sm mt-4">
                {draftBlogs.length} drafts in progress
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Likes</p>
                  <p className="text-3xl font-bold mt-1">{totalLikes}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Heart className="h-6 w-6" />
                </div>
              </div>
              <p className="text-purple-100 text-sm mt-4">
                Across all your blogs
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Engagement</p>
                  <p className="text-3xl font-bold mt-1">{engagementRate}%</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <p className="text-pink-100 text-sm mt-4">
                {totalComments} comments received
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for blogs */}
        <Tabs defaultValue="published" className="space-y-6">
          <TabsList className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 p-1">
            <TabsTrigger
              value="published"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              Published ({publishedBlogs.length})
            </TabsTrigger>
            <TabsTrigger
              value="drafts"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
            >
              <Clock className="h-4 w-4 mr-2" />
              Drafts ({draftBlogs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="published" className="space-y-6">
            {publishedBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {publishedBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <Card className="bg-white/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      No published posts
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Your published blogs will appear here
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    >
                      <Link href="/dashboard/blogs/new">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Create Your First Post
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="drafts" className="space-y-6">
            {draftBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {draftBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <Card className="bg-white/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center">
                      <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No drafts</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      You don't have any draft blogs. Start writing!
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    >
                      <Link href="/dashboard/blogs/new">
                        <Edit3 className="mr-2 h-4 w-4" />
                        Start Writing
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Activity Timeline */}
        {publishedBlogs.length > 0 && (
          <Card className="mt-8 bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publishedBlogs.slice(0, 3).map((blog) => (
                  <div
                    key={blog.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="font-medium hover:text-blue-600 transition-colors"
                      >
                        {blog.title}
                      </Link>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {blog.likesCount || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {blog.commentsCount || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(blog.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    >
                      Active
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
