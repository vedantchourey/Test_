import { createNextJsRouteHandler } from '../../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { NextApiRequest, NextApiResponse } from 'next';
import { ServiceResponse } from '../../../../src/backend/services/common/contracts/service-response';
import { IMultiPartRequest } from '../../../../src/backend/utils/api-middle-ware/multi-part-file-upload-middle-ware/multi-part-definitions';
import { postImageMiddleware } from '../../../../src/backend/utils/api-middle-ware/multi-part-file-upload-middle-ware/multi-part-upload-types';
import { authenticatedUserMiddleware } from '../../../../src/backend/utils/api-middle-ware/auth-middle-ware';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { uploadFile } from '../../../../src/backend/services/file-service/file-service';
import { UploadFileRequest } from '../../../../src/backend/services/file-service/i-upload-file-type';
import { IFileResponse } from '../../../../src/backend/services/file-service/i-file-response';
import { PerRequestContext } from '../../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { CreatePostImageFileType } from '../../../../src/backend/services/file-service/create-post-image-file-type';


export const config = {
  api: {
    bodyParser: false
  }
}

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<UploadFileRequest, IFileResponse>>, context: PerRequestContext): Promise<void> => {
      const multiPartRequest = req as IMultiPartRequest;
      const result = await uploadFile(multiPartRequest.files, new CreatePostImageFileType(context));
      return res.status(result.errors == null ? 200 : 400).send(result);
    },
    preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware, postImageMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
});

