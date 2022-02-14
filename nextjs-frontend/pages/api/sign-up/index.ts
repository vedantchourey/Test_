import type { NextApiRequest, NextApiResponse } from 'next'
import { createNextJsRouteHandler } from '../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { ServiceResponse } from '../../../src/backend/services/common/contracts/service-response';
import { SignupRequest, SignupResponse } from '../../../src/backend/services/auth-service/signup/signup-contracts';
import { PerRequestContext } from '../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import signupUser from '../../../src/backend/services/auth-service/signup/signup-user';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../src/backend/utils/api-middle-ware/transaction-middle-ware';


export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<SignupRequest, SignupResponse>>, context: PerRequestContext) => {
      const result = await signupUser(req.body, context);
      res.status(result.errors ? 400 : 200).json(result);
    },
    preHooks: [beginTransactionMiddleWare],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
})
