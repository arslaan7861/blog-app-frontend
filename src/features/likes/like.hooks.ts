import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { likesService } from "./likes.service";
import { toast } from "sonner";

export const likeKeys = {
  all: ["likes"] as const,
  status: (blogId: string) => [...likeKeys.all, "status", blogId] as const,
  list: (blogId: string) => [...likeKeys.all, "list", blogId] as const,
};

export const useLikeStatus = (blogId: string) => {
  return useQuery({
    queryKey: likeKeys.status(blogId),
    queryFn: () => likesService.getLikeStatus(blogId),
    enabled: !!blogId,
  });
};

export const useLikeBlog = (blogId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likesService.likeBlog(blogId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: likeKeys.status(blogId) });

      const previousStatus = queryClient.getQueryData(likeKeys.status(blogId));

      queryClient.setQueryData(likeKeys.status(blogId), (old: any) => ({
        liked: true,
        likesCount: (old?.likesCount || 0) + 1,
      }));

      return { previousStatus };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        likeKeys.status(blogId),
        context?.previousStatus,
      );
      toast.error("Failed to like blog");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: likeKeys.status(blogId) });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useUnlikeBlog = (blogId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likesService.unlikeBlog(blogId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: likeKeys.status(blogId) });

      const previousStatus = queryClient.getQueryData(likeKeys.status(blogId));

      queryClient.setQueryData(likeKeys.status(blogId), (old: any) => ({
        liked: false,
        likesCount: Math.max((old?.likesCount || 0) - 1, 0),
      }));

      return { previousStatus };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        likeKeys.status(blogId),
        context?.previousStatus,
      );
      toast.error("Failed to unlike blog");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: likeKeys.status(blogId) });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
