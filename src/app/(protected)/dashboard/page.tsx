"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { useUserBlogs } from "@/features/blogs/blog.hooks";
import {
  PenSquare,
  FileText,
  ExternalLink,
  TrendingUp,
  Users,
  Eye,
  Sparkles,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BlogCardSkeleton } from "@/features/blogs/components/blog.skeleton";
import { BlogCard } from "@/features/blogs/components/blog.card";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { data: blogs, isLoading } = useUserBlogs();

  const publishedCount = blogs?.filter((b) => b.isPublished).length || 0;
  const draftCount = blogs?.filter((b) => !b.isPublished).length || 0;
  const totalLikes =
    blogs?.reduce((sum, blog) => sum + (blog.likesCount || 0), 0) || 0;
  const totalComments =
    blogs?.reduce((sum, blog) => sum + (blog.commentsCount || 0), 0) || 0;

  const recentBlogs = blogs?.slice(0, 3) || [];

  // Calculate completion percentage for stats
  const completionPercentage = blogs?.length
    ? Math.round((publishedCount / blogs.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">Welcome back!</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {user?.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your blogs and track your performance
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                asChild
                className="bg-white dark:bg-gray-800"
              >
                <Link href="/">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Homepage
                </Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              >
                <Link href="/dashboard/blogs/new">
                  <PenSquare className="mr-2 h-4 w-4" />
                  New Blog
                </Link>
              </Button>
            </div>
          </div>
        </div>

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
                value={completionPercentage}
                className="mt-4 bg-white/20 [&>div]:bg-white"
              />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Published</p>
                  <p className="text-3xl font-bold mt-1">{publishedCount}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Eye className="h-6 w-6" />
                </div>
              </div>
              <p className="text-indigo-100 text-sm mt-4">
                {draftCount} drafts waiting
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
                  <TrendingUp className="h-6 w-6" />
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
                  <p className="text-pink-100 text-sm">Comments</p>
                  <p className="text-3xl font-bold mt-1">{totalComments}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <p className="text-pink-100 text-sm mt-4">
                Engagement from readers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Recent Blogs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Recent Blogs
              </h2>
              <Button variant="link" asChild className="text-blue-600">
                <Link href="/dashboard/blogs">View all →</Link>
              </Button>
            </div>

            {isLoading ? (
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : recentBlogs.length > 0 ? (
              <div className="space-y-4">
                {recentBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <Card className="bg-white/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No blogs yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Get started by creating your first blog post
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-blue-600 to-indigo-600"
                    >
                      <Link href="/dashboard/blogs/new">
                        <PenSquare className="mr-2 h-4 w-4" />
                        Create Your First Blog
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quick Actions & Tips */}
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-0">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Frequently used tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white dark:bg-gray-800"
                  asChild
                >
                  <Link href="/dashboard/blogs/new">
                    <PenSquare className="mr-2 h-4 w-4" />
                    Write New Blog
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white dark:bg-gray-800"
                  asChild
                >
                  <Link href="/dashboard/blogs">
                    <FileText className="mr-2 h-4 w-4" />
                    Manage Blogs
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white dark:bg-gray-800"
                  asChild
                >
                  <Link href="/profile">
                    <Users className="mr-2 h-4 w-4" />
                    View Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Pro Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 text-sm">
                  Blogs with images get 94% more views. Add eye-catching images
                  to your posts to increase engagement!
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-4 bg-white text-blue-600 hover:bg-blue-50"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
