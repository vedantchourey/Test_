export interface ICreatePostCommentResponse {
  id : string;
  comment : string;
  commentOwner :{
    id ?: string;
    username : string;
    firstName : string;
    lastName : string;
    avatarUrl : string;
  }
  postId : string;
  createdAt : string;
}