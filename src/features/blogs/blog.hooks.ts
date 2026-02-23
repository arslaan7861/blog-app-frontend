import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { blogsService, getBlogErrorMessage } from "./blog.service";
import { CreateBlogDto, UpdateBlogDto } from "./blog.types";

export const blogKeys = {
  all: ["blogs"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  userBlogs: () => [...blogKeys.lists(), "user"] as const,
  feed: (page: number) => [...blogKeys.lists(), "feed", page] as const,
  infiniteFeed: () => [...blogKeys.lists(), "feed", "infinite"] as const,
  popular: (limit: number) => [...blogKeys.lists(), "popular", limit] as const,
  details: () => [...blogKeys.all, "detail"] as const,
  detail: (id: string) => [...blogKeys.details(), id] as const,
  bySlug: (slug: string) => [...blogKeys.details(), "slug", slug] as const,
};

export const useUserBlogs = () => {
  return useQuery({
    queryKey: blogKeys.userBlogs(),
    queryFn: () => blogsService.getUserBlogs(),
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => blogsService.getBlogById(id),
    enabled: !!id,
  });
};

export const useFeed = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: blogKeys.feed(page),
    queryFn: () => blogsService.getFeed(page, limit),
    placeholderData: (previousData) => previousData,
  });
};

export const useInfiniteFeed = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: blogKeys.infiniteFeed(),
    queryFn: ({ pageParam = 1 }) => blogsService.getFeed(pageParam, limit),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNext) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};

export const usePopularBlogs = (limit: number = 5) => {
  return useQuery({
    queryKey: blogKeys.popular(limit),
    queryFn: () => blogsService.getPopularBlogs(limit),
  });
};

export const usePublicBlog = (
  slug: string,
  includeComments: boolean = false,
) => {
  return useQuery({
    queryKey: blogKeys.bySlug(slug),
    queryFn: () => blogsService.getBlogBySlug(slug, includeComments),
    enabled: !!slug,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateBlogDto) => blogsService.createBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.userBlogs() });
      queryClient.invalidateQueries({ queryKey: blogKeys.feed(1) });
      toast.success("Blog created successfully");
      router.push("/dashboard/blogs");
    },
    onError: (error: any) => {
      toast.error(getBlogErrorMessage(error));
    },
  });
};

export const useUpdateBlog = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UpdateBlogDto) => blogsService.updateBlog(id, data),
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.userBlogs() });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(id) });
      queryClient.invalidateQueries({
        queryKey: blogKeys.bySlug(updatedBlog.slug),
      });
      queryClient.invalidateQueries({ queryKey: blogKeys.feed(1) });
      toast.success("Blog updated successfully");
      router.push("/dashboard/blogs");
    },
    onError: (error: any) => {
      toast.error(getBlogErrorMessage(error));
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => blogsService.deleteBlog(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.userBlogs() });
      queryClient.invalidateQueries({ queryKey: blogKeys.feed(1) });
      queryClient.removeQueries({ queryKey: blogKeys.detail(id) });
      toast.success("Blog deleted successfully");
    },
    onError: (error: any) => {
      toast.error(getBlogErrorMessage(error));
    },
  });
};
