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

<<<<<<< HEAD
const likePost = async (req: ILikePostRequest, context: PerRequestContext) => {
  const errors = await validateRequest(req, context);
  if (isThereAnyError(errors)) return { errors: errors };
  const repository = new PostLikesRepository(context.transaction!);
  await repository.createLike({ ...req, likedBy: context.user?.id! });
  const res: ILikePostResponse = { message: 'Post liked' };
  return { data: res };
}

export {
  likePost
}
=======
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
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
