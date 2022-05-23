import { Knex } from "knex";
import { IRegisterTournament } from "../database/models/i-register-tournament";
import { ITournament } from "../database/models/i-tournaments";
import { TournamentsRepository } from "../database/repositories/tournaments-repository";
import BracketsCrud from "./brackets-crud";
import { BracketsManager } from "brackets-manager";
import { createKnexConnection } from "../database/knex";
import { STATUS, TABLE_NAMES, TOURNAMENT_TYPE_NUMBER } from "../../../models/constants";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IBParticipants } from "../database/models/i-b-participant";
import { validateMatchResult, validateRegisterSingle, validateRegisterTeam } from "./i-brackets-validator";
import { IPrivateProfile } from "../database/models/i-private-profile";
import { addNotifications } from "../notifications-service";
import { fetchTournamentById, getEloRating, getErrorObject } from "../common/helper/utils.service";
import { addTournamentInvites } from "../tournament-service/tournament-service";
import { ITournamentInvites } from "../database/models/i-tournament-invites";
import { debitBalance } from "../wallet-service/wallet-service";
import _ from "lodash";
import { IError, ISuccess } from "../../utils/common/Interfaces";
import { IMatchResultRequest } from "./i-brackets-request";
import { IBMatch } from "../database/models/i-b-match";
import { ITeams } from "../database/models/i-teams";

export const persistBrackets = async (req: ITournament): Promise<any> => {
  const connection = createKnexConnection();
  try {
    let tournament: any = await connection("b_tournament")
      .join("b_stage", "b_stage.tournament_id", "b_tournament.id")
      .where({ tournament_uuid: req.id })
      .select("b_stage.id as stage_id")
      .select("b_tournament.id as id");

    const manager = new BracketsManager(
      new BracketsCrud(connection as any) as any
    );
    let playerCount = Number(req?.bracketsMetadata?.playersLimit);
    playerCount = nextPowerOf2(playerCount);
    if (tournament && tournament.length) {
      await deleteBracket(connection, tournament[0].id, tournament[0].stage_id);
    } else {
      tournament = await connection("b_tournament")
        .insert({
          tournament_uuid: req.id,
        })
        .returning("*");
    }
    const data = {
      name: req?.bracketsMetadata?.type,
      tournamentId: Number(tournament[0].id),
      type: req?.bracketsMetadata?.type === "SINGLE" ? "single_elimination" : "double_elimination",
      seeding: new Array(playerCount).fill(0)
        .map((x, i) => `${i}`),
      settings: { seedOrdering: ["natural"] },
    };
    if (req?.bracketsMetadata?.type === "SINGLE" && req?.bracketsMetadata.thirdPlace) {
      data.settings = { ...data.settings, consolationFinal: true } as any
    }
    await manager.create(data as any);
  } catch (ex) {
    console.error(ex);
  } finally {
    await connection.destroy();
  }
};

export const registerTournament = async (req: IRegisterTournament, knexConnection: Knex, user: any): Promise<any> => {
  try {
    const tournamet: ITournament | null = await validateTournament(req.tournamentId, knexConnection);
    if (!tournamet) return { errors: ["Invalid Tournament id"] };

    if (tournamet?.settings?.tournamentFormat === "1v1") {
      const errors = await validateRegisterSingle(req);
      if (errors) return { errors };
    } else {
      const errors = await validateRegisterTeam(req);
      if (errors) return { errors };
    }

    if (req.is_team_registration) {
      return await sendTeamTournamentInvites(req, tournamet, knexConnection);
    }

    return await registerIndividualTournament(req, knexConnection, user)

  } catch (ex: any) {
    return getErrorObject(ex.message)
  }

};

export const sendTeamTournamentInvites = async (
  req: IRegisterTournament,
  tournament: ITournament,
  knexConnection: Knex
): Promise<any> => {
  if (!(await validateUser(req.user_list, knexConnection))) {
    return getErrorObject("Invalid user ids");
  }
  const playercount = TOURNAMENT_TYPE_NUMBER[tournament?.settings?.tournamentFormat || "1v1"]
  if (req.user_list.length !== playercount) {
    return getErrorObject(`Team registration should have ${playercount} players only`)
  }
  const participant = new CrudRepository<IBParticipants>(knexConnection, TABLE_NAMES.B_PARTICIPANT);

  // identify if there is empty slot for registration
  const slots = await participant.knexObj()
    .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
    .where({ "b_tournament.tournament_uuid": req.tournamentId })
    .whereNull("b_participant.team_id")
    .select("b_participant.id")
    .first();

  if (!slots) getErrorObject("Tournament is full")

  const existing_user = await participant.knexObj()
    .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
    .where({ "b_tournament.tournament_uuid": req.tournamentId, "b_participant.team_id": req.team_id });

  if (existing_user.length) return getErrorObject("Team already register for tournament")

  const invites = new CrudRepository<ITournamentInvites>(knexConnection, TABLE_NAMES.TOURNAMENT_INIVTES);
  const data = await invites.knexObj()
    .where({ tournament_id: req.tournamentId, team_id: req.team_id })
    .whereIn("status", ["PENDING", "ACCEPTED"])
    .whereIn("user_id", req.user_list)

  if (data.length === playercount) {
    return getErrorObject(`Tournament registration for per team reached. Cannot add more players`)
  }

  // handle when peviously invite send and one of them got rejected.
  if (data.length) {
    data.forEach((x: ITournamentInvites): void => {
      if (x.status === STATUS.ACCEPTED) {
        req.user_list = _.remove(req.user_list, (id) => id !== x.user_id)
      }
    })
  }

  // handle when some users have invites pending.
  const existing_invite = data.find((x: ITournamentInvites): boolean => {
    return x.status === "PENDING" && req.user_list.includes(x.user_id)
  })
  if (existing_invite) {
    return getErrorObject("Some users have invites pending")
  }

  const notifications: any = [];
  const new_invites: any = [];

  req.user_list.forEach((id) => {
    notifications.push({
      type: "TOURNAMENT_INVITE", user_id: id, is_action_required: true,
      data: { tournament_id: req.tournamentId, request_by: req.userId, team_id: req.team_id }
    })
    new_invites.push({ user_id: id, tournament_id: req.tournamentId, team_id: req.team_id })
  })
  await Promise.all([
    addNotifications(notifications, knexConnection),
    addTournamentInvites(new_invites, knexConnection)
  ])
  return { message: "Team Registration successfull" }
}

