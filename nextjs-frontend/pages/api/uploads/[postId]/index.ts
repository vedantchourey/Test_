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
import { UpdatePostImageFileType } from '../../../../src/backend/services/file-service/update-post-image-file-type';
import { createQueryParamsMiddleWare } from '../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/query-validator-middle-ware';
import { uuidType } from '../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/types/uuid-type';
import { Knex } from 'knex';
import { PostsRepository } from '../../../../src/backend/services/database/repositories/posts-repository';

const basicQueryParams = createQueryParamsMiddleWare({
  params: {
    postId: {
      type: uuidType
    }
  },
  async validate(params: { [p: string]: string | string[] }, context: PerRequestContext): Promise<string | undefined> {
    const repository = new PostsRepository(context.transaction as Knex.Transaction);
    const postId = params['postId'];
    const post = await repository.getPostById(postId as string);
    if (post == null) return `Could not find post with postId: ${postId}`;
    if (post.postedBy !== context.user?.id) return 'You are not allowed to update post';
  }
});

export const config = {
  api: {
    bodyParser: false
  }
}

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse<ServiceResponse<UploadFileRequest, IFileResponse>>, context: PerRequestContext): Promise<void> => {
      const multiPartRequest = req as IMultiPartRequest;
      const result = await uploadFile(multiPartRequest.files, new UpdatePostImageFileType(context));
      return res.status(result.errors == null ? 200 : 400).send(result);
    },
    preHooks: [beginTransactionMiddleWare, authenticatedUserMiddleware, basicQueryParams, postImageMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
});

