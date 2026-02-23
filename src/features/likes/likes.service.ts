import apiClient from "@/lib/api-client";
import {
  LikeResponse,
  LikeStatusResponse,
  LikesListResponse,
} from "./likes.types";

export const likesService = {
  likeBlog: async (blogId: string): Promise<LikeResponse> => {
    const response = await apiClient.post<LikeResponse>(
      `/blogs/${blogId}/likes`,
    );
    return response.data;
  },

  unlikeBlog: async (blogId: string): Promise<LikeResponse> => {
    const response = await apiClient.delete<LikeResponse>(
      `/blogs/${blogId}/likes`,
    );
    return response.data;
  },

  getLikeStatus: async (blogId: string): Promise<LikeStatusResponse> => {
    const response = await apiClient.get<LikeStatusResponse>(
      `/blogs/${blogId}/likes/status`,
    );
    return response.data;
  },

  getBlogLikes: async (blogId: string): Promise<LikesListResponse> => {
    const response = await apiClient.get<LikesListResponse>(
      `/blogs/${blogId}/likes`,
    );
    return response.data;
  },
};
