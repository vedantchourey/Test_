import { IUpdateCommentRequest } from './i-update-post-comment';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { validateUpdateCommentRequest } from './update-post-comment-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';
import { IUpdatePostCommentResponse } from '../i-post-comment-response';
import { IPostCommentResponse } from '../../database/models/i-post-comment';

export async function updateComment(request: IUpdateCommentRequest, context: PerRequestContext): Promise<ServiceResponse<IUpdateCommentRequest, IUpdatePostCommentResponse>> {
  const errors = await validateUpdateCommentRequest(request, context);
  if (isThereAnyError(errors)) return {errors}
  const repository = new PostCommentsRepository(context.transaction as Knex.Transaction);
  const commentId = context.getParamValue('commentId') as string;
  const postUUID = context.getParamValue('postId') as string;
  await repository.updateComment(commentId, postUUID, context.user?.id as string, {comment: request.comment});
  const updatedComment = await repository.getCommentByPostIdCommentId(commentId);
  const {createdAt, updatedAt, commentBy, comment, id, postId, username, firstName, lastName, avatarUrl } = updatedComment as IPostCommentResponse;
  return {
    data: {
      id,
      postId,
      comment,
      commentOwner: {
        id: commentBy,
        username: username,
        firstName: firstName,
        lastName: lastName,
        avatar: avatarUrl
      },
      createdAt: createdAt?.toISOString() as string,
      updatedAt: updatedAt?.toISOString() as string
    } as unknown as IUpdatePostCommentResponse
  }
}
