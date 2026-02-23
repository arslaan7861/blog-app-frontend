import apiClient from "@/lib/api-client";
import {
  Blog,
  CreateBlogDto,
  UpdateBlogDto,
  FeedResponse,
  PopularBlogsResponse,
  BlogWithComments,
  FeedItem,
} from "./blog.types";

export const blogsService = {
  // Private endpoints (dashboard)
  getUserBlogs: async (): Promise<Blog[]> => {
    const response = await apiClient.get<Blog[]>("/blogs");
    return response.data;
  },

  getBlogById: async (id: string): Promise<Blog> => {
    const response = await apiClient.get<Blog>(`/blogs/${id}`);
    return response.data;
  },

  createBlog: async (data: CreateBlogDto): Promise<Blog> => {
    const response = await apiClient.post<Blog>("/blogs", data);
    return response.data;
  },

  updateBlog: async (id: string, data: UpdateBlogDto): Promise<Blog> => {
    const response = await apiClient.patch<Blog>(`/blogs/${id}`, data);
    return response.data;
  },

  deleteBlog: async (id: string): Promise<void> => {
    await apiClient.delete(`/blogs/${id}`);
  },

  // Public endpoints
  getFeed: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<FeedResponse> => {
    const response = await apiClient.get<FeedResponse>("/public/feed", {
      params: { page, limit },
    });
    return response.data;
  },

  getPopularBlogs: async (limit: number = 5): Promise<PopularBlogsResponse> => {
    const response = await apiClient.get<PopularBlogsResponse>(
      "/public/popular",
      {
        params: { limit },
      },
    );
    return response.data;
  },

  getBlogBySlug: async (
    slug: string,
    includeComments: boolean = false,
    page: number = 1,
    limit: number = 10,
  ): Promise<BlogWithComments> => {
    const response = await apiClient.get<BlogWithComments>(
      `/public/blogs/${slug}`,
      {
        params: {
          comments: includeComments,
          page,
          limit,
        },
      },
    );
    return response.data;
  },
};

// Helper to extract error messages
export const getBlogErrorMessage = (error: unknown): string => {
  const axiosError = error as any;

  if (!axiosError.response?.data) {
    return "An unexpected error occurred";
  }

  const { message } = axiosError.response.data;

  if (typeof message === "string") {
    return message;
  }

  if (typeof message === "object") {
    const errors = Object.values(message).flat();
    return (errors[0] as string) || "Validation failed";
  }

  return "Failed to process request";
};
