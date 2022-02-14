import { IUpdateCommentRequest } from './i-update-post-comment';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { validateUpdateCommentRequest } from './update-post-comment-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';
import { IPostCommentResponse } from './i-post-comment-response';
import { IPostComment } from '../../database/models/i-post-comment';

<<<<<<< HEAD
export async function updateComment(comment: IUpdateCommentRequest, context: PerRequestContext) {
  const errors = await validateUpdateCommentRequest(comment, context);
  if (isThereAnyError(errors)) return { errors }
  const repository = new PostCommentsRepository(context.transaction!);

  // Remove unwanted fields if exists
  const update = sanitizeObject(comment, ['commentBy', 'commentId', 'postId']);

  await repository.updateComment(comment.commentId as string, { ...update, updatedAt: new Date().toISOString() });

  return {
    data: {
      message: 'Comment updated'
    }
  }
}
=======
export async function updateComment(request: IUpdateCommentRequest, context: PerRequestContext): Promise<ServiceResponse<IUpdateCommentRequest, IPostCommentResponse>> {
  const errors = await validateUpdateCommentRequest(request, context);
  if (isThereAnyError(errors)) return {errors}
  const repository = new PostCommentsRepository(context.transaction as Knex.Transaction);
  const commentId = context.getParamValue('commentId') as string;
  const postId = context.getParamValue('postId') as string;
  await repository.updateComment(commentId, postId, {comment: request.comment});
  const updatedComment = await repository.getByPostIdCommentId(postId, commentId);
  const {updatedAt, createdAt, ...others} = updatedComment as IPostComment;
  return {
    data: {
      ...others,
      updatedAt: updatedAt?.toISOString() as string,
      createdAt: createdAt?.toISOString() as string
    } as IPostCommentResponse
  }
}
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
