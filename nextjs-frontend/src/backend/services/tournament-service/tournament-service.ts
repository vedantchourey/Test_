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
import {
  fetchInivtesValidator,
  validatePersistTournament,
} from "./persist-tournament-validator";
import {
  persistBrackets,
  registerTeamTournament,
} from "../brackets-service/brackets-service";
import { ServiceResponse } from "../common/contracts/service-response";
import { ListTournamentType } from "./list-tournaments-request";
import { ITournament } from "../database/models/i-tournaments";
import BracketsCrud from "../brackets-service/brackets-crud";
import { BTournament } from "../database/repositories/bracket-tournament";
import { BracketsManager } from "brackets-manager";
import {
  STATUS,
  TABLE_NAMES,
  TOURNAMENT_TYPE_NUMBER,
  USER_FEILDS,
} from "../../../models/constants";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IBParticipants } from "../database/models/i-b-participant";
import { ITournamentInvites } from "../database/models/i-tournament-invites";
import _ from "lodash";
import { getErrorObject } from "../common/helper/utils.service";
import { debitBalance } from "../wallet-service/wallet-service";
import { IError } from "../../utils/common/Interfaces";
import { IBMatch } from "../database/models/i-b-match";
import { IPrivateProfile } from "../database/models/i-private-profile";
import { ITeams } from "../database/models/i-teams";
import { IEloRating } from "../database/models/i-elo-rating";
import { IProfile } from "../database/models/i-profile";

const getTournamentInviteObj = (
  knexConnection: Knex
): CrudRepository<ITournamentInvites> => {
  return new CrudRepository<ITournamentInvites>(
    knexConnection,
    TABLE_NAMES.TOURNAMENT_INIVTES
  );
};

const getTournamentObj = (
  knexConnection: Knex
): CrudRepository<ITournament> => {
  return new CrudRepository<ITournament>(
    knexConnection,
    TABLE_NAMES.TOURNAMENTS
  );
};

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

