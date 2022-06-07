export interface IOrderRequest {
    amount: number
}
export interface IConfig {
    key: string;
    value: string;
}
export interface IOrderResponse {
    amount: number
}
export interface IUpdateOrderRequest {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export interface IError {
    errors: string[]
}

export interface IUpdateOrderResponse {
    userId: string;
    balance: number;
    transaction_id: string;
    id: string;
}