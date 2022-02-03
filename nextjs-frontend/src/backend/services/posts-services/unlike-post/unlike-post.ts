import { validateRequest } from './unlike-post-validator';
import { IUnlikePostRequest } from './i-unlike-post';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { PostLikesRepository } from '../../database/repositories/post-likes-repository';

export const unlikePost = async (req: IUnlikePostRequest, context: PerRequestContext) => {
  const errors = await validateRequest(req, context);
  if (isThereAnyError(errors)) return { errors }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const repository = new PostLikesRepository(context.transaction!);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await repository.deleteLike({ postId: req.postId, likedBy: context.user?.id })
  return {
    data: { message: "Post unliked" }
  }
}