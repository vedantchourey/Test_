import { Knex } from "knex";
import { IRegisterTournament } from "../database/models/i-register-tournament";
import { ITournament } from "../database/models/i-tournaments";
import { ProfilesRepository } from "../database/repositories/profiles-repository";
import { TournamentsRepository } from "../database/repositories/tournaments-repository";
import BracketsCrud from "./brackets-crud";
import { BracketsManager } from "brackets-manager";
import { createKnexConnection } from "../database/knex";
import { TABLE_NAMES } from "../../../models/constants";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IBParticipants } from "../database/models/i-b-participant";

export const persistBrackets = async (req: ITournament, knexConnection: Knex): Promise<any> => {
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
  if (!(await validateUser(req.userId, knexConnection))) {
    return { errors: ["Invalid user id"] };
  }
  if (!(await validateTournament(req.tournamentId, knexConnection))) {
    return { errors: ["Invalid Tournament id"] };
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
};

export const checkInTournament = async (
  req: IRegisterTournament,
  knexConnection: Knex
): Promise<any> => {
  if (!(await validateUser(req.userId, knexConnection))) {
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
  id: string,
  knexConnection: Knex | Knex.Transaction
): Promise<boolean> => {
  try {
    const repository = new ProfilesRepository(knexConnection);
    await repository.getProfileById(id);
    return true;
  } catch (ex) {
    return false;
  }
};

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
