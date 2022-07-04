import Joi from "joi";

export function validateOrder(body: any): any {
  const model = Joi.object({
    amount: Joi.number().required(),
  });
  const errors = model.validate(body, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (errors) return errors.error?.details.map((x) => x.message);
  return null;
}

export function validateUpdateOrder(body: any): any {
  const model = Joi.object({
    razorpay_payment_id: Joi.string().required(),
    razorpay_order_id: Joi.string().required(),
    razorpay_signature: Joi.string().required(),
    id: Joi.string().optional(),
  });
  const errors = model.validate(body, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (errors) return errors.error?.details.map((x) => x.message);
  return null;
}

export function validateUpdateOrderPaymentStatus(body: any): any {
  const model = Joi.object({
    razorpay_payment_id: Joi.string().required(),
    razorpay_order_id: Joi.string().required(),
    razorpay_signature: Joi.string().required(),
    order: Joi.object().required(),
  });
  const errors = model.validate(body, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (errors) return errors.error?.details.map((x) => x.message);
  return null;
}
