import { IUpdateCommentRequest } from './i-update-post-comment';
import { isNullOrEmptyString, ValidationResult } from '../../../../common/utils/validation/validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { Knex } from 'knex';


function validateComment(comment: IUpdateCommentRequest) {
  if (isNullOrEmptyString(comment.comment)) return 'Is required';
}

async function validateIsCommentedBy(context: PerRequestContext, commentRepository: PostCommentsRepository) {
  const commentId = context.getParamValue<string>('commentId');
  const comment = await commentRepository.getCommentById(commentId as string);
  if (comment == null) return 'Comment do not exists';
  if (comment?.commentBy !== context.user?.id) return 'You are not allowed to update comment';
}

export async function validateUpdateCommentRequest(comment: IUpdateCommentRequest, context: PerRequestContext): Promise<ValidationResult<IUpdateCommentRequest>> {
  const transaction = context.transaction as Knex.Transaction;
  const repository = new PostCommentsRepository(transaction);
  return <ValidationResult<IUpdateCommentRequest>>{
    commentBy: await validateIsCommentedBy(context, repository),
    comment: validateComment(comment)
  }
}
