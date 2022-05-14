import Joi from "joi";
import { STATUS } from "../../../models/constants";

export function validateNotificationResponse(body: any): any {
    const model = Joi.object({
        id: Joi.string().guid()
            .required(),
        response: Joi.string()
            .required().valid(STATUS.ACCEPTED, STATUS.REJECTED),
    });
    const errors = model.validate(body, {
        abortEarly: false,
        allowUnknown: true,
    });
    if (errors) return errors.error?.details.map((x) => x.message);
    return null;
}