import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { isUUID, ValidationResult } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';

interface IDeleteCommentRequest{
  commentId: string;
}

async function validateCommentId(comment: Partial<IDeleteCommentRequest>, context: PerRequestContext, postCommentsRepository: PostCommentsRepository): Promise<string | undefined> {
  if (!isUUID(comment.commentId)) return 'Invalid comment id';
  const commentData = await postCommentsRepository.getCommentById(comment.commentId as string);
  if (!commentData) return 'Comment not available';
  if (commentData.commentBy !== context.user?.id as string) return 'Unauthorized';
}

export async function ValidateDeleteComment(obj: IDeleteCommentRequest, context: PerRequestContext): Promise<ValidationResult<IDeleteCommentRequest>> {
  const transaction = context.transaction as Knex.Transaction;
  const commentRepository = new PostCommentsRepository(transaction);
  return <ValidationResult<IDeleteCommentRequest>>{
    commentId: await validateCommentId(obj, context, commentRepository)
  }
}