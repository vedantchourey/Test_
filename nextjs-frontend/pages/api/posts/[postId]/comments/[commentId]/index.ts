import { NextApiRequest, NextApiResponse } from 'next';
import { createNextJsRouteHandler } from '../../../../../../src/backend/utils/api-middle-ware/api-handler-factory';
import { PerRequestContext } from '../../../../../../src/backend/utils/api-middle-ware/api-middleware-typings';
import { beginTransactionMiddleWare, commitOrRollBackTransactionMiddleWare } from '../../../../../../src/backend/utils/api-middle-ware/transaction-middle-ware';
import { deleteComment, updateComment } from '../../../../../../src/backend/services/posts-services';
import { authenticatedUserMiddleware } from '../../../../../../src/backend/utils/api-middle-ware/auth-middle-ware';
import { createQueryParamsMiddleWare } from '../../../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/query-validator-middle-ware';
import { uuidType } from '../../../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/types/uuid-type';
import { PostCommentsRepository } from '../../../../../../src/backend/services/database/repositories/post-comments-repository';
import { Knex } from 'knex';

const paramsConfig = {
  postId: {
    type: uuidType
  },
  commentId: {
    type: uuidType
  }
};

const basicQueryParams = createQueryParamsMiddleWare({
  params: paramsConfig,
  async validate(params: { [p: string]: string | string[] }, context: PerRequestContext): Promise<string | undefined> {
    const repository = new PostCommentsRepository(context.transaction as Knex.Transaction);
    const postId = params['postId'];
    const commentId = params['commentId'];
    const comment = await repository.getByPostIdCommentId(postId as string, commentId as string);
    if (comment == null) return `Could not find comment with postId: ${postId}, commentId: ${commentId}`;
  }
});

const deleteQueryParams = createQueryParamsMiddleWare({
  params: paramsConfig,
  async validate(params: { [p: string]: string | string[] }, context: PerRequestContext): Promise<string | undefined> {
    const repository = new PostCommentsRepository(context.transaction as Knex.Transaction);
    const postId = params['postId'];
    const commentId = params['commentId'];
    const comment = await repository.getByPostIdCommentId(postId as string, commentId as string);
    if (comment == null) return `Could not find comment with postId: ${postId}, commentId: ${commentId}`;
    if (comment.commentBy !== context.user?.id) return `Not allowed to delete`;
  }
});


export default createNextJsRouteHandler({
  delete: {
    handler: async function (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) {
      const result = await deleteComment(context);
      res.status(result.errors ? 400 : 200).send(result);
    },
    preHooks: [authenticatedUserMiddleware, beginTransactionMiddleWare, deleteQueryParams],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  },
  patch: {
    handler: async (req: NextApiRequest, res: NextApiResponse, context: PerRequestContext) => {
      const result = await updateComment(req.body, context);
      res.status(result.errors ? 400 : 200).send(result);
    },
    preHooks: [authenticatedUserMiddleware, beginTransactionMiddleWare, basicQueryParams],
    postHooks: [commitOrRollBackTransactionMiddleWare]
  }
})
