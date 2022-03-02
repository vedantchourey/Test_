export interface ICreatePostRequest {
    postContent: string,
    postImgUrl: string
}

export interface IPostsResponse {
    id: string;
    postContent: string;
    postImgUrl: string;
    postUrl:string;
    urlPostTitle: string;
    postType: string;
    createdAt: Date;
    updatedAt: Date;
    username : string;
    avatarUrl : string;
  }

export interface ICreatePostResponse {
    id: string;
    postContent: string;
    postImgUrl: string;
    postType: string;
    createdAt: Date;
    updatedAt: Date;
    postUrl?: string;
    urlPostTitle?: string;
    postOwner: {
        username : string;
        avatarUrl : string;
    }
    totalLikes : number;
    totalComments : number;
    isLiked : boolean;
}