export interface IPostComment {
  id?: string,
  comment: string,
  commentBy: string,
  postId: string,
  createdAt?: Date,
  updatedAt?: Date
}
