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

export default createNextJsRouteHandler({
  post: {
    handler: async (
      req: NextApiRequest,
      res: NextApiResponse<ServiceResponse<any, any>>,
      context: PerRequestContext
    ) => {
      const result = await submitMatchResultRequest(req.body, context.knexConnection as Knex, context.user);
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
      const result = await fetchMatchResultsReq(req.query, context.knexConnection as Knex);
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
      const result = await submitMatchResult(req.body, context.knexConnection as Knex, context);
      res.status(result?.errors?.length ? 500 : 200).json(result)
    },
    preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare],
  },
});
