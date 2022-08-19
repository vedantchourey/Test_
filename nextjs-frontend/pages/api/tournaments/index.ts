import { createNextJsRouteHandler } from '../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { createTournament, deleteTournament } from '../../../src/backend/services/tournament-service/tournament-service';
import { authenticatedUserMiddleware } from '../../../src/backend/utils/api-middle-ware/auth-middle-ware';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServiceResponse } from '../../../src/backend/services/common/contracts/service-response';
import { PerRequestContext } from '../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { CreateOrEditTournamentRequest } from '../../../src/backend/services/tournament-service/create-or-edit-tournament-request';
import { ITournamentResponse } from '../../../src/backend/services/tournament-service/i-tournament-response';
import { Knex } from 'knex';

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<CreateOrEditTournamentRequest, ITournamentResponse>>, context: PerRequestContext) => {
      const result = await createTournament(req.body, context);
      res.status(result.errors ? 400 : 200).json(result);
    },
    preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  },
  delete: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<CreateOrEditTournamentRequest, ITournamentResponse>>, context: PerRequestContext) => {
      const result = await deleteTournament(req.query.id as string, context.transaction as Knex.Transaction);
      res.status(result.errors ? 400 : 200).json(result);
    },
    preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
});
