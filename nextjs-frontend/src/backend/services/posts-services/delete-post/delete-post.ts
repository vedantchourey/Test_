import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { IDeletePostResponse } from './i-delete-post';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { ServiceResponse } from '../../common/contracts/service-response';
import { Knex } from 'knex';


export const deletePost = async (context: PerRequestContext): Promise<ServiceResponse<unknown, IDeletePostResponse>> => {
  const repository = new PostsRepository(context.transaction as Knex.Transaction);
  await repository.deletePost(context.getParamValue('postId') as string);
  return {data: {message: 'Post deleted'}};
}