export const registerIndividualTournament = async (req: IRegisterTournament, knexConnection: Knex, user: any): Promise<IError | ISuccess> => {
  try {
    const participant = new CrudRepository<IBParticipants>(knexConnection, TABLE_NAMES.B_PARTICIPANT);
    const existing_user = await participant.knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({ "b_tournament.tournament_uuid": req.tournamentId, "b_participant.user_id": user.id });

    if (existing_user.length) return { errors: ["User already register"] };

    const data = await participant.knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({ "b_tournament.tournament_uuid": req.tournamentId })
      .whereNull("b_participant.user_id")
      .select("b_participant.id")
      .first();
    if (!data) getErrorObject("Tournament is full")

    const tournament: ITournament | undefined = await fetchTournamentById(req.tournamentId, knexConnection);
    if (!tournament) return getErrorObject("Invalid tournament Id")

    // Deducting amount from user if entry type as credit
    if (tournament?.settings?.entryType === "credit") {
      const wallet_result = await debitBalance({
        userId: user.id, amount: Number(tournament?.settings?.entryFeeAmount), type: "TOURNAMENT REGISTRATION",
      }, knexConnection as Knex.Transaction, { tournament_id: tournament?.id })
      // handle wallet related errors
      if (wallet_result?.errors) {
        return wallet_result
      }
    }

    await participant.update({ user_id: user.id }, { id: data.id })

    return { message: "User register in successfull" };
  } catch (ex) {
    return { errors: ["Invalid tournament id"] };
  }
}

export const registerTeamTournament = async (req: IRegisterTournament, knexConnection: Knex): Promise<ISuccess | IError> => {
  try {
    const participant = new CrudRepository<IBParticipants>(knexConnection, TABLE_NAMES.B_PARTICIPANT);
    const existing_user = await participant.knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({ "b_tournament.tournament_uuid": req.tournamentId, "b_participant.team_id": req.team_id });

    if (existing_user.length) return { errors: ["Team already register"] };

    const data = await participant.knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({ "b_tournament.tournament_uuid": req.tournamentId })
      .whereNull("b_participant.team_id")
      .select("b_participant.id")
      .first();
    if (!data) getErrorObject("Tournament is full")

    await participant.update({ team_id: req.team_id }, { id: data.id })

    return { message: "Team register in successfull" };
  } catch (ex) {
    return { errors: ["Invalid tournament id"] };
  }
}
export const checkInTournament = async (req: IRegisterTournament, knexConnection: Knex, user: any): Promise<any> => {
  const tournamet = await validateTournament(req.tournamentId, knexConnection);
  if (!tournamet) return { errors: ["Invalid Tournament id"] };

  try {
    const participant = new CrudRepository<IBParticipants>(knexConnection, TABLE_NAMES.B_PARTICIPANT);
    const existing_user = await participant.knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({ "b_tournament.tournament_uuid": req.tournamentId, "b_participant.user_id": user.id })
      .select("b_participant.id")
      .select("b_participant.is_checked_in")
      .first();

    if (!existing_user) return { errors: ["User not register"] };

    if (existing_user.is_checked_in) return { errors: ["User already checked in"] };

    await participant.update({ is_checked_in: true }, { id: existing_user.id })

    return { message: "User check in successfull" };
  } catch (ex) {
    return { message: "Something went wrong" };
  }
};

