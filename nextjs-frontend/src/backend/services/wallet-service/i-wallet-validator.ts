import Joi from "joi";

export function validateWallet(body: any): any {
  const model = Joi.object({
    userId: Joi.string().required(),
    amount: Joi.number().required(),
    type: Joi.string().optional(),
  });
  const errors = model.validate(body, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (errors) return errors.error?.details.map((x) => x.message);
  return null;
}
