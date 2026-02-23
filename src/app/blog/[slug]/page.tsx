import * as React from "react";
import { notFound } from "next/navigation";
import { BlogDetailClient } from "@/features/blogs/components/blog.detail";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
