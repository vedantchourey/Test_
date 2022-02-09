import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostLikesRepository } from '../../database/repositories/post-likes-repository';
import { ServiceResponse } from '../../common/contracts/service-response';
import { Knex } from 'knex';
import { ILike } from '../../database/models/i-like';

interface ILikePostResponse {
  id: string;
  postId: string;
  likedBy: string;
  createdAt: string;
}

export const likePost = async (context: PerRequestContext): Promise<ServiceResponse<unknown, ILikePostResponse>> => {
  const repository = new PostLikesRepository(context.transaction as Knex.Transaction);
  const postId = context.getParamValue('postId') as string;
  const id = await repository.createLike({
    likedBy: context.user?.id as string,
    postId: postId
  });
  const like = await repository.getById(id);
  const {createdAt, ...others} = like as ILike;
  return {data: {...others, createdAt: createdAt?.toISOString()} as ILikePostResponse};
}


