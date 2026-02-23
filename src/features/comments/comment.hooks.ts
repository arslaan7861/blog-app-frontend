import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { commentsService } from "./comment.service";
import { CreateCommentInput, UpdateCommentInput } from "./comment.schema";
import { toast } from "sonner";

export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  list: (blogId: string) => [...commentKeys.lists(), blogId] as const,
  details: () => [...commentKeys.all, "detail"] as const,
  detail: (commentId: string) => [...commentKeys.details(), commentId] as const,
};

// Queries
export const useComments = (
  blogId: string,
  page: number = 1,
  limit: number = 10,
) => {
  return useQuery({
    queryKey: [...commentKeys.list(blogId), page],
    queryFn: () => commentsService.getComments(blogId, page, limit),
    enabled: !!blogId,
  });
};

export const useInfiniteComments = (blogId: string, limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: commentKeys.list(blogId),
    queryFn: ({ pageParam = 1 }) =>
      commentsService.getComments(blogId, pageParam, limit),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!blogId,
  });
};

// Mutations
export const useCreateComment = (blogId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentInput) =>
      commentsService.createComment(blogId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(blogId) });
      queryClient.invalidateQueries({ queryKey: ["blog", blogId] });
      toast.success("Comment added successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add comment");
    },
  });
};

export const useUpdateComment = (blogId: string, commentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCommentInput) =>
      commentsService.updateComment(blogId, commentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(blogId) });
      queryClient.invalidateQueries({
        queryKey: commentKeys.detail(commentId),
      });
      toast.success("Comment updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update comment");
    },
  });
};

export const useDeleteComment = (blogId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) =>
      commentsService.deleteComment(blogId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(blogId) });
      toast.success("Comment deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete comment");
    },
  });
};

export const useDeleteAllComments = (blogId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => commentsService.deleteAllComments(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(blogId) });
      toast.success("All comments deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete comments");
    },
  });
};
