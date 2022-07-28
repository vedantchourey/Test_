export interface ICreateNewsRequest {
    data?: string;
    title: string;
    subtitle: string;
    author: string;
    image: string;
    label?: string;
    description: string;
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