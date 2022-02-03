// export interface ResetPasswordRequest {
//     email?: string;
//     phone?: string;
// }

export interface NewPasswordRequest {
    password: string;
    confirm_password: string;
    token?: string | null
}
// -----------------------
export interface ResetPasswordRequest {
    email: string;
}

export interface ResetPasswordErrors {
    email?: string;
    apiError?: {
        message?: string
    }
}

export interface UpdatePasswordRequest {
    token: string,
    password: string
}

export interface ResetPasswordResponse {
    message: string;
}