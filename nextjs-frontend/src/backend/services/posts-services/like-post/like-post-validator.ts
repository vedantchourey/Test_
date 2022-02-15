import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { isNullOrEmptyString, isUUID, ValidationResult } from '../../../../common/utils/validation/validator';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { PostLikesRepository } from '../../database/repositories/post-likes-repository';
import { Knex } from 'knex';

interface ILikePostRequest{
  postId: string;
  isAlreadyLiked? : boolean
}

async function validatePostId(post: ILikePostRequest, postsRepository: PostsRepository): Promise<string| undefined> {
  if (isNullOrEmptyString(post.postId)) return 'Post id is missing';
  if (!isUUID(post.postId)) return 'Invalid post id';
  const postData = await postsRepository.getPostById(post.postId) || {};
  if (!('id' in postData)) return 'Invalid post id';
}

async function validateIsAlreadyLiked(post: ILikePostRequest, context: PerRequestContext, postLikesRepository: PostLikesRepository): Promise<string | undefined> {
  if (isNullOrEmptyString(post.postId)) return;
  if (!isUUID(post.postId)) return;
  const isLiked = await postLikesRepository.isLiked(post.postId, context.user?.id as string);
  if (isLiked) return 'Post already liked';
}

export async function validateRequest(post: ILikePostRequest, context: PerRequestContext): Promise<ValidationResult<ILikePostRequest>> {
  const postsRepository = new PostsRepository(context.transaction as Knex.Transaction);
  const postLikesRepository = new PostLikesRepository(context.transaction as Knex.Transaction);

  return {
    postId: await validatePostId(post, postsRepository),
    isAlreadyLiked: await validateIsAlreadyLiked(post, context, postLikesRepository)
  }
}