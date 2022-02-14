import { IUpdateCommentRequest } from './i-update-post-comment';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { validateUpdateCommentRequest } from './update-post-comment-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';
import { IPostCommentResponse } from './i-post-comment-response';
import { IPostComment } from '../../database/models/i-post-comment';

export async function updateComment(request: IUpdateCommentRequest, context: PerRequestContext): Promise<ServiceResponse<IUpdateCommentRequest, IPostCommentResponse>> {
  const errors = await validateUpdateCommentRequest(request, context);
  if (isThereAnyError(errors)) return { errors }
  const repository = new PostCommentsRepository(context.transaction as Knex.Transaction);
  const commentId = context.getParamValue('commentId') as string;
  const postId = context.getParamValue('postId') as string;
  await repository.updateComment(commentId, postId, { comment: request.comment });
  const updatedComment = await repository.getByPostIdCommentId(postId, commentId);
  const { updatedAt, createdAt, ...others } = updatedComment as IPostComment;
  return {
    data: {
      ...others,
      updatedAt: updatedAt?.toISOString() as string,
      createdAt: createdAt?.toISOString() as string
    } as IPostCommentResponse
  }
}
