"use client";

import Link from "next/link";
import { useFeed } from "@/features/blogs/blog.hooks";
import { useAuthStore } from "@/store/auth.store";
import { PenSquare, TrendingUp, Users, Sparkles, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/ui/hero-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { EnhancedBlogCard } from "@/features/blogs/components/blog.enhanced.card";

export function HomepageClient() {
  const { isAuthenticated } = useAuthStore();
  const { data: feedData, isLoading, error } = useFeed(1, 10);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <HeaderSkeleton />
        <HeroSectionSkeleton />
        <FeedSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Header />
        <HeroSection
          title="Discover Amazing Stories"
          subtitle="Join our community of writers and readers"
          showCta={!isAuthenticated}
        />
        <div className="max-w-4xl mx-auto py-12 px-4">
          <Card className="border-red-200">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Failed to load blogs</p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const blogs = feedData?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <Header />

      <HeroSection
        title="Share Your Stories with the World"
        subtitle="A modern blogging platform where ideas come to life. Join thousands of writers and readers in our growing community."
        showCta={!isAuthenticated}
      />

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <PenSquare className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">10K+</p>
                  <p className="text-blue-100">Blogs Published</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">5K+</p>
                  <p className="text-indigo-100">Active Writers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold">50K+</p>
                  <p className="text-purple-100">Monthly Readers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured Blogs Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Latest from our community</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Discover Amazing Stories
          </h2>
        </div>

        {blogs.length === 0 ? (
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <p className="text-gray-500">No blogs published yet</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <EnhancedBlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="max-w-4xl mx-auto py-16 px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Share Your Story?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join our community today and start writing
            </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <Link href="/register">
                Get Started Now
                <Sparkles className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Skeleton Components
function HeaderSkeleton() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSectionSkeleton() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white py-24">
      <div className="max-w-3xl mx-auto text-center px-4">
        <Skeleton className="h-12 w-48 mx-auto mb-4" />
        <Skeleton className="h-8 w-96 mx-auto mb-8" />
        <div className="flex gap-4 justify-center">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </div>
  );
}

function FeedSkeleton() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <Skeleton className="h-8 w-64 mx-auto mb-2" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Header() {
  const { isAuthenticated, user } = useAuthStore();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            BlogPlatform
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Link href={"/profile"}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {user?.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
