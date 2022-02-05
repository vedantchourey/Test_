import { IUpdateCommentRequest } from './i-update-post-comment';
import { isNullOrEmptyString, ValidationResult, isObject, isUUID } from '../../../../common/utils/validation/validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { Knex } from 'knex';


function validateComment(comment: IUpdateCommentRequest) {
  if (isNullOrEmptyString(comment.comment)) return 'Comment content is missing';
}

async function validateIsCommentedBy(context: PerRequestContext, commentRepository: PostCommentsRepository) {
  if (isNullOrEmptyString(context._param.commentId)) return 'comment id is missing';
  if (!isUUID(context._param.commentId)) return 'Invalid post id';
  const commentData = await commentRepository.getCommentById(context._param.commentId as string);
  if (!commentData || !isObject(commentData)) return 'Comment do not exists';
  if (commentData.commentBy !== context.user?.id) return 'You are not allowed to update comment';
}

export async function validateUpdateCommentRequest(comment: Partial<IUpdateCommentRequest>, context: PerRequestContext): Promise<ValidationResult<IUpdateCommentRequest>> {
  const transaction = context.transaction as Knex.Transaction;
  const repository = new PostCommentsRepository(transaction);
  return <ValidationResult<IUpdateCommentRequest>>{
    commentBy: await validateIsCommentedBy( context, repository),
    comment: validateComment(comment)
  }
}
