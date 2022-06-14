import type { NextApiRequest, NextApiResponse } from "next";
import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import {
    beginTransactionMiddleWare,
    commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { listMatchDispute } from "../../../src/backend/services/match-dispute/matchDispute-service";
import { IMatchDisputeResponse } from "../../../src/backend/services/match-dispute/i-matchDispute-response";
import { authenticatedUserMiddleware } from "../../../src/backend/utils/api-middle-ware/auth-middle-ware";

export default createNextJsRouteHandler({
    get: {
        handler: async (
            req: NextApiRequest,
            res: NextApiResponse<ServiceResponse<null, IMatchDisputeResponse>>,
            context: PerRequestContext
        ) => {
            const result = await listMatchDispute(req.query?.tournamentId as string, context);
            res.status(result.errors ? 400 : 200).json(result);
        },
        preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware],
        postHooks: [commitOrRollBackTransactionMiddleWare],
    },
});
