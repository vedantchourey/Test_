import { createNextJsRouteHandler } from '../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServiceResponse } from '../../../src/backend/services/common/contracts/service-response';
import { IMultiPartRequest } from '../../../src/backend/utils/api-middle-ware/multi-part-file-upload-middle-ware/multi-part-definitions';
import { avatarImageMiddleware } from '../../../src/backend/utils/api-middle-ware/multi-part-file-upload-middle-ware/multi-part-upload-types';


export const config = {
  api: {
    bodyParser: false
  }
}

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<unknown, { message: string }>>): Promise<void> => {
      const multiPartRequest = req as IMultiPartRequest;
      console.warn(multiPartRequest);
      res.status(200).send({data: {message: 'hello'}});
    },
    preHooks: [avatarImageMiddleware]
  }
});

