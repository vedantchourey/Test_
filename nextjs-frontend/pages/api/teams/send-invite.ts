import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import { authenticatedAdminUserMiddleware } from "../../../src/backend/utils/api-middle-ware/auth-middle-ware";
import {
    beginTransactionMiddleWare,
    commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { NextApiRequest, NextApiResponse } from "next";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import { sendInvites } from "../../../src/backend/services/team-service";
import { Knex } from "knex";
import { ITeamInviteRequest } from "../../../src/backend/services/team-service/i-team-request";
import { IError, ISuccess } from "../../../src/backend/utils/common/Interfaces";

export default createNextJsRouteHandler({
    post: {
        handler: async (
            req: NextApiRequest,
            res: NextApiResponse<ServiceResponse<ITeamInviteRequest, ISuccess | IError>>,
            context: PerRequestContext
        ) => {
            const result: any = await sendInvites(req.body, context.transaction as Knex.Transaction, context.user as any);
            if (result?.errors?.length)
                res.status(500).json(result)
            else
                res.status(200).json(result);
        },
        preHooks: [beginTransactionMiddleWare, authenticatedAdminUserMiddleware],
        postHooks: [commitOrRollBackTransactionMiddleWare],
    },
});
