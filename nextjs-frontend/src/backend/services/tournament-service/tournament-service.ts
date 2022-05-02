import {
  NoobApiService,
  PerRequestContext,
} from "../../utils/api-middle-ware/api-middleware-typings";
import { CreateOrEditTournamentRequest } from "./create-or-edit-tournament-request";
import {
  IListTournamentResponse,
  ITournamentResponse,
  ITournamentType,
} from "./i-tournament-response";
import { validateTournament } from "./create-tournament-validator";
import { isThereAnyError } from "../../../common/utils/validation/validator";
import { TournamentRepository } from "../database/repositories/tournament-repository";
import { TournamentsRepository } from "../database/repositories/tournaments-repository";
import { Knex } from "knex";
import { validatePersistTournament } from "./persist-tournament-validator";
import { persistBrackets } from "../brackets-service/brackets-service";
import { ServiceResponse } from "../common/contracts/service-response";
import { ListTournamentType } from "./list-tournaments-request";
import { ITournament } from "../database/models/i-tournaments";
import { TournamentUsersRepository } from "../database/repositories/tournament-users-repository";
import BracketsCrud from "../brackets-service/brackets-crud";
import { createKnexConnection } from "../database/knex";
import { BTournament } from "../database/repositories/bracket-tournament";
const { BracketsManager } = require("brackets-manager");
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

export const persistTournament: NoobApiService<
  ITournamentType,
  ITournamentType
> = async (req, { knexConnection }) => {
  const errors = await validatePersistTournament(req);
  if (errors) return { errors };
  const repository = new TournamentsRepository(knexConnection as Knex);
  let tournament;

  if (req.id) {
    tournament = await repository.update({ ...req } as any);
  } else {
    tournament = await repository.create({ id: undefined, ...req } as any);
  }
  if (req.bracketsMetadata?.playersLimit && tournament.id) {
    await persistBrackets(tournament, knexConnection as Knex);
  }
  const { id, ...others } = tournament;
  return { id: id as string, ...others };
};

export async function listTournaments(
  params: ListTournamentType,
  context: PerRequestContext
): Promise<ServiceResponse<null, IListTournamentResponse>> {
  const repository = new TournamentsRepository(
    context.transaction as Knex.Transaction
  );
  const tournaments = await repository.getTournaments(params);

  return { data: tournaments };
}

export async function listTournament(
  context: PerRequestContext
): Promise<ServiceResponse<null, ITournament>> {
  const repository = new TournamentsRepository(
    context.transaction as Knex.Transaction
  );
  const tournamentId = context.getParamValue("tournamentId");
  const tournament = await repository.getTournament(tournamentId as string);
  return {
    data: tournament,
  } as any;
}

export async function tournamentDetails(
  context: PerRequestContext
): Promise<ServiceResponse<null, ITournament>> {
  const tournamentId = context.getParamValue("tournamentId");
  const repository = new TournamentsRepository(
    context.transaction as Knex.Transaction
  );
  let tournament = await repository.getTournamentWithBrackets(
    tournamentId as string
  );
  const tournamentUsersRepo = new TournamentUsersRepository(
    context.transaction as Knex.Transaction
  );
  const users = await tournamentUsersRepo.getUsersDetails({
    tournamentId: tournamentId,
  });
  const bracketTournamentRepo = new BTournament(
    context.transaction as Knex.Transaction
  );
  const bracketT = await bracketTournamentRepo.select({
    tournament_uuid: tournamentId,
  });
  if (bracketT) {
    let connect = createKnexConnection();
    const manager = new BracketsManager(new BracketsCrud(connect as any));
    let brackets = await manager.get.tournamentData(bracketT.id);
    tournament = { ...tournament, brackets };
    await connect.destroy();
  }
  return {
    data: {
      ...tournament,
      playerList: users,
      pricingDetails: {
        pricePool:
          Number(tournament?.bracketsMetadata?.playersLimit) *
          Number(tournament?.settings?.entryFeeAmount),
        currentPricePool: users.length
          ? users.length * Number(tournament?.settings?.entryFeeAmount)
          : 0,
      },
    },
  } as any;
}
