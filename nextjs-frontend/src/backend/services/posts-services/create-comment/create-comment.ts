import { ICreateCommentRequest } from './i-create-comment';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { validateRequest } from './create-comment-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';
import { IPostCommentResponse } from '../update-comment/i-post-comment-response';
import { IPostComment } from '../../database/models/i-post-comment';

export async function createComment(req: ICreateCommentRequest, context: PerRequestContext): Promise<ServiceResponse<ICreateCommentRequest, IPostCommentResponse>> {
  const errors = await validateRequest(req);
  if (isThereAnyError(errors)) return { errors };
  const repository = new PostCommentsRepository(context.transaction as Knex.Transaction);
  const postId = context.getParamValue('postId') as string;
  const commentId = await repository.createComment({
    comment: req.comment,
    commentBy: context.user?.id as string,
    postId: postId
  });
  const createdComment = await repository.getByPostIdCommentId(postId, commentId);
  const { createdAt, updatedAt, ...others } = createdComment as IPostComment;
  return {
    data: {
      ...others,
      createdAt: createdAt?.toISOString() as string,
      updatedAt: updatedAt?.toISOString() as string
    } as IPostCommentResponse
  }
}
