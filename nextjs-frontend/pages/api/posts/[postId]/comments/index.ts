import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { createComment } from '../../../../../src/backend/services/posts-services';
import { authenticatedUserMiddleware } from '../../../../../src/backend/utils/api-middle-ware/auth-middle-ware';
import { createQueryParamsMiddleWare } from '../../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/query-validator-middle-ware';
import { uuidType } from '../../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/types/uuid-type';
import { PostsRepository } from '../../../../../src/backend/services/database/repositories/posts-repository';
import { Knex } from 'knex';

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
  }
});


export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
      const result = await createComment(req.body, context);
      res.status(result?.errors ? 400 : 200).send(result);
    },
    preHooks: [authenticatedUserMiddleware, beginTransactionMiddleWare, basicQueryParams],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
})
