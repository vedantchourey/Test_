import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import { authenticatedAdminUserMiddleware } from "../../../src/backend/utils/api-middle-ware/auth-middle-ware";
import {
    beginTransactionMiddleWare,
    commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { NextApiRequest, NextApiResponse } from "next";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import { updateRazorPayOrder } from "../../../src/backend/services/payment-service/payment-service";
import { IUpdateOrderRequest, IOrderResponse } from "../../../src/backend/services/payment-service/i-payment-interface";

export default createNextJsRouteHandler({
    post: {
        handler: async (
            req: NextApiRequest,
            res: NextApiResponse<ServiceResponse<IUpdateOrderRequest, IOrderResponse>>,
            context: PerRequestContext
        ) => {
            const result: any = await updateRazorPayOrder(req.body, context, context.user as any)
            res.status(200).json(result as any);
        },
        preHooks: [beginTransactionMiddleWare, authenticatedAdminUserMiddleware],
        postHooks: [commitOrRollBackTransactionMiddleWare],
    },
});
