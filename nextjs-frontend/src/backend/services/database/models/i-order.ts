import { IProduct } from "./i-product";

export interface IOrderProduct extends IProduct {
    quantity: number;
}
type GenericObject = { [key: string]: any };

export interface IOrder {
    id: string;
    order_id: string;
    payment_status: string;
    status: string;
    products: IOrderProduct[];
    createdAt?: Date;
    amount: number;
    paymentInfo: GenericObject;
}