import { NoobApiService } from "../../utils/api-middle-ware/api-middleware-typings";
import {
  CreateOrEditTournamentRequest,
  CreateOrEditTournamentType,
} from "./create-or-edit-tournament-request";
import { ITournamentResponse, ITournamentType } from "./i-tournament-response";
import { validateTournament } from "./create-tournament-validator";
import { isThereAnyError } from "../../../common/utils/validation/validator";
import { TournamentRepository } from "../database/repositories/tournament-repository";
import { TournamentsRepository } from "../database/repositories/tournaments-repository";
import { Knex } from "knex";
import { validatePersistTournament } from "./persist-tournament-validator";
import { persistBrackets } from "../brackets-service/brackets-service";

export const createTournament: NoobApiService<
  CreateOrEditTournamentRequest,
  ITournamentResponse
> = async (req, context) => {
  const errors = await validateTournament(req, context);

  if (isThereAnyError(errors)) return { errors: errors };
  const repository = new TournamentRepository(
    context.transaction as Knex.Transaction
  );
  const createdTournament = await repository.create({
    id: undefined,
    isOpenToPublic: false,
    ...req,
  });
  const { id, ...others } = createdTournament;
  return { data: { id: id as string, ...others } };
};
// @ts-ignore
export const persistTournament: NoobApiService<
  CreateOrEditTournamentType,
  ITournamentType
> = async (req, context) => {
  const errors = await validatePersistTournament(req);
  if (errors) return { errors };
  const repository = new TournamentsRepository(
    context.transaction as Knex.Transaction
  );
  let tournament;

  if (req.id) {
    tournament = await repository.upadte({ ...req } as any);
  } else {
    tournament = await repository.create({ id: undefined, ...req } as any);
  }
  console.log();

  if (req.bracketsMetadata?.playersLimit && tournament.id) {
    let bracket = persistBrackets(tournament, context);
  }
  const { id, ...others } = tournament;
  return { id: id as string, ...others };
};
