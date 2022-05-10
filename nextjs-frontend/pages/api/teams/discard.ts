import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import { authenticatedAdminUserMiddleware } from "../../../src/backend/utils/api-middle-ware/auth-middle-ware";
import {
    beginTransactionMiddleWare,
    commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { NextApiRequest, NextApiResponse } from "next";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import { discardTeams } from "../../../src/backend/services/team-service";
import { Knex } from "knex";
import { ITeamDiscardRequest } from "../../../src/backend/services/team-service/i-team-request";
import { IError, ISuccess } from "../../../src/backend/utils/common/Interfaces";

export default createNextJsRouteHandler({
    delete: {
        handler: async (
            req: NextApiRequest,
            res: NextApiResponse<ServiceResponse<ITeamDiscardRequest, ISuccess | IError>>,
            context: PerRequestContext
        ) => {
            const result: any = await discardTeams(req.body, context.transaction as Knex.Transaction, context.user as any);
            res.status(200).json(result);
        },
        preHooks: [beginTransactionMiddleWare, authenticatedAdminUserMiddleware],
        postHooks: [commitOrRollBackTransactionMiddleWare],
    },
});
