import { Knex } from "knex";
import { createKnexConnection } from "../database/knex";
import { IBracket } from "../database/models/i-brackets";
import { IRegisterTournament } from "../database/models/i-register-tournament";
import { ITournamentUsers } from "../database/models/i-tournament-users";
import { ITournament } from "../database/models/i-tournaments";
import { BracketsRepository } from "../database/repositories/brackets-repository";
import { ProfilesRepository } from "../database/repositories/profiles-repository";
import { TournamentUsersRepository } from "../database/repositories/tournament-users-repository";
import { TournamentsRepository } from "../database/repositories/tournaments-repository";
import BracketsCrud from "./brackets-crud";
import { BracketsManager } from "brackets-manager";
import { BTournament } from "../database/repositories/bracket-tournament";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Duel = require("tournament/duel");

export const persistBrackets = async (
  req: ITournament,
  context: Knex
): Promise<any> => {
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
      //       const stage = await connection("b_stage")
      //         .where({
      //           id: tournament[0].stage_id,
      //         })
      //         .first();
      //       await connection("b_stage").update({
      //         ...stage,
      //         settings: {
      //           ...stage.settings,
      //           size: playerCount,
      //         },
      //       });
      //       await manager.update.seeding(
      //         Number(tournament[0].stage_id),
      //         new Array(playerCount).fill(0)
      // .map((x, i) => `${i}`)
      //       );
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
      seeding: new Array(playerCount).fill(0).map((x, i) => `${i}`),
      settings: { seedOrdering: ["natural"] },
    };

    await manager.create(data as any);
  } catch (ex) {
    console.log(ex);
  } finally {
    await connection.destroy();
  }
};

export const registerTournament = async (
  req: IRegisterTournament,
  knexConnection: Knex
): Promise<any> => {
  if (!(await validateUser(req.userId, knexConnection))) {
    return { message: "Invalid user id" };
  }
  if (!(await validateTournament(req.tournamentId, knexConnection))) {
    return { message: "Invalid Tournament id" };
  }
  if (await checkUserRegister(req, knexConnection)) {
    return { message: "User Already register" };
  }
  try {
    const repository = new TournamentUsersRepository(knexConnection);
    await repository.create({
      tournamentId: req.tournamentId,
      userId: req.userId,
    });
    return { message: "User register in successfull" };
  } catch (ex) {
    return { message: "Invalid tournament id" };
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
    const repository = new BracketsRepository(knexConnection);
    const data: IBracket = await repository.findByTournamentId(
      req.tournamentId
    );
    if (!(await checkUserRegister(req, knexConnection))) {
      return { message: "User not registered for the tournament" };
    }
    if (Array.isArray(data.brackets.matches)) {
      for (let i = 0; i < data.brackets.matches?.length; i++) {
        if (
          data.brackets.matches[i].p[0] === req.userId ||
          data.brackets.matches[i].p[1] === req.userId
        ) {
          return { message: "User already checked in" };
        }
        if (data.brackets.matches[i].p[0] === 0) {
          data.brackets.matches[i].p[0] = req.userId;
          break;
        }
        if (data.brackets?.matches[i].p[1] === 0) {
          data.brackets.matches[i].p[1] = req.userId;
          break;
        }
      }
    }
    const tournamentUsersRepo = new TournamentUsersRepository(knexConnection);
    Promise.all([
      tournamentUsersRepo.update({ checkedIn: true } as ITournamentUsers, {
        ...req,
      }),
      repository.update(data),
    ]);

    return { message: "User check in successfull" };
  } catch (ex) {
    return { message: "Invalid tournament id" };
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
    await repository.getTournament(id);
    return true;
  } catch (ex) {
    return false;
  }
};

export const checkUserRegister = async (
  req: IRegisterTournament,
  transaction: Knex
): Promise<boolean> => {
  try {
    const tournamentUserRespo = new TournamentUsersRepository(transaction);
    const data = await tournamentUserRespo.findAll({
      userId: req.userId,
      tournamentId: req.tournamentId,
    });
    return Boolean(data.length);
  } catch (ex) {
    return false;
  }
};

const deleteBracket = (connection: Knex, tournament_id: any, stage_id: any) => {
  let all = [
    connection("b_stage").delete().where({ tournament_id }),
    connection("b_participant").delete().where({ tournament_id }),
    connection("b_round").delete().where({ stage_id }),
    connection("b_match").delete().where({ stage_id }),
    connection("b_group").delete().where({ stage_id }),
  ];
  return Promise.all(all);
};

function nextPowerOf2(n: number): number {
  let count = 0;
  if (n && !(n & (n - 1))) return n;
  while (n != 0) {
    n >>= 1;
    count += 1;
  }
  return 1 << count;
}
