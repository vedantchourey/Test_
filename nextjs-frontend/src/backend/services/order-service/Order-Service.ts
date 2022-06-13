import { Knex } from "knex";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { orderRepository } from "../database/repositories/order-repository";
import { IOrderResponse } from "./i-Order-response";
import { IOrder } from "../database/models/i-order";
import { createRazorPayOrder } from "../payment-service/payment-service"
import { IOrderRequest } from "./i-Order-request";
import { validateUpdateOrder } from "../payment-service/i-payment-validator";
import { IConfig, IError, } from "../payment-service/i-payment-interface";
import Razorpay from 'razorpay'
import { getRazorPayKeys } from "../payment-service/payment-service"
export const getAllOrders = async (
  context: PerRequestContext,
): Promise<IOrderResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const ordersRepo = new orderRepository(transaction);
  const result = await ordersRepo.fetch();
  return result;
};

export const findOrderById = async (
  req: IOrderRequest,
  context: PerRequestContext,
): Promise<IOrderResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const ordersRepo = new orderRepository(transaction);
  const result = await ordersRepo.findById(req.id);
  return result;
};

export const createOrder = async (
  req: IOrder,
  context: PerRequestContext
): Promise<IOrderResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const orderRepo = new orderRepository(transaction);
  const result = await orderRepo.create(req);
  if (result) {
    const reqBody = { amount: result.total_amount };
    return await createRazorPayOrder(reqBody, context.knexConnection as Knex);
  }
  return result;
};


export const updateOrderPaymentStatus = async (req: IOrderRequest, context: PerRequestContext): Promise<IOrderResponse | IError> => {
  const errors = await validateUpdateOrder(req);
  if (errors) return { errors };
  const [id, secret]: IConfig[] = await getRazorPayKeys(context.knexConnection as Knex)
  const razorpay = new Razorpay({
    key_id: id.value,
    key_secret: secret.value,
  });
  const payment_response: any = await razorpay.payments.fetch(req.razorpay_payment_id);
  if (payment_response?.captured && req.order) {
    const transaction = context.transaction as Knex.Transaction;
    const orderRepo = new orderRepository(transaction);
    const result = await orderRepo.update({
      ...req.order,
      payment_status: 'completed',
      paymentInfo: payment_response,
    });
    return result;
  }
  return payment_response
}


export const updateOrder = async (
  req: IOrder,
  context: PerRequestContext
): Promise<IOrderResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const orderRepo = new orderRepository(transaction);
  const result = await orderRepo.update(req);
  return result;
};

