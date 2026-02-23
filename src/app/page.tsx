import { HomepageClient } from "@/components/pages/homepage";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense fallback={<HomepageSkeleton />}>
      <HomepageClient />
    </Suspense>
  );
}

export function HomepageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold">BlogPlatform</div>
            <div className="flex gap-4">
              <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
