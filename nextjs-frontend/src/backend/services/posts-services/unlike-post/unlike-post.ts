import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostLikesRepository } from '../../database/repositories/post-likes-repository';
import { ServiceResponse } from '../../common/contracts/service-response';
import { Knex } from 'knex';

<<<<<<< HEAD
export const unlikePost = async (req: IUnlikePostRequest, context: PerRequestContext) => {
  const errors = await validateRequest(req, context);
  if (isThereAnyError(errors)) return { errors }
  const repository = new PostLikesRepository(context.transaction!);
  await repository.deleteLike({ postId: req.postId, likedBy: context.user?.id! })
  return {
    data: { message: "Post unliked" }
  }
}
=======
export const unlikePost = async (context: PerRequestContext): Promise<ServiceResponse<unknown, { message: string }>> => {
  const repository = new PostLikesRepository(context.transaction as Knex.Transaction);
  const postId = context.getParamValue('postId') as string;
  await repository.deleteLike({postId: postId, likedBy: context.user?.id as string})
  return {
    data: {message: "Post unliked"}
  }
}
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
