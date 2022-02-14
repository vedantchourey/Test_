import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { IDeleteResponse } from './i-delete-comment';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';


<<<<<<< HEAD
const deleteComment = async (req: IDeleteCommentRequest, context: PerRequestContext) => {
  const errors = await ValidateDeleteComment(req, context);
  if (isThereAnyError(errors)) return { errors: errors };
  const repository = new PostCommentsRepository(context.transaction!);
  const data = await repository.deleteComment(req.commentId, context.user?.id! as string);
  console.log(data)
  const res: IDeleteResponse = { message: 'Comment deleted' };
  return { data: res };
}

export {
  deleteComment
}
=======
export const deleteComment = async (context: PerRequestContext): Promise<ServiceResponse<unknown, IDeleteResponse>> => {
  const repository = new PostCommentsRepository(context.transaction as Knex.Transaction);
  await repository.deleteComment(context.getParamValue('commentId') as string, context.user?.id);
  return {data: {message: 'Comment deleted'}};
}

>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
