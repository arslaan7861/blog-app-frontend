import { User } from "@/features/auth/auth.types";

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  blogId: string;
  user: User;
}

export interface CreateCommentDto {
  content: string;
}

export interface UpdateCommentDto {
  content: string;
}

export interface CommentsResponse {
  data: Comment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
