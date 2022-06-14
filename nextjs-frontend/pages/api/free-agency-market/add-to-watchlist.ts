import type { NextApiRequest, NextApiResponse } from "next";
import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import {
  beginTransactionMiddleWare,
  commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { addToWatchList } from "../../../src/backend/services/FreeAgencyMarket/FreeAgencyMarket-Service";
import { IFreeAgencyMarketResponse } from "../../../src/backend/services/FreeAgencyMarket/i-FreeAgencyMarket-response";
import { authenticatedUserMiddleware } from "../../../src/backend/utils/api-middle-ware/auth-middle-ware";

export default createNextJsRouteHandler({
  post: {
    handler: async (
      req: NextApiRequest,
      res: NextApiResponse<ServiceResponse<null, IFreeAgencyMarketResponse>>,
      context: PerRequestContext
    ) => {
      const result = await addToWatchList(req.body, context);
      res.status(result.errors ? 400 : 200).json(result);
    },
    preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare],
  },
});