export const submitMatchResult = async (req: IMatchResultRequest, knexConnection: Knex): Promise<any> => {
  try {
    const errors = await validateMatchResult(req);
    if (errors) return { errors };

    const repo = new CrudRepository<IBMatch>(knexConnection, TABLE_NAMES.B_MATCH);
    const match: IBMatch = await repo.findById(req.match_id);
    const manager = new BracketsManager(
      new BracketsCrud(knexConnection as any) as any
    );
    await manager.update.match({
      id: Number(match.id),
      opponent1: {
        id: Number(match.opponent1.id),
        score: req.opponent1.score,
        result: req.opponent1.result as any
      },
      opponent2: {
        id: Number(match.opponent2.id),
        score: req.opponent2.score,
        result: req.opponent2.result as any
      }
    });
    await Promise.all([
      updateELORating(match, req, knexConnection),
      repo.update({ screenshot: req.screenshot }, { id: Number(match.id) })
    ])
    return match
  } catch (ex) {
    return getErrorObject("Something went wrong")
  }
}

export const updateELORating = async (match: IBMatch, req: IMatchResultRequest, knexConnection: Knex): Promise<any> => {
  const partRepo = new CrudRepository<IBParticipants>(knexConnection, TABLE_NAMES.B_PARTICIPANT);
  const players: IBParticipants[] = await partRepo.knexObj().whereIn("id", [match.opponent1.id, match.opponent2.id]);
  const player1: IBParticipants = players.find((x) => x.id === match.opponent1.id) || players[0];
  const player2: IBParticipants = players.find((x) => x.id === match.opponent2.id) || players[1];
  if (players[0].user_id) {
    const userRepo = new CrudRepository<IPrivateProfile>(knexConnection, TABLE_NAMES.PRIVATE_PROFILE);
    const users: IPrivateProfile[] = await userRepo.knexObj().whereIn("id", [player1.user_id, player2.user_id])
    const user1: IPrivateProfile = users.find((x) => x.id === player1.user_id) || users[0]
    const user2: IPrivateProfile = users.find((x) => x.id === player2.user_id) || users[1]
    let elo_rating = { winnerRating: 0, loserRating: 0 };
    if (req.opponent1.result === "win") {
      elo_rating = getEloRating(Number(user1?.elo_rating), Number(user2?.elo_rating))
      user1.elo_rating = elo_rating.winnerRating;
      user2.elo_rating = elo_rating.loserRating;
    } else {
      elo_rating = getEloRating(Number(user2?.elo_rating), Number(user1?.elo_rating))
      user1.elo_rating = elo_rating.loserRating;
      user2.elo_rating = elo_rating.winnerRating;
    }
    return await Promise.all([
      userRepo.update({ elo_rating: user1.elo_rating }, { id: user1.id }),
      userRepo.update({ elo_rating: user2.elo_rating }, { id: user2.id })
    ])
  }
  const teamRepo = new CrudRepository<ITeams>(knexConnection, TABLE_NAMES.TEAMS);
  const teams: ITeams[] = await teamRepo.knexObj().whereIn("id", [player1.team_id, player2.team_id]);
  const team1: ITeams = teams.find((x) => x.id === player1.team_id) || teams[0];
  const team2: ITeams = teams.find((x) => x.id === player2.team_id) || teams[1];
  let elo_rating = { winnerRating: 0, loserRating: 0 };
  if (req.opponent1.result === "win") {
    elo_rating = getEloRating(Number(team1?.elo_rating), Number(team2?.elo_rating))
    team1.elo_rating = elo_rating.winnerRating;
    team2.elo_rating = elo_rating.loserRating;
  } else {
    elo_rating = getEloRating(Number(team2?.elo_rating), Number(team1?.elo_rating))
    team1.elo_rating = elo_rating.loserRating;
    team2.elo_rating = elo_rating.winnerRating;
  }
  return await Promise.all([
    teamRepo.update({ elo_rating: team1.elo_rating }, { id: team1.id }),
    teamRepo.update({ elo_rating: team2.elo_rating }, { id: team2.id })
  ])


}

export const validateUser = async (
  ids: string[],
  knexConnection: Knex | Knex.Transaction
): Promise<boolean> => {
  try {
    const users = new CrudRepository<IPrivateProfile>(knexConnection, TABLE_NAMES.PRIVATE_PROFILE);
    const data = await users.knexObj().whereIn("id", ids)
    return data.length === ids.length;
  } catch (ex) {
    return false;
  }
};

export const validateTournament = async (
  id: string,
  knexConnection: Knex
): Promise<ITournament | null> => {
  try {
    const repository = new TournamentsRepository(knexConnection);
    return await repository.getTournament(id);
  } catch (ex) {
    return null;
  }
};


const deleteBracket = (
  connection: Knex,
  tournament_id: any,
  stage_id: any
): Promise<any> => {
  const all = [
    connection("b_stage").delete()
      .where({ tournament_id }),
    connection("b_participant").delete()
      .where({ tournament_id }),
    connection("b_round").delete()
      .where({ stage_id }),
    connection("b_match").delete()
      .where({ stage_id }),
    connection("b_group").delete()
      .where({ stage_id }),
  ];
  return Promise.all(all);
};

function nextPowerOf2(n: number): number {
  let count = 0;
  if (n && !(n & (n - 1))) return n;
  while (n !== 0) {
    n >>= 1;
    count += 1;
  }
  return 1 << count;
}
