import { Knex } from "knex";
import { IRegisterTournament } from "../database/models/i-register-tournament";
import { ITournament } from "../database/models/i-tournaments";
import { TournamentsRepository } from "../database/repositories/tournaments-repository";
import BracketsCrud from "./brackets-crud";
import { BracketsManager } from "brackets-manager";
import { createKnexConnection } from "../database/knex";
import { TABLE_NAMES } from "../../../models/constants";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IBParticipants } from "../database/models/i-b-participant";
import { validateRegisterTeam } from "./i-brackets-validator";
import { IPrivateProfile } from "../database/models/i-private-profile";
import { addNotifications } from "../notifications-service";
import { getErrorObject } from "../common/helper/utils.service";
import { addTournamentInvites } from "../tournament-service/tournament-service";
import { ITournamentInvites } from "../database/models/i-tournament-invites";

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
      type:
        req?.bracketsMetadata?.type === "SINGLE"
          ? "single_elimination"
          : "double_elimination",
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

export const registerTournament = async (
  req: IRegisterTournament,
  knexConnection: Knex
): Promise<any> => {
  try {
    const errors = await validateRegisterTeam(req);
    if (errors) return { errors };

    if (!(await validateTournament(req.tournamentId, knexConnection))) {
      return { errors: ["Invalid Tournament id"] };
    }
    // todo - add validation to verify if tournament is single or team

    if (req.is_team_registration) {
      return await registerTeamTournament(req, knexConnection);
    } else {
      return await registerIndividualTournament(req, knexConnection)
    }
  } catch (ex: any) {
    return getErrorObject(ex.message)
  }

};

export const registerTeamTournament = async (
  req: IRegisterTournament,
  knexConnection: Knex
): Promise<any> => {
  if (!(await validateUser(req.user_list, knexConnection))) {
    return { errors: ["Invalid user ids"] };
  }
  if (await checkIfInvitationPending(req.user_list, req.tournamentId, req.team_id, knexConnection)) {
    return getErrorObject("Some users have invites pending")
  }
  let notifications: any = [];
  let invites: any = [];

  req.user_list.forEach(id => {
    notifications.push({
      type: "TOURNAMENT_INVITE",
      user_id: id,
      is_action_required: true,
      data: {
        tournament_id: req.tournamentId,
        request_by: req.userId,
        team_id: req.team_id
      }
    })
    invites.push({
      user_id: id,
      tournament_id: req.tournamentId,
      team_id: req.team_id
    })
  })
  await Promise.all([
    addNotifications(notifications, knexConnection),
    addTournamentInvites(invites, knexConnection)
  ])
  return { message: "Team Registration successfull" }
}

export const registerIndividualTournament = async (req: IRegisterTournament,
  knexConnection: Knex) => {

  if (!(await validateUser([req.userId], knexConnection))) {
    return { errors: ["Invalid user id"] };
  }

  try {
    const participant = new CrudRepository<IBParticipants>(knexConnection, TABLE_NAMES.B_PARTICIPANT);
    let existing_user = await participant.knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({ "b_tournament.tournament_uuid": req.tournamentId, "b_participant.user_id": req.userId });

    if (existing_user.length) return { errors: ["User already register"] };

    let data = await participant.knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({ "b_tournament.tournament_uuid": req.tournamentId }).whereNull("b_participant.user_id")
      .select("b_participant.id").first();
    if (!data) return { errors: ["Tournament is full"] };

    await participant.update({
      user_id: req.userId
    }, {
      id: data.id
    })

    return { message: "User register in successfull" };
  } catch (ex) {
    return { errors: ["Invalid tournament id"] };
  }
}
export const checkInTournament = async (
  req: IRegisterTournament,
  knexConnection: Knex
): Promise<any> => {
  if (!(await validateUser([req.userId], knexConnection))) {
    return { message: "Invalid user id" };
  }
  if (!(await validateTournament(req.tournamentId, knexConnection))) {
    return { message: "Invalid Tournament id" };
  }
  try {
    const participant = new CrudRepository<IBParticipants>(knexConnection, TABLE_NAMES.B_PARTICIPANT);
    let existing_user = await participant.knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({ "b_tournament.tournament_uuid": req.tournamentId, "b_participant.user_id": req.userId })
      .select("b_participant.id")
      .select("b_participant.is_checked_in").first();

    if (!existing_user) return { errors: ["User not register"] };

    if (existing_user.is_checked_in) return { errors: ["User already checked in"] };

    await participant.update({
      is_checked_in: true
    }, {
      id: existing_user.id
    })

    return { message: "User check in successfull" };
  } catch (ex) {
    return { message: "Something went wrong" };
  }
};

export const validateUser = async (
  ids: string[],
  knexConnection: Knex | Knex.Transaction
): Promise<boolean> => {
  try {
    const users = new CrudRepository<IPrivateProfile>(knexConnection, TABLE_NAMES.PRIVATE_PROFILE);
    let data = await users.knexObj().whereIn("id", ids)
    return data.length === ids.length;
  } catch (ex) {
    return false;
  }
};

export const checkIfInvitationPending = async (users: string[], tournament_id: string, team_id: string, knexConnection: Knex) => {
  const invites = new CrudRepository<ITournamentInvites>(knexConnection, TABLE_NAMES.TOURNAMENT_INIVTES);
  const data = await invites.knexObj().whereIn("user_id", users)
    .where({ "status": "PENDING", tournament_id, team_id })
  return !!data.length
}
export const validateTournament = async (
  id: string,
  knexConnection: Knex
): Promise<boolean> => {
  try {
    const repository = new TournamentsRepository(knexConnection);
    const data = await repository.getTournament(id);
    return data ? true : false;
  } catch (ex) {
    return false;
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
