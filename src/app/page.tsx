import { HomepageServer } from "@/components/pages/homepage-server";
import { Suspense } from "react";
import { HomepageLoadingSkeleton } from "@/components/pages/homepage-skeleton";

export const revalidate = 30;

export default function HomePage() {
  return (
    <Suspense fallback={<HomepageLoadingSkeleton />}>
      <HomepageServer />
    </Suspense>
  );
}
