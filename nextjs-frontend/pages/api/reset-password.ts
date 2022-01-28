import type { NextApiRequest, NextApiResponse } from 'next'
import { createNextJsRouteHandler } from '../../src/backend/utils/api-middle-ware/api-handler-factory';
import updatePassword from "../../src/backend/services/auth-service/reset-password/update-password";
import { ServiceResponse } from '../../src/backend/services/common/contracts/service-response';
import { UpdatePasswordRequest } from '../../src/backend/services/auth-service/reset-password/i-reset-password';

export default createNextJsRouteHandler({
    post: {
      handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<UpdatePasswordRequest, object>>) => {
        const result = await updatePassword(req.body);
        res.status(result.errors ? 400 : 200).json(result);
      },
    }
  })