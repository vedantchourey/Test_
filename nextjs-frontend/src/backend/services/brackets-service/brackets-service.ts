import { Knex } from "knex";
import { IBracket } from "../database/models/i-brackets";
import { IRegisterTournament } from "../database/models/i-register-tournament";
import { ITournament } from "../database/models/i-tournaments";
import { BracketsRepository } from "../database/repositories/brackets-repository";

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
    return await repository.upadte(bracket);
  } catch (ex) {
    return { message: "Invalid tournament id" };
  }
};
