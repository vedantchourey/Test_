import { Knex } from "knex";
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
    players: [],
    brackets,
    rounds: roundsSize.length,
  } as any);
  return { id: bracket.id };
};
