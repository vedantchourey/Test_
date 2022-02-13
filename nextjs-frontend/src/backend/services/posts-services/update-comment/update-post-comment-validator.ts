import { IUpdateCommentRequest } from './i-update-post-comment';
import { isNullOrEmptyString, ValidationResult, isObject, isUUID } from '../../../../common/utils/validation/validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { Knex } from 'knex';


function validateComment(comment: IUpdateCommentRequest) {
  if (isNullOrEmptyString(comment.comment)) return 'Comment content is missing';
}

async function validateIsCommentedBy(comment: Partial<IUpdateCommentRequest>, context: PerRequestContext, commentRepository: PostCommentsRepository) {
  if (isNullOrEmptyString(comment.commentId)) return 'comment id is missing';
  if (!isUUID(comment.commentId)) return 'Invalid post id';
  const commentData = await commentRepository.getCommentById(comment.commentId as string);
  if (!commentData || !isObject(commentData)) return 'Comment do not exists';
  if (commentData.commentBy !== context.user?.id) return 'You are not allowed to update comment';
}

export async function validateUpdateCommentRequest(comment: IUpdateCommentRequest, context: PerRequestContext): Promise<ValidationResult<IUpdateCommentRequest>> {
  const transaction = context.transaction as Knex.Transaction;
  const repository = new PostCommentsRepository(transaction);
  return <ValidationResult<IUpdateCommentRequest>>{
    commentBy: await validateIsCommentedBy(comment, context, repository),
    comment: validateComment(comment)
  }
}
