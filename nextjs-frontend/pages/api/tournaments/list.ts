import type { NextApiRequest, NextApiResponse } from "next";
import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import {
  beginTransactionMiddleWare,
  commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { ITournament } from "../../../src/backend/services/database/models/i-tournaments";
import { listTournaments } from "../../../src/backend/services/tournament-service/tournament-service";

export default createNextJsRouteHandler({
  get: {
    handler: async (
      req: NextApiRequest,
      res: NextApiResponse<ServiceResponse<null, ITournament[]>>,
      context: PerRequestContext
    ) => {
      const result = await listTournaments(req.query, context);
      res.status(result.errors ? 400 : 200).json(result);
    },
    preHooks: [beginTransactionMiddleWare],
    postHooks: [commitOrRollBackTransactionMiddleWare],
  },
});
