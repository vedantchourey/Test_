export interface IPostComment {
  id?: string,
  comment: string,
  commentBy: string,
  postId: string,
  createdAt?: Date,
  updatedAt?: Date,
  subComment?: string,
}

export interface IPostCommentResponse {
  id: string,
  comment: string,
  commentBy: string,
  postId: string,
  username: string,
  firstName: string,
  lastName: string,
  avatarUrl: string,
  createdAt: Date,
  updatedAt: Date
}