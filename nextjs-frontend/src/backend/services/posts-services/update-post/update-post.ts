import { IUpdatePostRequest } from './i-update-post';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { validateRequest } from './update-post-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { sanitizeObject } from '../../../../common/utils/utils';


export async function updatePost(post: IUpdatePostRequest, context: PerRequestContext) {
  const errors = await validateRequest(post, context);
  if (isThereAnyError(errors)) return { errors }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const repository = new PostsRepository(context.transaction!);

  const update = sanitizeObject(post, ['postId', 'postedBy']);

  await repository.updatePost(post.postId, { ...update, updatedAt: new Date().toISOString() });

  return {
    data: {
      message: 'Post updated'
    }
  }
}