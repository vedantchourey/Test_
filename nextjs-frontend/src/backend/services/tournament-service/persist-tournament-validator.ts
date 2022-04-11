import Joi from "joi";

export function validatePersistTournament(body: any): any {
  const model = Joi.object({
    id: Joi.string().optional(),
    status: Joi.string().when("id", {
      is: "",
      then: Joi.valid("DRAFT", "PUBLISHED").required(),
    }),
    joinStatus: Joi.string().when("id", {
      is: "",
      then: Joi.valid("PRIVATE", "PUBLIC").required(),
    }),
    createTemplateCode: Joi.string().when("id", {
      is: "",
      then: Joi.string().required(),
    }),
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
      platform: Joi.string().required(),
      tournamentFormat: Joi.string().required(),
      entryType: Joi.string().required(),
      entryFeeAmount: Joi.string().when("entryType", {
        is: "credit",
        then: Joi.string().required(),
      }),
      checkInType: Joi.string().required(),
      checkInStartTime: Joi.string().when("checkInType", {
        is: "enable",
        then: Joi.string().required(),
      }),
      ScoreReporting: Joi.string()
        .valid("ADMIN", "ADMIN_PLAYER")
        .required(),
      screenShots: Joi.string()
        .valid("NOT_REQUIRED", "REQUIRED")
        .required(),
      limitType: Joi.string()
        .valid("LIMITED", "UNLIMITED").
        required(),
      limit: Joi.number().when("limitType", {
        is: "limited",
        then: Joi.number()
          .required(),
      }),
      countryFlagOnBrackets: Joi.boolean().required(),
      registrationRegion: Joi.string().valid("all"),
    }).optional(),
    bracketsMetadata: Joi.object({
      name: Joi.string().required(),
      startDate: Joi.date().required(),
      startTime: Joi.date().required(),
      checkInType: Joi.boolean().required(),
      checkInAmount: Joi.number().required(),
      type: Joi.string()
        .valid("SINGLE", "DOUBLE")
        .required(),
      thirdPlace: Joi.boolean().when("type", {
        is: "SINGLE",
        then: Joi.boolean()
          .valid(true)
          .required(),
      }),
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
  const errors = model.validate(body, { abortEarly: false, allowUnknown: true });
  if (errors) return errors.error?.details.map((x) => x.message);
  return null;
}
