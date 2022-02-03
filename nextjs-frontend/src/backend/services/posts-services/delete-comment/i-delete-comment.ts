export interface IDeleteCommentRequest {
    commentId: string;
    commentBy: string;
    postId: string;
}

export interface IDeleteResponse {
    message: string
}