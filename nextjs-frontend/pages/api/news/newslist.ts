import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { newsList } from '../../../src/backend/services/news-services';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { authenticatedUserMiddleware } from '../../../src/backend/utils/api-middle-ware/auth-middle-ware';

export default createNextJsRouteHandler({
  get: {
    handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
      const result = await newsList(context);
      res.status(200).send(result)
    },
    preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
});