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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Duel = require("tournament/duel");

export const persistBrackets = async (
  req: ITournament,
  context: Knex
): Promise<any> => {
  const roundsSize: number[] = [];
  let bracket: any;
  const brackets = new Duel(
    Number(req?.bracketsMetadata?.playersLimit),
    req?.bracketsMetadata?.type === "SINGLE" ? 1 : 2
  );
  brackets.matches = brackets.matches.map((element: any) => {
    if (!roundsSize.includes(element.id.r)) {
      roundsSize.push(element.id.r);
    }
    return { ...element, p: [0, 0] };
  });
  const repository = new BracketsRepository(context as Knex);
  const existingBracket = await repository.findByTournamentId(req?.id || "");
  const data = {
    tournament_id: req.id,
    brackets,
    rounds: roundsSize.length,
  };
  if (!existingBracket) {
    bracket = await repository.create(data);
  } else {
    bracket = await repository.update({ ...existingBracket, ...data });
  }

  return { id: bracket.id };
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

export const createBrackets = async (
  req: IRegisterTournament,
  context: Knex
): Promise<any> => {
  // const knexC = createKnexConnection();
  // let data = knexC.select("*").from("b_participant").first();
  // console.log(111, data);
  // await knexC("b_participant").insert({ tournament_id: 1, name: "test" });

  try {
    const example = {
      name: "Example",
      tournamentId: 1,
      type: "double_elimination",
      seeding: [
        "Team 1",
        "Team 2",
        "Team 3",
        "Team 4",
        "Team 5",
        "Team 6",
        "Team 7",
        "Team 8",
      ],
      settings: { seedOrdering: ["natural"] },
    };
    let connection = createKnexConnection();
    const manager = new BracketsManager(
      new BracketsCrud(connection as any) as any
    );
    await manager.create(example as any);
    await connection.destroy();
  } catch (ex) {
    console.log(ex);
  }
};
