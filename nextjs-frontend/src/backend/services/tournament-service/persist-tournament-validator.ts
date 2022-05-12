import Joi from "joi";

export function validatePersistTournament(body: any): any {
  const model = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().required(),
    game: Joi.string().required(),
    startDate: Joi.date().required(),
    startTime: Joi.string().required(),
    about: Joi.string().required(),
    banner: Joi.string().required(),
    sponsor: Joi.string(),
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
      checkInType: Joi.string().required(),
      ScoreReporting: Joi.string()
        .valid("ADMIN", "ADMIN_PLAYER")
        .required(),
      screenShots: Joi.string()
        .valid("NOT_REQUIRED", "REQUIRED")
        .required(),
      limitType: Joi.string()
        .valid("LIMITED", "UNLIMITED").
        required(),
      countryFlagOnBrackets: Joi.boolean().required(),
      registrationRegion: Joi.string().required(),
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
      playersLimit: Joi.number().required(),
      rounds: Joi.array().items(
        Joi.object({
          round: Joi.string().required(),
          description: Joi.string().required(),
        })
      ),
    }).optional(),
    streams: Joi.object({
      data: Joi.array()
        .items(
          Joi.object({
            provider: Joi.string().required(),
            url: Joi.string().required(),
          })
        )
        .optional()
    }).optional(),
  });
  const errors = model.validate(body, { abortEarly: false, allowUnknown: true });
  if (errors) return errors.error?.details.map((x) => x.message);
  return null;
}

export function fetchInivtesValidator(body: any): any {
  const model = Joi.object({
    tournament_id: Joi.string().required(),
    team_id: Joi.string().when("is_team_registration", { is: true, then: Joi.required() })
  });
  const errors = model.validate(body, {
    abortEarly: false,
    allowUnknown: true,
  });
  if (errors) return errors.error?.details.map((x) => x.message);
  return null;
}
