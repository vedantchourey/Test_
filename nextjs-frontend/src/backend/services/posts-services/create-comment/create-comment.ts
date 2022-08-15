import { ICreateCommentRequest } from './i-create-comment';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { validateRequest } from './create-comment-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';
import { IPostCommentResponse } from '../../database/models/i-post-comment';
import { ICreatePostCommentResponse } from '../i-post-comment-response';

export async function createComment(req: ICreateCommentRequest, context: PerRequestContext): Promise<ServiceResponse<ICreateCommentRequest, ICreatePostCommentResponse>> {
  const errors = await validateRequest(req);
  if (isThereAnyError(errors)) return {errors};
  const repository = new PostCommentsRepository(context.transaction as Knex.Transaction);
  const postUUID = context.getParamValue('postId') as string;
  const commentId = await repository.createComment({
    comment: req.comment,
    commentBy: context.user?.id as string,
    postId: postUUID,
    subComment: req.subComment,
  });
  const createdComment = await repository.getCommentByPostIdCommentId(commentId);
  const {createdAt, updatedAt, commentBy, comment, id, postId, username, firstName, lastName, avatarUrl } = createdComment as IPostCommentResponse;
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
    } as unknown as ICreatePostCommentResponse
  }
}
