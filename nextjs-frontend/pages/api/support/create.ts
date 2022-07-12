import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { createTicket } from '../../../src/backend/services/support-services';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { authenticatedUserMiddleware } from '../../../src/backend/utils/api-middle-ware/auth-middle-ware';

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
      const result = await createTicket(req.body, context);
      res.status(result.errors ? 400 : 200).send(result)
    },
    preHooks: [authenticatedUserMiddleware, beginTransactionMiddleWare],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
});