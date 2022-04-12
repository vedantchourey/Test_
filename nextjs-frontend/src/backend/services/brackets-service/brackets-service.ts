import { Knex } from "knex";
import { IBracket, IData } from "../database/models/i-brackets";
import { IProfile } from "../database/models/i-profile";
import { IRegisterTournament } from "../database/models/i-register-tournament";
import { ITournament } from "../database/models/i-tournaments";
import { BracketsRepository } from "../database/repositories/brackets-repository";
import { ProfilesRepository } from "../database/repositories/profiles-repository";

var Duel = require("tournament/duel");
export const persistBrackets = async (req: ITournament, context: any) => {
  let roundsSize: number[] = [];
  let brackets = new Duel(
    Number(req?.bracketsMetadata?.playersLimit),
    req?.bracketsMetadata?.type == "SINGLE" ? 1 : 2
  );
  brackets.matches = brackets.matches.map((element: any) => {
    if (!roundsSize.includes(element.id.r)) {
      roundsSize.push(element.id.r);
    }
    return { ...element, p: [0, 0] };
  });
  const repository = new BracketsRepository(
    context.transaction as Knex.Transaction
  );
  let bracket = await repository.create({
    tournament_id: req.id,
    players: { list: [] },
    brackets,
    rounds: roundsSize.length,
  } as any);
  return { id: bracket.id };
};

export const registerTournament = async (
  req: IRegisterTournament,
  context: any
) => {
  if (!(await validateUser(req.userId, context))) {
    return { message: "Invalid user id" };
  }
  try {
    const repository = new BracketsRepository(
      context.transaction as Knex.Transaction
    );
    let bracket: IBracket = await repository.findById(req.tournamentId);
    if (Array.isArray(bracket.players.list)) {
      if (bracket.players.list.includes(req.userId))
        return { message: "User already registered" };
      bracket.players.list.push(req.userId);
    } else {
      bracket.players.list = [req.userId];
    }
    await repository.upadte(bracket);
    return { message: "User register in successfull" };
  } catch (ex) {
    return { message: "Invalid tournament id" };
  }
};

export const checkInTournament = async (
  req: IRegisterTournament,
  context: any
) => {
  if (!(await validateUser(req.userId, context))) {
    return { message: "Invalid user id" };
  }
  try {
    const repository = new BracketsRepository(
      context.transaction as Knex.Transaction
    );
    let data: IBracket = await repository.findById(req.tournamentId);
    if (Array.isArray(data.players.list)) {
      if (!data.players.list.includes(req.userId))
        return { message: "User not registered for the tournament" };
      for (let i = 0; i < data.brackets.matches?.length; i++) {
        if (
          data.brackets.matches[i].p[0] == req.userId ||
          data.brackets.matches[i].p[1] == req.userId
        ) {
          return { message: "User already checked in" };
        }
        if (data.brackets.matches[i].p[0] == 0) {
          data.brackets.matches[i].p[0] = req.userId;
          break;
        }
        if (data.brackets?.matches[i].p[1] == 0) {
          data.brackets.matches[i].p[1] = req.userId;
          break;
        }
      }
    }
    console.log(data.brackets.matches);

    await repository.upadte(data);
    return { message: "User check in successfull" };
  } catch (ex) {
    return { message: "Invalid tournament id" };
  }
};

export const validateUser = async (id: string, context: any) => {
  try {
    const repository = new ProfilesRepository(
      context.transaction as Knex.Transaction
    );
    await repository.getProfileById(id);
    return true;
  } catch (ex) {
    return false;
  }
};
