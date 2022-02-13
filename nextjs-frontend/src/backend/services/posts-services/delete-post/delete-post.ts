import { ValidateDeletePost } from './delete-post-validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { IDeletePostRequest, IDeletePostResponse } from './i-delete-post';
import { PostsRepository } from '../../database/repositories/posts-repository';


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