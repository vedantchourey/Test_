import Joi from "joi";

export function validateRegisterSingle(body: any): any {
    const model = Joi.object({ tournamentId: Joi.string().required() });
    const errors = model.validate(body, { abortEarly: false, allowUnknown: true, });
    if (errors) return errors.error?.details.map((x) => x.message);
    return null;
}

export function validateRegisterTeam(body: any): any {
    const model = Joi.object({
        tournamentId: Joi.string().required(),
        userId: Joi.string().guid()
            .required(),
        is_team_registration: Joi.boolean().required()
            .valid(true),
        user_list: Joi.array().required(),
        team_id: Joi.string().required()
    });
    const errors = model.validate(body, { abortEarly: false, allowUnknown: true, });
    if (errors) return errors.error?.details.map((x) => x.message);
    return null;
}