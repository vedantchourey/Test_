import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import { authenticatedAdminUserMiddleware } from "../../../src/backend/utils/api-middle-ware/auth-middle-ware";
import {
  beginTransactionMiddleWare,
  commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { NextApiRequest, NextApiResponse } from "next";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import { creditBalance } from "../../../src/backend/services/wallet-service/wallet-service";
import { IWalletResponse } from "../../../src/backend/services/wallet-service/i-wallet-response";
import { IWalletRequest } from "../../../src/backend/services/wallet-service/i-wallet-request";
import { Knex } from "knex";

export default createNextJsRouteHandler({
  post: {
    handler: async (
      req: NextApiRequest,
      res: NextApiResponse<ServiceResponse<IWalletResponse, IWalletRequest>>,
      context: PerRequestContext
    ) => {
      const result: any = await creditBalance(req.body, context.transaction as Knex.Transaction);
      res.status(200).json(result);
    },
    preHooks: [beginTransactionMiddleWare, authenticatedAdminUserMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare],
  },
});
