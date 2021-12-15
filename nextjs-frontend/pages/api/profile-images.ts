import { createNextJsRouteHandler, PerRequestContext } from '../../utils/api-middle-ware/api-handler-factory';
import { NextApiRequest, NextApiResponse } from 'next';
import { authenticatedUserMiddleware } from '../../utils/api-middle-ware/auth-middle-ware';
import UserProfileResponse from '../../services/front-end-services/user-profile-response';
import { updateProfileImage} from '../../services/backend-services/profile-service/profile-service';
import { getHttpCode, ServiceResponse } from '../../services/backend-services/common/contracts/service-response';
import { UpdateProfileImageRequest } from '../../services/backend-services/profile-service/update-profile-image-request';


export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<UpdateProfileImageRequest, UserProfileResponse>>, context: PerRequestContext) => {
      const response = await updateProfileImage(req.body, context);
      return res.status(getHttpCode(response)).send(response);
    },
    preHooks: [authenticatedUserMiddleware]
  }
})


