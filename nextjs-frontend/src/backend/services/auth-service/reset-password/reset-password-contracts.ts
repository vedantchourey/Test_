export type ResetPasswordRequest = {
    email?: string;
    phone?: string;
}

export interface NewPasswordRequest {
    email: string;
    code: string;
    new_password: string
}