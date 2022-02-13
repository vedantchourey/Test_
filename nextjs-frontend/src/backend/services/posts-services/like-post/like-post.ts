import { validateRequest } from './like-post-validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { ILikePostRequest } from './i-like-post';
import { PostLikesRepository } from '../../database/repositories/post-likes-repository';

interface ILikePostResponse {
    message: string
}

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