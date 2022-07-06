import type { NextApiRequest, NextApiResponse } from "next";
import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import {
  beginTransactionMiddleWare,
  commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { getAllRepost } from "../../../src/backend/services/report-services/report-list";
import { reportRepository } from './../../../src/backend/services/database/repositories/report-post';
import { authenticatedUserMiddleware } from "../../../src/backend/utils/api-middle-ware/auth-middle-ware";
import { Knex } from 'knex';

export default createNextJsRouteHandler({
  get: {
    handler: async (
      req: NextApiRequest,
      res: NextApiResponse<ServiceResponse<null, any>>,
      context: PerRequestContext
    ) => {
      const reportRepo = new reportRepository(context.transaction as Knex.Transaction);
      const repostId = req.query?.repostId as string;
      const result = await reportRepo.delete(repostId);
      res.status(result ? 400 : 200).json({data: "deleted successfully"});
    },
    preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare],
  },
});
