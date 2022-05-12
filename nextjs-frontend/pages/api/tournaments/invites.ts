import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import {
  beginTransactionMiddleWare,
  commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { NextApiRequest, NextApiResponse } from "next";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import { Knex } from "knex";
import { fetchTournamentInvites } from "../../../src/backend/services/tournament-service/tournament-service";

export default createNextJsRouteHandler({
  post: {
    handler: async (
      req: NextApiRequest,
      res: NextApiResponse<ServiceResponse<any, any>>,
      context: PerRequestContext
    ) => {
      const result = await fetchTournamentInvites(req.body, context.knexConnection as Knex);
      res.status(result?.errors?.length ? 500 : 200).json(result)
    },
    preHooks: [beginTransactionMiddleWare],
    postHooks: [commitOrRollBackTransactionMiddleWare],
  },
});
