export interface IPostsResponse {
  id: string;
  postContent: string;
  postImgUrl: string;
  createdAt: string;
  updatedAt: string;
  postOwner: {
    id?: string;
    username: string;
    avatarUrl: string;
  };
  totalLikes: number;
  totalComments: number;
  isLiked: boolean;
  postType: 'default' | 'url'
}
export interface ILikePostResponse {
  id: string;
  postId: string;
  likedBy: string;
  createdAt: string;
}

export interface IPostCommentResponse {
  id: string;
  comment: string;
  commentOwner: {
    id?: string;
    username: string;
    avatarUrl: string;
  }
  postId: string;
  createdAt: string;
}

export interface IPostImageUploadResponse {
  publicUrl: string;
  url: string;
  bucket: string;
}