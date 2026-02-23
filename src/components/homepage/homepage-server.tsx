import { Suspense } from "react";
import { homepageComponentsServer } from "./homepage-server-loading";
import { HomepageLoadingSkeleton } from "./homepage-skeleton";

export async function HomepageServer() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <homepageComponentsServer.HeroSection />
      <homepageComponentsServer.StatsSection />

      <Suspense fallback={<div className="h-96" />}>
        <homepageComponentsServer.FeaturedBlogsSection />
      </Suspense>

      <Suspense fallback={<div className="h-32" />}>
        <homepageComponentsServer.CTASection />
      </Suspense>
    </div>
  );
}
