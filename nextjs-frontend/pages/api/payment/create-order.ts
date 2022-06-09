import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import { authenticatedUserMiddleware } from "../../../src/backend/utils/api-middle-ware/auth-middle-ware";
import {
    beginTransactionMiddleWare,
    commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { NextApiRequest, NextApiResponse } from "next";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import { createRazorPayOrder } from "../../../src/backend/services/payment-service/payment-service";
import { Knex } from "knex";
import { IOrderRequest, IOrderResponse } from "../../../src/backend/services/payment-service/i-payment-interface";

export default createNextJsRouteHandler({
    post: {
        handler: async (
            req: NextApiRequest,
            res: NextApiResponse<ServiceResponse<IOrderRequest, IOrderResponse>>,
            context: PerRequestContext
        ) => {
            const result: any = await createRazorPayOrder(req.body, context.knexConnection as Knex)
            res.status(200).json(result as any);
        },
        preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware],
        postHooks: [commitOrRollBackTransactionMiddleWare],
    },
});
