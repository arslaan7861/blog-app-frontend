export interface ApiError {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface ValidationError extends ApiError {
  errors: Record<string, string[]>;
}

export interface RateLimitError {
  statusCode: 429;
  timestamp: string;
  path: string;
  method: string;
  error: "Rate Limit Exceeded";
  message: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  email?: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  author: BlogAuthor;
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

export interface FeedItem {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
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

export interface PublicBlogComment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface PublicBlogCommentsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PublicBlogResponse {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string | null;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  likesCount: number;
  commentsCount: number;
  likedByUser?: boolean;
  comments?: PublicBlogComment[];
  commentsMeta?: PublicBlogCommentsMeta;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  blogId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
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

export interface LikeStatus {
  liked: boolean;
  likesCount: number;
}

export interface LikeResponse {
  liked: boolean;
  likesCount: number;
}

export interface BlogLikesResponse {
  count: number;
  recent: Array<{
    user: {
      id: string;
      name: string;
      email: string;
    };
    likedAt: string;
  }>;
}

export interface HealthResponse {
  status: "ok";
  timestamp: string;
  database: "connected";
  service: "blog-platform-api";
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface CommentsQueryParams extends PaginationParams {
  comments?: boolean;
}
