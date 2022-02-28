import type { NextApiRequest, NextApiResponse } from 'next'
import { createNextJsRouteHandler } from '../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { searchUser } from "../../../src/backend/services/search-service/search";
import { ServiceResponse } from '../../../src/backend/services/common/contracts/service-response';
import { PerRequestContext } from '../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { ISearchRequest, ISearchResponse } from '../../../src/backend/services/search-service/i-search';

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<ISearchRequest, ISearchResponse>>, context: PerRequestContext) => {
      const result = await searchUser(req.body, context);
      res.status(result.errors ? 400 : 200).json(result);
    },
    preHooks: [beginTransactionMiddleWare],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
})
