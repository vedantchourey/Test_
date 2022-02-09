import { IDeleteCommentRequest } from './i-delete-comment';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { isUUID, ValidationResult } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';

async function validateCommentId( context: PerRequestContext, postCommentsRepository: PostCommentsRepository) {
  if (!isUUID(context._param.commentId)) return 'Invalid comment id';
  const commentData = await postCommentsRepository.getCommentById(context._param.commentId as string);
  if (!commentData) return 'Comment not available';
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (commentData.commentBy !== context.user?.id) return 'Unauthorized';
}

export async function ValidateDeleteComment(context: PerRequestContext): Promise<ValidationResult<IDeleteCommentRequest>> {
  const transaction = context.transaction as Knex.Transaction;
  const commentRepository = new PostCommentsRepository(transaction);
  return <ValidationResult<IDeleteCommentRequest>>{
    commentId: await validateCommentId( context, commentRepository)
  }
}