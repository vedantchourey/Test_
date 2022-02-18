export interface IPostsResponse {
  id: string;
  postContent: string;
  postImgUrl: string;
  createdAt: string;
  updatedAt: string;
  postOwner: {
    id ?: string;
    username : string;
    firstName : string;
    lastName : string;
    avatarUrl : string;
  };
  totalLikes : number;
  totalComments : number;
  isLiked : boolean;
}
export interface ILikePostResponse {
  id: string;
  postId: string;
  likedBy: string;
  createdAt: string;
}