import type { NextApiRequest, NextApiResponse } from 'next'
import signupUser from '../../services/backend-services/auth-service/signup/signup-user';
import { ServiceResponse } from '../../services/backend-services/common/contracts/service-response';
import { SignupRequest, SignupResponse } from '../../services/backend-services/auth-service/signup/signup-contracts';
import { createNextJsRouteHandler, PerRequestContext } from '../../utils/api-middle-ware/api-handler-factory';

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<SignupRequest, SignupResponse>>, context: PerRequestContext) => {
      const result = await signupUser(req.body);
      res.status(result.errors ? 400 : 200).json(result);
    }
  }
})
