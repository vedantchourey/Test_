import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { likePost } from '../../../../../src/backend/services/posts-services';
import { authenticatedUserMiddleware } from '../../../../../src/backend/utils/api-middle-ware/auth-middle-ware';
import { PostLikesRepository } from '../../../../../src/backend/services/database/repositories/post-likes-repository';
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
    const transaction = context.transaction as Knex.Transaction;
    const repository = new PostsRepository(transaction);
    const postId = params['postId'] as string;
    const post = await repository.getPostById(postId);
    if (post == null) return `Could not find post with postId: ${postId}`;
    const postLikesRepository = new PostLikesRepository(transaction);
    const isLiked = await postLikesRepository.isLiked(postId, context.user?.id);
    if (isLiked) return 'Post already liked';
  }
});

export default createNextJsRouteHandler({
  post: {
    handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
      const result = await likePost(req.body, context);
      res.status(result?.errors ? 400 : 200).send(result)
    },
    preHooks: [authenticatedUserMiddleware, beginTransactionMiddleWare, basicQueryParams],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
})
