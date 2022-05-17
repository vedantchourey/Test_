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
import BracketsCrud from "../brackets-service/brackets-crud";
import { BTournament } from "../database/repositories/bracket-tournament";
import { BracketsManager } from "brackets-manager";
import { TABLE_NAMES } from "../../../models/constants";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IBParticipants } from "../database/models/i-b-participant";
import { join } from "path/posix";
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
    if (req.createTemplateCode) {
      const tournament = await repository.select({
        templateCode: req.createTemplateCode,
      });
      req = {
        ...tournament,
        ...req,
        status: "DRAFT",
      };
    }
    tournament = await repository.create({ ...req, id: undefined } as any);
  }
  if (req.bracketsMetadata?.playersLimit && tournament?.id) {
    persistBrackets(tournament, knexConnection as Knex);
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

  let tournament = await repository.getTournament(
    tournamentId as string
  );

  const bracketTournamentRepo = new BTournament(
    context.transaction as Knex.Transaction
  );
  const bracketT = await bracketTournamentRepo.select({
    tournament_uuid: tournamentId,
  });

  let players: any = []
  if (bracketT) {
    const part_repo = new CrudRepository<IBParticipants>(context.knexConnection as any, TABLE_NAMES.B_PARTICIPANT);
    players = await part_repo.knexObj().
      join(TABLE_NAMES.PRIVATE_PROFILE, "private_profiles.id", "b_participant.user_id")
.where({
        tournament_id: bracketT.id,
      })
      .whereNotNull("user_id")
      .select(["private_profiles.firstName", "private_profiles.lastName","private_profiles.id"])
    const connect = context.knexConnection;
    const manager = new BracketsManager(
      new BracketsCrud(connect as any) as any
    );
    const brackets = await manager.get.tournamentData(bracketT.id);
    tournament = { ...tournament, brackets };
  }
  return {
    data: {
      ...tournament,
      playerList: players,
      pricingDetails: {
        pricePool:
          Number(tournament?.bracketsMetadata?.playersLimit) *
          Number(tournament?.settings?.entryFeeAmount),
        currentPricePool: players.length
          ? players.length * Number(tournament?.settings?.entryFeeAmount)
          : 0,
      },
    },
  } as any;
}
