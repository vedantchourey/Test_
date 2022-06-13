import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { findOrderById } from '../../../../src/backend/services/order-service/Order-Service';
import { authenticatedUserMiddleware } from '../../../../src/backend/utils/api-middle-ware/auth-middle-ware';
import { createQueryParamsMiddleWare } from '../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/query-validator-middle-ware';
import { orderRepository } from '../../../../src/backend/services/database/repositories/order-repository';
import { Knex } from 'knex';
import { stringType } from '../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/types/string-type';

const basicQueryParams = createQueryParamsMiddleWare({
    params: {
        order: {
            type: stringType
        }
    },
    async validate(params: { [p: string]: string | string[] }, context: PerRequestContext): Promise<string | undefined> {
        const repository = new orderRepository(context.transaction as Knex.Transaction);
        const orderId = params['order'];
        const order = await repository.findById(orderId);
        if (order == null) return `Could not find order with id: ${orderId}`;
    }
});


export default createNextJsRouteHandler({
    get: {
        handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
            const result = await findOrderById({ id: req.query.order }, context);
            res.status(result.errors ? 400 : 200).send(result);
        },
        preHooks: [authenticatedUserMiddleware, beginTransactionMiddleWare, basicQueryParams],
        postHooks: [commitOrRollBackTransactionMiddleWare]
    },
})
