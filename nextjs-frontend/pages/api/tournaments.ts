import { createNextJsRouteHandler } from '../../src/backend/utils/api-middle-ware/api-handler-factory';
import { createTournament } from '../../src/backend/services/tournament-service/tournament-service';
import { authenticatedAdminUserMiddleware } from '../../src/backend/utils/api-middle-ware/auth-middle-ware';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServiceResponse } from '../../src/backend/services/common/contracts/service-response';
import { PerRequestContext } from '../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { CreateOrEditTournamentRequest } from '../../src/backend/services/tournament-service/create-or-edit-tournament-request';
import { ITournamentResponse } from '../../src/backend/services/tournament-service/i-tournament-response';

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<CreateOrEditTournamentRequest, ITournamentResponse>>, context: PerRequestContext) => {
      const result = await createTournament(req.body, context);
      res.status(result.errors ? 400 : 200).json(result);
    },
    preHooks: [authenticatedAdminUserMiddleware, beginTransactionMiddleWare],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
});
