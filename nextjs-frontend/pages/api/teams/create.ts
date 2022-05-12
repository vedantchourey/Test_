import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import { authenticatedAdminUserMiddleware } from "../../../src/backend/utils/api-middle-ware/auth-middle-ware";
import {
  beginTransactionMiddleWare,
  commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { NextApiRequest, NextApiResponse } from "next";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import { createTeams } from "../../../src/backend/services/team-service";
import { Knex } from "knex";
import { ITeamCreateRequest } from "../../../src/backend/services/team-service/i-team-request";
import { ITeamCreateResponse } from "../../../src/backend/services/team-service/i-team-response";

export default createNextJsRouteHandler({
  post: {
    handler: async (
      req: NextApiRequest,
      res: NextApiResponse<ServiceResponse<ITeamCreateRequest, ITeamCreateResponse>>,
      context: PerRequestContext
    ) => {
      const result: any = await createTeams(req.body, context.transaction as Knex.Transaction, context.user as any);
      res.status(result?.errors?.length ? 500 : 200).json(result)
    },
    preHooks: [beginTransactionMiddleWare, authenticatedAdminUserMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare],
  },
});
