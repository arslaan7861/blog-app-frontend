import {
  Blog,
  FeedResponse,
  PopularBlogsResponse,
  BlogWithComments,
} from "@/features/blogs/blog.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

async function fetchWithRevalidate<T>(
  endpoint: string,
  revalidateTime: number = 30,
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: revalidateTime,
      tags: [endpoint],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }

  return response.json();
}

export const blogsServiceServer = {
  getFeed: async (
    page: number = 1,
    limit: number = 10,
    revalidateTime: number = 30,
  ): Promise<FeedResponse> => {
    const queryString = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    }).toString();

    return fetchWithRevalidate<FeedResponse>(
      `/public/feed?${queryString}`,
      revalidateTime,
    );
  },

  getPopularBlogs: async (
    limit: number = 5,
    revalidateTime: number = 30,
  ): Promise<PopularBlogsResponse> => {
    const queryString = new URLSearchParams({
      limit: limit.toString(),
    }).toString();

    return fetchWithRevalidate<PopularBlogsResponse>(
      `/public/popular?${queryString}`,
      revalidateTime,
    );
  },

  getBlogBySlug: async (
    slug: string,
    includeComments: boolean = false,
    page: number = 1,
    limit: number = 10,
    revalidateTime: number = 30,
  ): Promise<BlogWithComments> => {
    const queryString = new URLSearchParams({
      comments: includeComments.toString(),
      page: page.toString(),
      limit: limit.toString(),
    }).toString();

    return fetchWithRevalidate<BlogWithComments>(
      `/public/blogs/${slug}?${queryString}`,
      revalidateTime,
    );
  },
};
