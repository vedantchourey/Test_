export interface ResetPasswordRequest {
    email: string;
}

export interface UpdatePasswordRequest {
    token: string,
    password: string
}