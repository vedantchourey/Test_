export interface ICreateNewsRequest {
    message?: string;
    type?: string;
    subject?: string;
}

export interface INewsResponse {
    id?: string;
    title: string;
    subtitle: string;
    author: string;
    image: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICreateNewsResponse {
    id?: string;
    title: string;
    subtitle: string;
    author: string;
    image: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}