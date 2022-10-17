export interface ICreateHomeCarouselRequest {
    data?: string;
    name: string;
    subtitle: string;
    navigation: string;
    image: string;
}

export interface ICreateHomeCarouselResponse {
    id?: string;
    name: string;
    subtitle: string;
    navigation: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}