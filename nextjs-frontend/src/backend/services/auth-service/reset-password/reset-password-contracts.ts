// export interface ResetPasswordRequest {
//     email?: string;
//     phone?: string;
// }

export interface NewPasswordRequest {
    email: string;
    code: string;
    new_password: string
}
// -----------------------
export interface ResetPasswordRequest {
    email: string;
}

export interface UpdatePasswordRequest {
    token: string,
    password: string
}

export interface ResetPasswordResponse {
    message: string;
}