import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { isNullOrEmptyString, isUUID } from '../../../../common/utils/validation/validator';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { PostLikesRepository } from '../../database/repositories/post-likes-repository';
import { Knex } from 'knex';

interface IUnlikePostRequest {
  postId: string;
}

async function validatePostId(post: IUnlikePostRequest, postsRepository: PostsRepository): Promise<unknown> {
  if (isNullOrEmptyString(post.postId)) return 'Post id is missing';
  if (!isUUID(post.postId)) return 'Invalid post id';
  const postData = await postsRepository.getPostById(post.postId) || {};
  if (!('id' in postData)) return 'Invalid post id';
}

async function validateIsAlreadyLiked(post: IUnlikePostRequest, context: PerRequestContext, postLikesRepository: PostLikesRepository): Promise<unknown> {
  if (isNullOrEmptyString(post.postId)) return;
  if (!isUUID(post.postId)) return;

  const isLiked = await postLikesRepository.isLiked(post.postId, context.user?.id as string);
  /* Validate if post already liked */
  if (isLiked != null) return 'Post not liked';
}

export async function validateRequest(post: IUnlikePostRequest, context: PerRequestContext): Promise<unknown> {
  const postsRepository = new PostsRepository(context.transaction as Knex.Transaction);
  const postLikesRepository = new PostLikesRepository(context.transaction as Knex.Transaction);

  return {
    postId: await validatePostId(post, postsRepository),
    isAlreadyLiked: await validateIsAlreadyLiked(post, context, postLikesRepository)
  }
}