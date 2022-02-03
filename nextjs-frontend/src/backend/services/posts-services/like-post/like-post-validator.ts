import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { isNullOrEmptyString, isUUID } from '../../../../common/utils/validation/validator';
import { ILikePostRequest } from './i-like-post';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { PostLikesRepository } from '../../database/repositories/post-likes-repository';


async function validatePostId(post: ILikePostRequest, postsRepository: PostsRepository) {
  if (isNullOrEmptyString(post.postId)) return 'Post id is missing';
  if (!isUUID(post.postId)) return 'Invalid post id';
  const postData = await postsRepository.getPostById(post.postId) || {};
  if (!('id' in postData)) return 'Invalid post id';
}

async function validateIsAlreadyLiked(post: ILikePostRequest, context: PerRequestContext, postLikesRepository: PostLikesRepository) {
  if (isNullOrEmptyString(post.postId)) return;
  if (!isUUID(post.postId)) return;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const isLiked = await postLikesRepository.isLiked(post.postId, context.user?.id);
  if (isLiked) return 'Post already liked';
}

export async function validateRequest(post: ILikePostRequest, context: PerRequestContext) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const postsRepository = new PostsRepository(context.transaction!);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const postLikesRepository = new PostLikesRepository(context.transaction!);

  return {
    postId: await validatePostId(post, postsRepository),
    isAlreadyLiked: await validateIsAlreadyLiked(post, context, postLikesRepository)
  }
}