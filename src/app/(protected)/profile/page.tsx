"use client";

import { useAuthStore } from "@/store/auth.store";
import { useUserBlogs } from "@/features/blogs/blog.hooks";
import { ProfileSkeleton } from "@/components/profile/profile.skeleton";
import { ProfileHeader } from "@/components/profile/profile.header";
import { ProfileStats } from "@/components/profile/profile.stats";
import { ProfileTabs } from "@/components/profile/profile.tabs";
import { ActivityTimeline } from "@/components/profile/profile.activity.timeline";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { data: blogs, isLoading } = useUserBlogs();

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

  const stats = {
    totalBlogs: blogs?.length || 0,
    publishedCount: publishedBlogs.length,
    draftCount: draftBlogs.length,
    totalLikes,
    totalComments,
    engagementRate,
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ProfileHeader user={user} stats={stats} />
        <ProfileStats stats={stats} />
        <ProfileTabs publishedBlogs={publishedBlogs} draftBlogs={draftBlogs} />
        {publishedBlogs.length > 0 && (
          <ActivityTimeline blogs={publishedBlogs.slice(0, 3)} />
        )}
      </div>
    </div>
  );
}