export const deleteTournament = async (
  tid: string,
  context: any
): Promise<any> => {
  const repository = new CrudRepository<ITournament>(
    context,
    TABLE_NAMES.TOURNAMENTS
  );

  const result = await repository.update({ isDeleted: true }, { id: tid });

  return { data: result };
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

const tournamentsWithPlayers = async (
  context: PerRequestContext,
  tournamentId: string,
  tournament: ITournament
): Promise<any> => {
  try {
    const bracketTournamentRepo = new BTournament(
      context.transaction as Knex.Transaction
    );
    const bracketT = await bracketTournamentRepo.select({
      tournament_uuid: tournamentId,
    });

    let players: any = [];
    let pricePool = 0;
    let currentPricePool = 0;
    if (bracketT) {
      const part_repo = new CrudRepository<IBParticipants>(
        context.knexConnection as any,
        TABLE_NAMES.B_PARTICIPANT
      );
      if (tournament?.settings?.tournamentFormat === "1v1") {
        players = await part_repo
          .knexObj()
          .join(
            TABLE_NAMES.PRIVATE_PROFILE,
            "private_profiles.id",
            "b_participant.user_id"
          )
          .leftJoin(TABLE_NAMES.ELO_RATING, {
            "elo_ratings.user_id": "private_profiles.id",
          })
          .where({ tournament_id: bracketT.id })
          .where({
            "elo_ratings.game_id": tournament.game,
          })
          .select([
            "private_profiles.firstName",
            "private_profiles.lastName",
            "private_profiles.id",
            "elo_ratings.elo_rating",
          ])
          .whereNotNull("b_participant.user_id");

        pricePool =
          Number(tournament?.bracketsMetadata?.playersLimit) *
          Number(tournament?.settings?.entryFeeAmount);
        currentPricePool = players.length
          ? players.length * Number(tournament?.settings?.entryFeeAmount)
          : 0;
      } else {
        players = await part_repo
          .knexObj()
          .select([
            "private_profiles.firstName",
            "private_profiles.lastName",
            "private_profiles.id",
            "elo_ratings.elo_rating",
            "teams.elo_rating as team_elo_rating",
            "teams.id as team_id",
            "teams.teamLogo as teamLogo",
            "teams.name as team_name",
          ])
          .join(
            TABLE_NAMES.B_TOURNAMENT,
            "b_tournament.id",
            "b_participant.tournament_id"
          )
          .join(
            TABLE_NAMES.TOURNAMENT_INIVTES,
            "tournament_invites.team_id",
            "b_participant.team_id"
          )
          .join(TABLE_NAMES.TEAMS, "teams.id", "b_participant.team_id")
          .where({ "b_participant.tournament_id": bracketT.id })
          .join(
            TABLE_NAMES.PRIVATE_PROFILE,
            "private_profiles.id",
            "tournament_invites.user_id"
          )
          .leftJoin(TABLE_NAMES.ELO_RATING, {
            "elo_ratings.user_id": "private_profiles.id",
            "elo_ratings.game_id": "teams.game_id",
          })
          .where("tournament_invites.tournament_id", tournamentId as string)
          .whereNotNull("b_participant.team_id");

        const grp_team = _.groupBy(players, "team_name");
        currentPricePool = players.length
          ? players.length * Number(tournament?.settings?.entryFeeAmount)
          : 0;
        players = _.keys(grp_team).map((k) => {
          return {
            team_name: k,
            team_id: grp_team[k][0].team_id,
            avatarUrl: grp_team[k][0].teamLogo,
            ...grp_team[k],
          };
        });
        const playerCount =
          TOURNAMENT_TYPE_NUMBER[
            tournament?.settings?.tournamentFormat || "1v1"
          ];
        pricePool =
          Number(tournament?.bracketsMetadata?.playersLimit) *
          playerCount *
          Number(tournament?.settings?.entryFeeAmount);
      }

      const connect = context.knexConnection;
      const manager = new BracketsManager(
        new BracketsCrud(connect as any) as any
      );
      const brackets = await manager.get.tournamentData(bracketT.id);
      tournament = { ...tournament, brackets };
      return {
        ...tournament,
        playerList: Object.values(_.groupBy(players, "id")).map((i) => i[0]),
        pricingDetails: { pricePool, currentPricePool },
      };
    }
  } catch (er) {
    console.error("er -> ", er);
  }
};

export async function listTournaments(
  params: ListTournamentType,
  context: PerRequestContext
): Promise<ServiceResponse<null, IListTournamentResponse>> {
  const repository = new TournamentsRepository(
    context.transaction as Knex.Transaction
  );
  const tournaments = await repository.getTournaments({...params, isDeleted: false});
  const result = await Promise.all(
    tournaments.tournaments.map((t) =>
      tournamentsWithPlayers(context, t.id as string, t))
  );

  return {
    data: {
      tournaments: result.filter((i) => i !== null),
      total: tournaments.total,
    },
  } as any;
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
  context: PerRequestContext,
  _tournamentId?: string
): Promise<ServiceResponse<null, ITournament>> {
  try {
    const tournamentId = _tournamentId || context.getParamValue("tournamentId");
    const repository = new TournamentsRepository(
      context.transaction as Knex.Transaction
    );

    let tournament = await repository.getTournament(tournamentId as string);

    const bracketTournamentRepo = new BTournament(
      context.transaction as Knex.Transaction
    );
    const bracketT = await bracketTournamentRepo.select({
      tournament_uuid: tournamentId,
    });

    let players: any = [];
    let pricePool = 0;
    let currentPricePool = 0;
    if (bracketT) {
      const part_repo = new CrudRepository<IBParticipants>(
        context.knexConnection as any,
        TABLE_NAMES.B_PARTICIPANT
      );
      if (tournament?.settings?.tournamentFormat === "1v1") {
        players = await part_repo
          .knexObj()
          .join(
            TABLE_NAMES.PRIVATE_PROFILE,
            "private_profiles.id",
            "b_participant.user_id"
          )
          .join("profiles", "profiles.id", "b_participant.user_id")
          .leftJoin(TABLE_NAMES.ELO_RATING, {
            "elo_ratings.user_id": "private_profiles.id",
          })
          .where({ tournament_id: bracketT.id })
          .where({
            "elo_ratings.game_id": tournament.game,
          })
          .select([
            "private_profiles.firstName",
            "private_profiles.lastName",
            "private_profiles.id",
            "profiles.avatarUrl",
            "profiles.username",
            "elo_ratings.elo_rating",
          ])
          .whereNotNull("b_participant.user_id");

        pricePool =
          Number(tournament?.bracketsMetadata?.playersLimit) *
          Number(tournament?.settings?.entryFeeAmount);
        currentPricePool = players.length
          ? players.length * Number(tournament?.settings?.entryFeeAmount)
          : 0;
      } else {
        players = await part_repo
          .knexObj()
          .select([
            "private_profiles.firstName",
            "private_profiles.lastName",
            "private_profiles.id",
            "elo_ratings.elo_rating",
            "teams.elo_rating as team_elo_rating",
            "teams.id as team_id",
            "teams.name as team_name",
            "teams.teamLogo as teamLogo",
          ])
          .join(
            TABLE_NAMES.B_TOURNAMENT,
            "b_tournament.id",
            "b_participant.tournament_id"
          )
          .join(
            TABLE_NAMES.TOURNAMENT_INIVTES,
            "tournament_invites.team_id",
            "b_participant.team_id"
          )
          .join(TABLE_NAMES.TEAMS, "teams.id", "b_participant.team_id")
          .where({ "b_participant.tournament_id": bracketT.id })
          .join(
            TABLE_NAMES.PRIVATE_PROFILE,
            "private_profiles.id",
            "tournament_invites.user_id"
          )
          .leftJoin(TABLE_NAMES.ELO_RATING, {
            "elo_ratings.user_id": "private_profiles.id",
            "elo_ratings.game_id": "teams.game_id",
          })
          .where("tournament_invites.tournament_id", tournamentId as string)
          .whereNotNull("b_participant.team_id");

        const grp_team = _.groupBy(players, "team_name");
        currentPricePool = players.length
          ? players.length * Number(tournament?.settings?.entryFeeAmount)
          : 0;
        players = _.keys(grp_team).map((k) => {
          return {
            team_name: k,
            avatarUrl: grp_team[k][0].teamLogo,
            team_id: grp_team[k][0].team_id,
            ...grp_team[k],
          };
        });
        const playerCount =
          TOURNAMENT_TYPE_NUMBER[
            tournament?.settings?.tournamentFormat || "1v1"
          ];
        pricePool =
          Number(tournament?.bracketsMetadata?.playersLimit) *
          playerCount *
          Number(tournament?.settings?.entryFeeAmount);
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
        playerList:
          tournament?.settings?.tournamentFormat === "1v1"
            ? Object.values(_.groupBy(players, "id")).map((i) => i[0])
            : players,
        pricingDetails: { pricePool, currentPricePool },
      },
    } as any;
  } catch (ex) {
    return getErrorObject("Something went wrong" + ex) as any;
  }
}

export const addTournamentInvites = async (
  data: ITournamentInvites | ITournamentInvites[],
  knexConnection: Knex
): Promise<any> => {
  const invites = getTournamentInviteObj(knexConnection);
  return await invites.create(data);
};

export const updateTournamentInvites = async (
  data: ITournamentInvites,
  query: any,
  knexConnection: Knex
): Promise<any> => {
  const invites = getTournamentInviteObj(knexConnection);
  const tournamtObj = getTournamentObj(knexConnection);
  const tournament: ITournament = await tournamtObj.findById(
    query.tournament_id
  );

  if (
    data.status === STATUS.ACCEPTED &&
    tournament?.settings?.entryType === "credit"
  ) {
    const wallet_result = await debitBalance(
      {
        userId: query.user_id,
        amount: Number(tournament.settings?.entryFeeAmount),
        type: "TOURNAMENT_REGISTRATION",
      },
      knexConnection as Knex.Transaction,
      {
        tournament_id: tournament.id,
      }
    );
    if (wallet_result?.errors) {
      return wallet_result;
    }
  }
  const result = await invites.update(data, query);
  await handleInviteSubmit(query.tournament_id, query.team_id, knexConnection);
  return result;
};

export const fetchTournamentInvites = async (
  req: any,
  knexConnection: Knex
): Promise<any> => {
  const errors = await fetchInivtesValidator(req);
  if (errors) return { errors };

  const invites = getTournamentInviteObj(knexConnection);
  const data = await invites.find({
    tournament_id: req.tournament_id,
    team_id: req.team_id,
  });
  return { data };
};

export const handleInviteSubmit = async (
  tournament_id: string,
  team_id: string,
  knexConnection: Knex
): Promise<any> => {
  const inviteObj = getTournamentInviteObj(knexConnection);
  const tournameObj = getTournamentObj(knexConnection);
  const tournament: ITournament = await tournameObj.findById(tournament_id);
  const acceptedInvites = await inviteObj.find({
    team_id,
    tournament_id,
    status: STATUS.ACCEPTED,
  });
  const numberOfPlayer: string =
    tournament?.settings?.tournamentFormat || "1v1";
  if (TOURNAMENT_TYPE_NUMBER[numberOfPlayer] === acceptedInvites.length) {
    return await registerTeamTournament(
      {
        tournamentId: tournament_id,
        team_id,
      } as any,
      knexConnection
    );
  }
};

export const fetchMatchDetails = async (
  context: PerRequestContext
): Promise<any | IError> => {
  try {
    const { tournament, match } = context;
    const participantRepo = new CrudRepository<IBParticipants>(
      context.knexConnection as Knex,
      TABLE_NAMES.B_PARTICIPANT
    );

    const opponent1 = participantRepo
      .knexObj()
      .select(USER_FEILDS)
      .where({ "b_participant.id": match?.opponent1.id });

    const opponent2 = participantRepo
      .knexObj()
      .select(USER_FEILDS)
      .where({ "b_participant.id": match?.opponent2.id });

    if (tournament?.settings?.tournamentFormat === "1v1") {
      opponent1
        .join(
          "private_profiles",
          "private_profiles.id",
          "b_participant.user_id"
        )
        .leftJoin(TABLE_NAMES.ELO_RATING, {
          "elo_ratings.user_id": "private_profiles.id",
        })
        .where({
          "elo_ratings.game_id": tournament.game,
        });
      opponent2
        .join(
          "private_profiles",
          "private_profiles.id",
          "b_participant.user_id"
        )
        .leftJoin(TABLE_NAMES.ELO_RATING, {
          "elo_ratings.user_id": "private_profiles.id",
        })
        .where({
          "elo_ratings.game_id": tournament.game,
        });
      const o1 = await opponent1;
      const o2 = await opponent2;
      return {
        opponent1: o1,
        opponent2: o2,
      };
    }
    opponent1
      .join("b_tournament", "b_tournament.id", "b_participant.tournament_id")
      .join(
        "tournament_invites",
        "tournament_invites.tournament_id",
        "b_tournament.tournament_uuid"
      )
      .join("teams", "teams.id", "tournament_invites.team_id")
      .join(
        "private_profiles",
        "private_profiles.id",
        "tournament_invites.user_id"
      )
      .leftJoin(TABLE_NAMES.ELO_RATING, {
        "elo_ratings.user_id": "private_profiles.id",
        "elo_ratings.game_id": "teams.game_id",
      })
      .where({ "tournament_invites.is_checked_in": true })
      .select([
        "teams.id as team_id",
        "teams.name as team_name",
        "teams.elo_rating as team_elo_rating",
      ]);
    opponent2
      .join("b_tournament", "b_tournament.id", "b_participant.tournament_id")
      .join(
        "tournament_invites",
        "tournament_invites.tournament_id",
        "b_tournament.tournament_uuid"
      )
      .join("teams", "teams.id", "tournament_invites.team_id")
      .leftJoin(TABLE_NAMES.ELO_RATING, {
        "elo_ratings.user_id": "private_profiles.id",
        "elo_ratings.game_id": "teams.game_id",
      })
      .join(
        "private_profiles",
        "private_profiles.id",
        "tournament_invites.user_id"
      )
      .where({ "tournament_invites.is_checked_in": true })
      .select([
        "teams.id as team_id",
        "teams.name as team_name",
        "teams.elo_rating as team_elo_rating",
      ]);
    return {
      opponent1: {
        ...match?.opponent1,
        ...formatTeamsData(await opponent1)[0],
      },
      opponent2: {
        ...match?.opponent2,
        ...formatTeamsData(await opponent2)[0],
      },
    };
  } catch (e: any) {
    return getErrorObject();
  }
};

const getUserWithElo = async (
  userId: string,
  details: any,
  context: PerRequestContext
): Promise<any> => {
  const eloRepo = new CrudRepository<IEloRating>(
    context.knexConnection as Knex,
    TABLE_NAMES.ELO_RATING
  );
  const player_elo_rating =
    (await eloRepo.findBy("user_id", userId))[0]?.elo_rating || 0;
  return {
    ...details,
    player_elo_rating,
  };
};

export const fetchUserMatchs = async (
  context: PerRequestContext
): Promise<any | IError> => {
  try {
    const { user } = context;

    //fetching team tournaments entries
    const inviteRepo = new CrudRepository<ITournamentInvites>(
      context.knexConnection as Knex,
      TABLE_NAMES.TOURNAMENT_INIVTES
    );

    const team_tournaments = await inviteRepo.find(
      { user_id: user?.id, status: STATUS.ACCEPTED },
      ["team_id"]
    );
    const team_ids = team_tournaments.map((x: any) => x.team_id);

    //fetching all the participant id for single and team
    const participantRepo = new CrudRepository<IBParticipants>(
      context.knexConnection as Knex,
      TABLE_NAMES.B_PARTICIPANT
    );

    const tournaments = await participantRepo
      .knexObj()
      // .join("b_tournament", "b_tournament.id", "b_participant.tournament_id")
      .where("user_id", user?.id)
      .orWhereIn("team_id", team_ids)
      .select(["id", "tournament_id", "user_id", "team_id", "is_checked_in"]);

    if (!tournaments?.length) {
      return [];
    }

    //fetching matches
    const matchRepo = new CrudRepository<IBMatch>(
      context.knexConnection as Knex,
      TABLE_NAMES.B_MATCH
    );

    const matches = await matchRepo
      .knexObj()
      .join("b_stage", "b_stage.id", "b_match.stage_id")
      .join("b_tournament", "b_tournament.id", "b_stage.tournament_id")
      .join(
        TABLE_NAMES.TOURNAMENTS,
        "tournamentsData.id",
        "b_tournament.tournament_uuid"
      )
      .whereRaw(
        `(opponent1->>'id') in (${tournaments.map((x: any) => `'${x.id}'`)}) 
        or (opponent2->>'id') in (${tournaments.map((x: any) => `'${x.id}'`)}) `
      )
      .select([
        "b_match.id as match_id",
        "b_tournament.id as b_t_id",
        "tournamentsData.id as tournament_id",
        "tournamentsData.name as tournament_name",
        "b_match.opponent1",
        "b_match.opponent2",
        "b_stage.type",
      ]);

    const part_id: any[] = [];
    matches.forEach((x: any) => {
      part_id.push(x.opponent1.id);
      part_id.push(x.opponent2.id);
    });

    //fetch all participants of the match
    const part_list = await participantRepo
      .knexObj()
      .whereIn("id", part_id)
      .whereNotNull("user_id")
      .orWhereNotNull("team_id");

    const groupPartList = _.groupBy(part_list, "id");
    const opponents: any[] = [];
    const opp_teams: any[] = [];

    part_list.forEach((part: any) => {
      if (part.user_id) opponents.push(part.user_id);
      if (part.team_id) opp_teams.push(part.team_id);
    });

    const userRepo = new CrudRepository<IPrivateProfile>(
      context.knexConnection as Knex,
      TABLE_NAMES.PRIVATE_PROFILE
    );

    const teamRepo = new CrudRepository<ITeams>(
      context.knexConnection as Knex,
      TABLE_NAMES.TEAMS
    );

    const [opp_users_list] = await Promise.all([
      // fetching opponents details for single tournament
      await userRepo
        .knexObj()
        .whereIn("id", [...opponents, user?.id])
        .select(USER_FEILDS)
        .select("id as user_id"),
    ]);

    const opp_users = await Promise.all(
      opp_users_list.map((i: any) => getUserWithElo(i.user_id, i, context))
    );

    const [teams] = await Promise.all([
      await teamRepo
        .knexObj()
        .whereIn("id", opp_teams)
        .select(["id as team_id", "name", "platform_id", "game_id"]),
    ]);

    const teams_grouped = _.groupBy(teams, "team_id");
    const opp_user_grouped = _.groupBy(opp_users, "user_id");

    // concatinating matchs and opponents/user details

    const result = Promise.all(
      matches.map(async (match: any) => {
        let { opponent1, opponent2 } = match;
        
        const { b_t_id } = match;
        const is_checked_in =
          tournaments.find((t: any) => t.tournament_id === b_t_id)
            .is_checked_in || false;
        if (
          opponent1.id &&
          groupPartList[opponent1.id] &&
          groupPartList[opponent1.id].length
        ) {
          const participant = groupPartList?.[opponent1.id]?.[0];
          const profileRepo = new CrudRepository<IProfile>(
            context.knexConnection as Knex,
            "profiles"
          );
          if (participant.user_id) {
            const data = await profileRepo.findById(participant.user_id);
            opponent1 = {
              ...opponent1,
              ...data,
              ...opp_user_grouped[participant.user_id][0],
            };
          }
          if (participant.team_id) {
            const players = await inviteRepo.find({
              team_id: participant.team_id,
              tournament_id: match.tournament_id
            });
            const playersWithData = await Promise.all(
              players.map(async (u: any) => {
                const user = await profileRepo.findById(u.user_id);
                return { ...user, status: u.status };
              })
            );
            opponent1 = {
              ...opponent1,
              ...teams_grouped?.[participant.team_id]?.[0],
              players: playersWithData,
            };
          }
        }
        if (
          opponent2.id &&
          groupPartList[opponent2.id] &&
          groupPartList[opponent2.id].length
        ) {
          const participant = groupPartList[opponent2.id][0];
          const profileRepo = new CrudRepository<IProfile>(
            context.knexConnection as Knex,
            "profiles"
          );
          if (participant.user_id) {
            const data = await profileRepo.findById(participant.user_id);
            opponent2 = {
              ...opponent2,
              ...data,
              ...opp_user_grouped[participant.user_id][0],
            };
          }
          if (participant.team_id) {
            const players = await inviteRepo.find({
              team_id: participant.team_id,
              tournament_id: match.tournament_id
            });
            const playersWithData = await Promise.all(
              players.map(async (u: any) => {
                const user = await profileRepo.findById(u.user_id);
                
                return { ...user, status: u.status };
              })
            );
            opponent2 = {
              ...opponent2,
              ...teams_grouped?.[participant.team_id]?.[0],
              players: playersWithData,
            };
          }
        }

        const tournament = await tournamentDetails(
          context,
          match.tournament_id
        );
        return {
          ...match,
          is_checked_in,
          tournament: tournament.data,
          opponent1,
          opponent2,
        };
      })
    );

    return result;
  } catch (ex: any) {
    return getErrorObject(ex);
  }
};

export const fetchUserMatchsHistorySingle = async (
  context: PerRequestContext,
  params: any
): Promise<any | IError> => {
  try {
    const { user } = context;
    const userId = params.userId || user?.id;
    const participantRepo = new CrudRepository<IBParticipants>(
      context.knexConnection as Knex,
      TABLE_NAMES.B_PARTICIPANT
    );

    const tournaments = await participantRepo
      .knexObj()
      .join(
        TABLE_NAMES.B_TOURNAMENT,
        "b_tournament.id",
        "b_participant.tournament_id"
      )
      .join(
        TABLE_NAMES.TOURNAMENTS,
        "tournamentsData.id",
        "b_tournament.tournament_uuid"
      )
      .where("user_id", userId)
      .select("*");

    return tournaments;
  } catch (ex: any) {
    return getErrorObject(ex);
  }
};

const formatTeamsData = (data: any): any => {
  const grouped = _.groupBy(data, "team_id") as any;
  const result = Object.keys(grouped).map((key) => {
    return {
      team_id: key,
      team_name: grouped[key][0].team_name,
      elo_rating: grouped[key][0].team_elo_rating,
      players: grouped[key].map((x: any) => ({
        user_id: x.user_id,
        firstName: x.firstName,
        lastName: x.lastName,
        elo_rating: x.player_elo_rating,
      })),
    };
  });
  return result;
};
