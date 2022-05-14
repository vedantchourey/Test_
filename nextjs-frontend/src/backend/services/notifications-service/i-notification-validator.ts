import Joi from "joi";

export function validateNotificationResponse(body: any): any {
    const model = Joi.object({
        id: Joi.string().guid()
            .required(),
        response: Joi.string()
            .required().valid("ACCEPTED", "REJECTED"),
    });
    const errors = model.validate(body, {
        abortEarly: false,
        allowUnknown: true,
    });
    if (errors) return errors.error?.details.map((x) => x.message);
    return null;
}