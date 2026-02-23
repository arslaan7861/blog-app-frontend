export interface LikeResponse {
  liked: boolean;
  likesCount: number;
}

export interface LikeStatusResponse {
  liked: boolean;
  likesCount: number;
}

export interface LikesListResponse {
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
