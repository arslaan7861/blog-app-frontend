"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useState } from "react";
export const queryKeys = {
  profile: ["profile"],

  userBlogs: ["userBlogs"],

  feed: (page: number) => ["feed", page],

  blog: (slug: string) => ["blog", slug],

  comments: (blogId: string, page: number) => ["comments", blogId, page],
};
export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // prevents recreation on re-render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,

            staleTime: 1000 * 60 * 2, // 2 min cache

            refetchOnWindowFocus: false,
          },

          mutations: {
            retry: 0,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
