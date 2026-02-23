import { blogsServiceServer } from "@/features/blogs/blog.service.server";
import { Suspense } from "react";
import { FeedPageContent } from "./feed-content";
import { FeedPageSkeleton } from "./feed-skeleton";

export const revalidate = 30;

export default async function FeedPage() {
  return (
    <Suspense fallback={<FeedPageSkeleton />}>
      <FeedPageContent />
    </Suspense>
  );
}
