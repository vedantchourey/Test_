import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import {
  beginTransactionMiddleWare,
  commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { NextApiRequest, NextApiResponse } from "next";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import { fetchMatchResultsReq, submitMatchResult, submitMatchResultRequest } from "../../../src/backend/services/brackets-service/brackets-service";
import { Knex } from "knex";
import { authenticatedUserMiddleware } from "../../../src/backend/utils/api-middle-ware/auth-middle-ware";
import { addWithdrawRequest, fetchWithdrawRequest, resolveWithdrawRequest } from "../../../src/backend/services/withdraw-request-service";

export default createNextJsRouteHandler({
  post: {
    handler: async (
      req: NextApiRequest,
      res: NextApiResponse<ServiceResponse<any, any>>,
      context: PerRequestContext
    ) => {
      const result: any = await addWithdrawRequest(req.body, context.transaction as Knex.Transaction);
      res.status(result?.errors?.length ? 500 : 200).json(result)
    },
    preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare],
  },
  get: {
    handler: async (
      req: NextApiRequest,
      res: NextApiResponse<ServiceResponse<any, any>>,
      context: PerRequestContext
    ) => {
      const result: any = await fetchWithdrawRequest(context.transaction as Knex.Transaction);
      res.status(result?.errors?.length ? 500 : 200).json(result)
    },
    preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare],
  },
  patch: {
    handler: async (
      req: NextApiRequest,
      res: NextApiResponse<ServiceResponse<any, any>>,
      context: PerRequestContext
    ) => {      
      const result: any = await resolveWithdrawRequest(
        req.body,
        context.transaction as Knex.Transaction
      );
      res.status(result?.errors?.length ? 500 : 200).json(result)
    },
    preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare],
  },
});
