import { FileText, Eye, Heart, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProfileStatsProps {
  stats: {
    totalBlogs: number;
    publishedCount: number;
    draftCount: number;
    totalLikes: number;
    engagementRate: number;
    totalComments: number;
  };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Blogs</p>
              <p className="text-3xl font-bold mt-1">{stats.totalBlogs}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <FileText className="h-6 w-6" />
            </div>
          </div>
          <Progress
            value={
              stats.totalBlogs
                ? (stats.publishedCount / stats.totalBlogs) * 100
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
              <p className="text-3xl font-bold mt-1">{stats.publishedCount}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Eye className="h-6 w-6" />
            </div>
          </div>
          <p className="text-indigo-100 text-sm mt-4">
            {stats.draftCount} drafts in progress
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Likes</p>
              <p className="text-3xl font-bold mt-1">{stats.totalLikes}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <Heart className="h-6 w-6" />
            </div>
          </div>
          <p className="text-purple-100 text-sm mt-4">Across all your blogs</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm">Engagement</p>
              <p className="text-3xl font-bold mt-1">{stats.engagementRate}%</p>
            </div>
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <p className="text-pink-100 text-sm mt-4">
            {stats.totalComments} comments received
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
