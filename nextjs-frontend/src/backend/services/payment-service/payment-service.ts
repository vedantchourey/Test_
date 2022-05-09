import { Knex } from "knex";
import { validateOrder, validateUpdateOrder } from "./i-payment-validator";
import Razorpay from 'razorpay'
import { IConfig, IOrderRequest, IOrderResponse, IUpdateOrderRequest, IError, IUpdateOrderResponse } from "./i-payment-interface";
import { creditBalance } from "../wallet-service/wallet-service";
import { IUser } from "../database/models/i-user";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { backendConfig } from "../../utils/config/backend-config"

export const createRazorPayOrder = async (req: IOrderRequest, context: Knex): Promise<IOrderResponse | IError> => {
  try {
    const errors = await validateOrder(req);
    if (errors) return { errors };
    const [id, secret]: IConfig[] = await getRazorPayKeys(context)
    const { credit_config } = backendConfig
    let amount = req.amount * credit_config.price_per_credit;
    let gst = Math.ceil((amount * credit_config.credit_gst_percentage) / 100);
    let service_charge = Math.ceil((amount * credit_config.credit_service_percentage) / 100);
    const razorpay = new Razorpay({
      key_id: id.value,
      key_secret: secret.value,
    });
    const options = {
      amount: (amount + gst + service_charge) * 100,
      currency: "INR",
      payment_capture: 1,
    };
    const response = await razorpay.orders.create(options);
    return {
      order_id: response.id,
      currency: response.currency,
      amount,
      gst,
      service_charge,
      total_amount: response.amount / 100,
      key: id.value,
    } as any
  } catch (ex: any) {
    return {
      errors: [ex.message]
    }
  }
}
export const updateRazorPayOrder = async (req: IUpdateOrderRequest, context: PerRequestContext, user: IUser | undefined): Promise<IUpdateOrderResponse | IError> => {
  const errors = await validateUpdateOrder(req);
  if (errors) return { errors };
  const [id, secret]: IConfig[] = await getRazorPayKeys(context.knexConnection as Knex)
  const razorpay = new Razorpay({
    key_id: id.value,
    key_secret: secret.value,
  });
  const payment_response: any = await razorpay.payments.fetch(req.razorpay_payment_id);
  if (payment_response?.captured && user) {
    const d = await creditBalance({
      userId: user.id,
      amount: payment_response.amount / 100,
      type: "BALANCE_ADD"

    }, context.transaction as any, payment_response as any)
    return d as IUpdateOrderResponse
  }
  return payment_response
}
export const getRazorPayKeys = async (context: Knex): Promise<any[]> => {
  const config = await context('configs').whereIn("key", ["RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET"])
  if (config.length !== 2) {
    throw new Error("Razor pay config keys missing")
  }
  return config
}
