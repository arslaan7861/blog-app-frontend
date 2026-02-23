"use client";

import Link from "next/link";
import { Eye, Clock, Sparkles, Edit3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Blog } from "@/features/blogs/blog.types";
import { BlogCard } from "@/features/blogs/components/blog.card";

interface ProfileTabsProps {
  publishedBlogs: Blog[];
  draftBlogs: Blog[];
}

export function ProfileTabs({ publishedBlogs, draftBlogs }: ProfileTabsProps) {
  return (
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
          <EmptyState
            icon={<Eye className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
            title="No published posts"
            description="Your published blogs will appear here"
            buttonText="Create Your First Post"
            buttonIcon={<Sparkles className="mr-2 h-4 w-4" />}
            href="/dashboard/blogs/new"
          />
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
          <EmptyState
            icon={
              <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            }
            title="No drafts"
            description="You don't have any draft blogs. Start writing!"
            buttonText="Start Writing"
            buttonIcon={<Edit3 className="mr-2 h-4 w-4" />}
            href="/dashboard/blogs/new"
          />
        )}
      </TabsContent>
    </Tabs>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: React.ReactNode;
  href: string;
}

function EmptyState({
  icon,
  title,
  description,
  buttonText,
  buttonIcon,
  href,
}: EmptyStateProps) {
  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          >
            <Link href={href}>
              {buttonIcon}
              {buttonText}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
