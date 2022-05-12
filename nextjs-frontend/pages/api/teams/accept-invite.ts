import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import {
    beginTransactionMiddleWare,
    commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { NextApiRequest, NextApiResponse } from "next";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import { acceptInvite } from "../../../src/backend/services/team-service";
import { Knex } from "knex";
import { IError, ISuccess } from "../../../src/backend/utils/common/Interfaces";

export default createNextJsRouteHandler({
    get: {
        handler: async (
            req: NextApiRequest,
            res: NextApiResponse<ServiceResponse<any, ISuccess | IError>>,
            context: PerRequestContext
        ) => {
            const result: any = await acceptInvite(req.query?.invite_key as string, context.transaction as Knex.Transaction, context.user as any);
            if (result?.errors?.length)
                res.status(500).json(result)
            else
                res.status(200).json(result);
        },
        preHooks: [beginTransactionMiddleWare],
        postHooks: [commitOrRollBackTransactionMiddleWare],
    },
});
