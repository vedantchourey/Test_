import { validateRequest } from './like-post-validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { ILikePostRequest } from './i-like-post';
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

export const likePost = async (req: ILikePostRequest, context: PerRequestContext): Promise<ServiceResponse<ILikePostRequest, ILikePostResponse>> => {
  const errors = await validateRequest(req, context);
  if (isThereAnyError(errors)) return {errors: errors};
  const repository = new PostLikesRepository(context.transaction as Knex.Transaction);
  const id = await repository.createLike({...req, likedBy: context.user?.id as string});
  const like = await repository.getById(id);
  const {createdAt, ...others} = like as ILike;
  return {data: {...others, createdAt: createdAt?.toISOString()} as ILikePostResponse};
}

