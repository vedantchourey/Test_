import Joi from "joi";

export function validateQuery(body: any): any {
  const model = Joi.object({ game_id: Joi.string().required()
.uuid() });
  const errors = model.validate(body, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (errors) return errors.error?.details.map((x) => x.message);
  return null;
}
