import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import {
    beginTransactionMiddleWare,
    commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { NextApiRequest, NextApiResponse } from "next";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import { Knex } from "knex";
import { IError, ISuccess } from "../../../src/backend/utils/common/Interfaces";
import { authenticatedAdminUserMiddleware } from "../../../src/backend/utils/api-middle-ware/auth-middle-ware";
import { fetchNotifications } from "../../../src/backend/services/notifications-service";

export default createNextJsRouteHandler({
    get: {
        handler: async (
            req: NextApiRequest,
            res: NextApiResponse<ServiceResponse<any, ISuccess | IError>>,
            context: PerRequestContext
        ) => {
            const result: any = await fetchNotifications(context.transaction as Knex.Transaction, context.user as any);
            res.status(result?.errors?.length ? 500 : 200).json(result)
        },
        preHooks: [beginTransactionMiddleWare, authenticatedAdminUserMiddleware],
        postHooks: [commitOrRollBackTransactionMiddleWare],
    },
});
