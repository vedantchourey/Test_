export interface IPost {
  id?: string;
  postType?: string;
  postContent: string;
  postImgUrl: string;
  postedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUpdatePostResponse {
  id?: string;
  postContent: string;
  postType: string;
  postImgUrl: string;
  postedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes: number;
  comments: number;
}

export interface IPostResponse {
  id?: string;
  postType: string;
  postContent: string;
  postImgUrl: string;
  postedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  username : string;
  firstName : string;
  lastName : string;
  avatarUrl : string;
}