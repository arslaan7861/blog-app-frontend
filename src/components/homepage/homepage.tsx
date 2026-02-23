"use client";

import Link from "next/link";
import { useFeed } from "@/features/blogs/blog.hooks";
import { useAuthStore } from "@/store/auth.store";
import { Sparkles, PenSquare, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/ui/hero-section";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { EnhancedBlogCard } from "@/features/blogs/components/blog.enhanced.card";

export function HomepageClient() {
  const { isAuthenticated } = useAuthStore();
  const { data: feedData, isLoading, error } = useFeed(1, 9);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-950">
        <HeroSectionSkeleton />
        <FeedSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-950">
        <HeroSection
          title="Discover Amazing Stories"
          subtitle="Join our community of writers and readers"
          showCta={!isAuthenticated}
        />
        <div className="max-w-7xl mx-auto py-12 px-4">
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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <HeroSection
        title="Share Your Stories with the World"
        subtitle="A modern blogging platform where ideas come to life. Join thousands of writers and readers in our growing community."
        showCta={!isAuthenticated}
      />

      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                10K+
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Blog Posts Published
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                5K+
              </div>
              <p className="text-gray-600 dark:text-gray-400">Active Writers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                50K+
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Monthly Readers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Latest Stories</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Discover Amazing Stories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Read the latest insights, tutorials, and stories from our community
          </p>
        </div>

        {blogs.length === 0 ? (
          <Card className="border border-gray-200 dark:border-gray-800">
            <CardContent className="pt-6">
              <div className="text-center py-16">
                <Sparkles className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No blogs published yet
                </p>
                {!isAuthenticated && (
                  <Button asChild className="mt-6">
                    <Link href="/register">Be the first to write</Link>
                  </Button>
                )}
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

        {blogs.length > 0 && (
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/feed">
                View all stories <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>

      {!isAuthenticated && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto py-16 px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Share Your Story?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our growing community of writers and start publishing today
            </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
            >
              <Link href="/register">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto py-16 px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Start Writing Today
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Share your thoughts, ideas, and experiences with our community
            </p>
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 font-semibold"
            >
              <Link href="/dashboard/blogs/new">
                <PenSquare className="mr-2 h-5 w-5" />
                Write New Post
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function HeroSectionSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 py-24">
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
