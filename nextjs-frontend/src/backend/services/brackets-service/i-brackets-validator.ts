import Joi from "joi";

export function validateRegisterTeam(body: any): any {
    const model = Joi.object({
        tournamentId: Joi.string().required(),
        userId: Joi.string().guid()
            .required(),
        is_team_registration: Joi.boolean(),
        user_list: Joi.array().when("is_team_registration", { is: true, then: Joi.required() }),
        team_id: Joi.string().when("is_team_registration", { is: true, then: Joi.required() })
    });
    const errors = model.validate(body, {
        abortEarly: false,
        allowUnknown: true,
    });
    if (errors) return errors.error?.details.map((x) => x.message);
    return null;
}