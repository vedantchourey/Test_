import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../src/backend/utils/api-middle-ware/api-handler-factory';
import { getHttpCode, ServiceResponse } from '../../src/backend/services/common/contracts/service-response';
import { UpdateProfileImageRequest } from '../../src/backend/services/profile-service/update-profile-image-request';
import { updateProfileImage } from '../../src/backend/services/profile-service/profile-service';
import { PerRequestContext } from '../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { IProfile } from '../../src/backend/services/database/models/i-profile';
import { authenticatedUserMiddleware } from '../../src/backend/utils/api-middle-ware/auth-middle-ware';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../src/backend/utils/api-middle-ware/transaction-middle-ware';


export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<UpdateProfileImageRequest, IProfile>>, context: PerRequestContext) => {
      const response = await updateProfileImage(req.body, context);
      return res.status(getHttpCode(response)).send(response);
    },
    preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
})


