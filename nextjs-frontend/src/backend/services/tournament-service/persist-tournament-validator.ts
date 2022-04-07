import Joi from "joi";

export function validatePersistTournament(body: any) {
  let model = Joi.object({
    status: Joi.string().valid("DRAFT", "PUBLISHED").required(),
    joinStatus: Joi.string().valid("PRIVATE", "PUBLIC").required(),
    createTemplateCode: Joi.string().required(),
    id: Joi.string().optional(),
    basic: Joi.object({
      name: Joi.string().required(),
      game: Joi.string().required(),
      startDate: Joi.date().required(),
      startTime: Joi.date().required(),
      about: Joi.string().required(),
      banner: Joi.string().required(),
    }).optional(),
    info: Joi.object({
      contactOption: Joi.string().required(),
      contactUrl: Joi.string().required(),
      contactDetails: Joi.string().required(),
      rules: Joi.string().required(),
      prizes: Joi.string().required(),
    }).optional(),
    settings: Joi.object({
      server: Joi.string().required(),
      plateform: Joi.string().required(),
      tournamentFormat: Joi.string().required(),
      entryType: Joi.string().required(),
      entryFeeAmount: Joi.string().required(),
      checkInType: Joi.string().required(),
      checkInStartTime: Joi.string().required(),
      ScoreReporting: Joi.string().valid("ADMIN", "ADMIN_PLAYER").required(),
      screenShots: Joi.string().valid("NOT_REQUIRED", "REQUIRED").required(),
      limitType: Joi.string().valid("LIMITED", "UNLIMITED").required(),
      limit: Joi.number().required(),
      countryFlagOnBrackets: Joi.boolean().required(),
      registrationRegion: Joi.string().valid("all"),
    }).optional(),
    bracketsMetadata: Joi.object({
      name: Joi.string().required(),
      startDate: Joi.date().required(),
      startTime: Joi.date().required(),
      checkInType: Joi.boolean().required(),
      checkInAmount: Joi.number().valid(12).required(),
      type: Joi.string().valid("SINGLE", "DOUBLE").required(),
      thirdPlace: Joi.boolean().valid(true).required(),
      playersLimit: Joi.number().required(),
      rounds: Joi.array().items(
        Joi.object({
          round: Joi.string().required(),
          description: Joi.string().required(),
        })
      ),
    }).optional(),
    streams: Joi.array()
      .items(
        Joi.object({
          provider: Joi.string().required(),
          url: Joi.string().required(),
        })
      )
      .optional(),
  });
  let errors = model.validate(body, { abortEarly: false });
  if (errors)
    return errors.error?.details.map((x) => x.message);
  return null;
}
