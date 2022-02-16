export interface ICreatePostRequest {
    postContent: string,
    postImgUrl: string
}

export interface IPostsResponse {
    id: string;
    postContent: string;
    postImgUrl: string;
    createdAt: Date;
    updatedAt: Date;
    username : string;
    firstName : string;
    lastName : string;
    avatarUrl : string;
  }

export interface ICreatePostResponse {
    id: string;
    postContent: string;
    postImgUrl: string;
    createdAt: Date;
    updatedAt: Date;
    postOwner: {
        username : string;
        firstName : string;
        lastName : string;
        avatarUrl : string;
    }
    totalLikes : number;
    totalComments : number;
    isLiked : boolean;
}