export interface ResetPasswordRequest {
    email: string;
}

export interface NewPasswordRequest {
    password: string;
    confirm_password: string;
    token?: string | null
}
export interface NewPasswordResponse {
    message: string;
    apiError?: {
        message?: string
    }
}

export interface ResetPasswordResponse {
    message: string;
    apiError?: {
        message?: string
    }
}