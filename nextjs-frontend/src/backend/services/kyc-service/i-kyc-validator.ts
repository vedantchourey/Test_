import Joi from "joi";

export function validateKYCReq(body: any): any {
    const model = Joi.object({
        mobile: Joi.string().required()
.min(10),
        accNo: Joi.string().required()
.min(11)
.max(16),
        ifsc: Joi.string().required()
.min(11),
        name: Joi.string().required(),
        aadhar_no: Joi.string().required()
.min(12),
    });
    const errors = model.validate(body, {
        abortEarly: false,
        allowUnknown: true,
    });
    if (errors) return errors.error?.details.map((x) => x.message);
    return null;
}