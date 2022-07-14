import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { supportList } from '../../../src/backend/services/support-services';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../src/backend/utils/api-middle-ware/transaction-middle-ware';

export default createNextJsRouteHandler({
  get: {
    handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
      const result = await supportList(req.query, context);
      res.status(200).send(result)
    },
    preHooks: [beginTransactionMiddleWare],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
});