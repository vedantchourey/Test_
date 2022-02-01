export interface IUserFollowerRequest{
    followerId: string,
    userId: string,
    follow_action?: string
}

export interface IUserFollowerResponse{
    message: string
}