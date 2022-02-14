import { IUpdateCommentRequest } from './i-update-post-comment';
import { isNullOrEmptyString, ValidationResult } from '../../../../common/utils/validation/validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { Knex } from 'knex';


<<<<<<< HEAD
function validateComment(comment: IUpdateCommentRequest) {
  if (isNullOrEmptyString(comment.comment)) return 'Comment content is missing';
}

async function validateIsCommentedBy(comment: Partial<IUpdateCommentRequest>, context: PerRequestContext, commentRepository: PostCommentsRepository) {
  if (isNullOrEmptyString(comment.commentId)) return 'comment id is missing';
  if (!isUUID(comment.commentId)) return 'Invalid post id';
  const commentData = await commentRepository.getCommentById(comment.commentId as string);
  if (!commentData || !isObject(commentData)) return 'Comment do not exists';
  if (commentData.commentBy !== context.user?.id) return 'You are not allowed to update comment';
=======
function validateComment(comment: IUpdateCommentRequest): string | undefined {
  if (isNullOrEmptyString(comment.comment)) return 'Is required';
}

async function validateIsCommentedBy(context: PerRequestContext, commentRepository: PostCommentsRepository): Promise<string | undefined> {
  const commentId = context.getParamValue<string>('commentId');
  const comment = await commentRepository.getCommentById(commentId as string);
  if (comment == null) return 'Comment do not exists';
  if (comment?.commentBy !== context.user?.id) return 'You are not allowed to update comment';
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
}

export async function validateUpdateCommentRequest(comment: IUpdateCommentRequest, context: PerRequestContext): Promise<ValidationResult<IUpdateCommentRequest>> {
  const transaction = context.transaction as Knex.Transaction;
  const repository = new PostCommentsRepository(transaction);
  return <ValidationResult<IUpdateCommentRequest>>{
<<<<<<< HEAD
    commentBy: await validateIsCommentedBy(comment, context, repository),
=======
    commentBy: await validateIsCommentedBy(context, repository),
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
    comment: validateComment(comment)
  }
}
