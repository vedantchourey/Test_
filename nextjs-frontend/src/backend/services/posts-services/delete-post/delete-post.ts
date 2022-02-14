import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { IDeletePostResponse } from './i-delete-post';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { ServiceResponse } from '../../common/contracts/service-response';
import { Knex } from 'knex';


<<<<<<< HEAD
const deletePost = async (req: IDeletePostRequest, context: PerRequestContext) => {
  const errors = await ValidateDeletePost(req, context);
  if (isThereAnyError(errors)) return { errors: errors };
  const repository = new PostsRepository(context.transaction!);
  await repository.deletePost(req.postId as string);
  const res: IDeletePostResponse = { message: 'Post deleted' };
  return { data: res };
}

export {
  deletePost
}
=======
export const deletePost = async (context: PerRequestContext): Promise<ServiceResponse<unknown, IDeletePostResponse>> => {
  const repository = new PostsRepository(context.transaction as Knex.Transaction);
  await repository.deletePost(context.getParamValue('postId') as string);
  return {data: {message: 'Post deleted'}};
}
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
