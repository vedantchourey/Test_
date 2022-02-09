import type { NextApiRequest, NextApiResponse } from 'next'
import { createNextJsRouteHandler } from '../../../src/backend/utils/api-middle-ware/api-handler-factory';
import resetPassword from '../../../src/backend/services/auth-service/reset-password/reset-password';
import { ServiceResponse } from '../../../src/backend/services/common/contracts/service-response';
import { ResetPasswordRequest, ResetPasswordResponse } from '../../../src/backend/services/auth-service/reset-password/i-reset-password';
import { PerRequestContext } from '../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../src/backend/utils/api-middle-ware/transaction-middle-ware';

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<ResetPasswordRequest, ResetPasswordResponse>>, context: PerRequestContext) => {
      const result = await resetPassword(req.body, context);
      res.status(result.errors ? 400 : 200).json(result);
    },
    preHooks: [beginTransactionMiddleWare],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
})
