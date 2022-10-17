import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { createHomeCarousel } from '../../../src/backend/services/home-carouse-services';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../src/backend/utils/api-middle-ware/transaction-middle-ware';

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
      const result = await createHomeCarousel(req.body, context);
      res.status(result.errors ? 400 : 200).send(result)
    },
    preHooks: [beginTransactionMiddleWare],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
});