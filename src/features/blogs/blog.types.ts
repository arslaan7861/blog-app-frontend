import { User } from "../auth/auth.types";
import { CreateBlogInput, UpdateBlogInput } from "./blog.schema";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  author: User;
  likesCount?: number;
  commentsCount?: number;
  likedByUser?: boolean;
}

export interface CreateBlogDto {
  title: string;
  content: string;
  isPublished?: boolean;
}

export interface UpdateBlogDto {
  title?: string;
  content?: string;
  isPublished?: boolean;
}

export interface BlogResponse {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  author: User;
}

export interface FeedItem {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  createdAt: string;
  author: Pick<User, "id" | "name" | "email">;
  likesCount: number;
  commentsCount: number;
}

export interface FeedResponse {
  data: FeedItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface PopularBlogsResponse extends Array<FeedItem> {}

export interface BlogWithComments extends Blog {
  comments?: Comment[];
  commentsMeta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
// Add these to your existing types

export type CreateMode = {
  mode: "create";
  initialData?: never;
  onSubmit: (data: CreateBlogInput) => Promise<void>;
};

export type EditMode = {
  mode: "edit";
  initialData: Blog;
  onSubmit: (data: UpdateBlogInput) => Promise<void>;
};

export type BlogFormProps = (CreateMode | EditMode) & {
  isPending: boolean;
};
