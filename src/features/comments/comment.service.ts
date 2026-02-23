import apiClient from "@/lib/api-client";
import {
  Comment,
  CommentsResponse,
  CreateCommentDto,
  UpdateCommentDto,
} from "./comment.types";

export const commentsService = {
  getComments: async (
    blogId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<CommentsResponse> => {
    const response = await apiClient.get<CommentsResponse>(
      `/blogs/${blogId}/comments`,
      {
        params: { page, limit },
      },
    );
    return response.data;
  },

  createComment: async (
    blogId: string,
    data: CreateCommentDto,
  ): Promise<Comment> => {
    const response = await apiClient.post<Comment>(
      `/blogs/${blogId}/comments`,
      data,
    );
    return response.data;
  },

  getComment: async (blogId: string, commentId: string): Promise<Comment> => {
    const response = await apiClient.get<Comment>(
      `/blogs/${blogId}/comments/${commentId}`,
    );
    return response.data;
  },

  updateComment: async (
    blogId: string,
    commentId: string,
    data: UpdateCommentDto,
  ): Promise<Comment> => {
    const response = await apiClient.patch<Comment>(
      `/blogs/${blogId}/comments/${commentId}`,
      data,
    );
    return response.data;
  },

  deleteComment: async (blogId: string, commentId: string): Promise<void> => {
    await apiClient.delete(`/blogs/${blogId}/comments/${commentId}`);
  },

  deleteAllComments: async (blogId: string): Promise<void> => {
    await apiClient.delete(`/blogs/${blogId}/comments`);
  },
};
