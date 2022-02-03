import type { NextApiRequest, NextApiResponse } from 'next'
import { createNextJsRouteHandler } from '../../src/backend/utils/api-middle-ware/api-handler-factory';
import updatePassword from "../../src/backend/services/auth-service/reset-password/update-password";
import { ServiceResponse } from '../../src/backend/services/common/contracts/service-response';
import { UpdatePasswordRequest, ResetPasswordResponse } from '../../src/backend/services/auth-service/reset-password/i-reset-password';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../src/backend/utils/api-middle-ware/transaction-middle-ware';

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<UpdatePasswordRequest, ResetPasswordResponse>>) => {
      const result = await updatePassword(req.body);
      res.status(result.errors ? 400 : 200).json(result);
    },
    preHooks: [beginTransactionMiddleWare],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
})