import type { NextApiRequest, NextApiResponse } from "next";
import { createNextJsRouteHandler } from "../../../../src/backend/utils/api-middle-ware/api-handler-factory";
import { PerRequestContext } from "../../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import {
  beginTransactionMiddleWare,
  commitOrRollBackTransactionMiddleWare,
} from "../../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { listTournament } from "../../../../src/backend/services/tournament-service/tournament-service";
import { createQueryParamsMiddleWare } from "../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/query-validator-middle-ware";
import { uuidType } from "../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/types/uuid-type";
import { TournamentsRepository } from "../../../../src/backend/services/database/repositories/tournaments-repository";
import { Knex } from "knex";

const paramsConfig = {
  tournamentId: {
    type: uuidType,
  },
};

const basicQueryParams = createQueryParamsMiddleWare({
  params: paramsConfig,
  async validate(
    params: { [p: string]: string | string[] },
    context: PerRequestContext
  ): Promise<string | undefined> {
    const repository = new TournamentsRepository(
      context.transaction as Knex.Transaction
    );

    const tournamentId = params["tournamentId"];
    const tournament = await repository.getTournament(tournamentId as string);
    if (tournament == null)
      return `Could not find tournament with tournamentId: ${tournamentId}`;
  },
});

export default createNextJsRouteHandler({
  get: {
    handler: async (
      req: NextApiRequest,
      res: NextApiResponse,
      context: PerRequestContext
    ) => {
      const result = await listTournament(context);
      res.status(result.errors ? 400 : 200).json(result);
    },
    preHooks: [beginTransactionMiddleWare, basicQueryParams],
    postHooks: [commitOrRollBackTransactionMiddleWare],
  },
});
