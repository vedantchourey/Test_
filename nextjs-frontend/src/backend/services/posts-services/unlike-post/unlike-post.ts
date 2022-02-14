import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostLikesRepository } from '../../database/repositories/post-likes-repository';
import { ServiceResponse } from '../../common/contracts/service-response';
import { Knex } from 'knex';

export const unlikePost = async (context: PerRequestContext): Promise<ServiceResponse<unknown, { message: string }>> => {
  const repository = new PostLikesRepository(context.transaction as Knex.Transaction);
  const postId = context.getParamValue('postId') as string;
  await repository.deleteLike({ postId: postId, likedBy: context.user?.id as string })
  return {
    data: { message: "Post unliked" }
  }
}
