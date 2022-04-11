import { createNextJsRouteHandler } from '../../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { persistTournament } from '../../../../src/backend/services/tournament-service/tournament-service';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServiceResponse } from '../../../../src/backend/services/common/contracts/service-response';
import { PerRequestContext } from '../../../../src/backend/utils/api-middle-ware/api-middleware-typings';

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<any,any>>, context: PerRequestContext) => {
      console.log('req.body -> ', req.body)
      const result = await persistTournament(req.body, context);
      res.status(200).json(result);
    },
    preHooks: [beginTransactionMiddleWare],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
});
