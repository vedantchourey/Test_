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
import knex, { Knex } from "knex";
import { fetchInivtesValidator, validatePersistTournament } from "./persist-tournament-validator";
import { persistBrackets, registerTeamTournament } from "../brackets-service/brackets-service";
import { ServiceResponse } from "../common/contracts/service-response";
import { ListTournamentType } from "./list-tournaments-request";
import { ITournament } from "../database/models/i-tournaments";
import BracketsCrud from "../brackets-service/brackets-crud";
import { BTournament } from "../database/repositories/bracket-tournament";
import { BracketsManager } from "brackets-manager";
import { STATUS, TABLE_NAMES, TOURNAMENT_TYPE_NUMBER } from "../../../models/constants";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IBParticipants } from "../database/models/i-b-participant";
import { ITournamentInvites } from "../database/models/i-tournament-invites";
import _ from "lodash";
import { getErrorObject } from "../common/helper/utils.service";
import { debitBalance } from "../wallet-service/wallet-service";

const getTournamentInviteObj = (knexConnection: Knex) => {
  return new CrudRepository<ITournamentInvites>(knexConnection, TABLE_NAMES.TOURNAMENT_INIVTES)
}

const getTournamentObj = (knexConnection: Knex) => {
  return new CrudRepository<ITournament>(knexConnection, TABLE_NAMES.TOURNAMENTS)
}

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
    persistBrackets(tournament);
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
  try {
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
      if (tournament?.settings?.tournamentFormat == "1v1") {
        players = await part_repo.knexObj().
          join(TABLE_NAMES.PRIVATE_PROFILE, "private_profiles.id", "b_participant.user_id").where({ tournament_id: bracketT.id, })
          .select(["private_profiles.firstName", "private_profiles.lastName", "private_profiles.id"]).whereNotNull("user_id")
      } else {
        players = await part_repo.knexObj().select(["private_profiles.firstName", "private_profiles.lastName", "private_profiles.id", "teams.id as team_id", "teams.name as team_name"])
          .join(TABLE_NAMES.B_TOURNAMENT, "b_tournament.id", "b_participant.tournament_id")
          .join(TABLE_NAMES.TOURNAMENT_INIVTES, "tournament_invites.team_id", "b_participant.team_id")
          .join(TABLE_NAMES.TEAMS, "teams.id", "b_participant.team_id")
          .where({ "b_participant.tournament_id": bracketT.id, })
          .join(TABLE_NAMES.PRIVATE_PROFILE, "private_profiles.id", "tournament_invites.user_id")
          .where("tournament_invites.tournament_id", tournamentId as string)
          .whereNotNull("b_participant.team_id")
        const grp_team = _.groupBy(players, "team_name")
        players = _.keys(grp_team).map(k => {
          return {
            team_name: k,
            team_id: grp_team[k][0].team_id,
            ...grp_team[k]
          }
        })
      }

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
  } catch (ex) {
    return getErrorObject("Something went wrong") as any
  }
}

export const addTournamentInvites = async (data: ITournamentInvites | ITournamentInvites[], knexConnection: Knex) => {
  const invites = getTournamentInviteObj(knexConnection);
  return await invites.create(data)
}

export const updateTournamentInvites = async (data: ITournamentInvites, query: any, knexConnection: Knex) => {
  const invites = getTournamentInviteObj(knexConnection);
  const tournamtObj = getTournamentObj(knexConnection);
  const tournament: ITournament = await tournamtObj.findById(query.tournament_id);

  if (data.status === STATUS.ACCEPTED && tournament?.settings?.entryType == "credit") {
    let wallet_result = await debitBalance({
      userId: query.user_id,
      amount: Number(tournament.settings?.entryFeeAmount),
      type: "TOURNAMENT_REGISTRATION",
    }, knexConnection as Knex.Transaction, {
      tournament_id: tournament.id
    })
    if (wallet_result?.errors) {
      return wallet_result
    }
  }
  const result = await invites.update(data, query)
  return result
}

export const fetchTournamentInvites = async (req: any, knexConnection: Knex) => {
  const errors = await fetchInivtesValidator(req);
  if (errors) return { errors };

  const invites = getTournamentInviteObj(knexConnection);
  let data = await invites.find({ tournament_id: req.tournament_id, team_id: req.team_id })
  return { data }
}

export const handleInviteSubmit = async (tournament_id: string, team_id: string, knexConnection: Knex) => {
  const inviteObj = getTournamentInviteObj(knexConnection);
  const tournameObj = getTournamentObj(knexConnection);
  const tournament: ITournament = await tournameObj.findById(tournament_id);
  const acceptedInvites = await inviteObj.find({ team_id, tournament_id, status: STATUS.ACCEPTED })
  const numberOfPlayer: string = tournament?.settings?.tournamentFormat || "1v1"
  if (TOURNAMENT_TYPE_NUMBER[numberOfPlayer] == acceptedInvites.length) {
    return await registerTeamTournament({
      tournamentId: tournament_id,
      team_id,
    } as any, knexConnection)
  }
}