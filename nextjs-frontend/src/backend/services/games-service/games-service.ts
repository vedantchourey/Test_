import { Knex } from "knex";
import { NextApiRequest } from "next";
import {
  NoobApiService,
  PerRequestContext,
} from "../../utils/api-middle-ware/api-middleware-typings";
import { GameRepository } from "../database/repositories/game-repository";

export const fetchGames: NoobApiService<
  NextApiRequest,
  PerRequestContext
> = async (req, context) => {
  const repository = new GameRepository(
    context.transaction as Knex.Transaction
  );
  return await repository.getGamesPlatform();
};
