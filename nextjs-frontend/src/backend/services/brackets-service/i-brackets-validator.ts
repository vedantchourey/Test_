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

export function validateMatchResult(body: any): any {
    const model = Joi.object({
        match_id: Joi.number().required(),
        opponent1: Joi.object({
            score: Joi.number().required(),
            result: Joi.string().required()
.valid("win", "lose"),
        }),
        opponent2: Joi.object({
            score: Joi.number().required(),
            result: Joi.string().required()
.valid("win", "lose"),
        })
    });
    const errors = model.validate(body, { abortEarly: false, allowUnknown: true, });
    if (errors) return errors.error?.details.map((x) => x.message);
    return null;
}