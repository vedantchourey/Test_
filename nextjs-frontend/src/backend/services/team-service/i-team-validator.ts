import Joi from "joi";

export function validateTeamCreation(body: any): any {
    const model = Joi.object({
        name: Joi.string().required(),
        platform_id: Joi.string().guid()
            .required(),
        game_id: Joi.string().guid()
            .required(),
    });
    const errors = model.validate(body, {
        abortEarly: false,
        allowUnknown: true,
    });
    if (errors) return errors.error?.details.map((x) => x.message);
    return null;
}
