import { Suspense } from "react";
import { blogsServiceServer } from "@/features/blogs/blog.service.server";
import { BlogDetailSkeleton } from "@/features/blogs/components/blog.details.skeleton";
import { BlogDetailClient } from "@/features/blogs/components/blog.detail";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 30;

async function BlogContent({ slug }: { slug: string }) {
  try {
    const blog = await blogsServiceServer.getBlogBySlug(slug, true, 1, 10, 30);

    if (!blog) {
      notFound();
    }

    return <BlogDetailClient slug={slug} />;
  } catch (error) {
    console.error("Error loading blog:", error);
    notFound();
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<BlogDetailSkeleton />}>
      <BlogContent slug={slug} />
    </Suspense>
  );
}
