export interface IUpdatePostRequest {
    postImgUrl: string;
    postContent: string;
}

export interface IPostResponse{
    id: string;
    postContent: string;
    postImgUrl: string;
    createdAt: Date;
    updatedAt: Date;
    username : string;
    avatarUrl : string;
}

export interface IUpdatePostResponse {
    id: string;
    postContent: string;
    postImgUrl: string;
    createdAt: Date;
    updatedAt: Date;
    postOwner: {
        username : string;
        avatarUrl : string;
    }
    totalLikes : number;
    totalComments : number;
    isLiked : boolean;
}