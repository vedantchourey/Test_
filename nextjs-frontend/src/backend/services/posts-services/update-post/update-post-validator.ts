import { IUpdatePostRequest } from './i-update-post';
import { isNullOrEmptyString, isObject, isUrl } from '../../../../common/utils/validation/validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { Knex } from 'knex';

function validatePostContent(post: IUpdatePostRequest) {
  if (isNullOrEmptyString(post.postContent)) return 'Post content is missing';
}

function validatePostImgUrl(post: IUpdatePostRequest) {
  if (isNullOrEmptyString(post.postImgUrl)) return 'Post image url is missing';
  if (!isUrl(post.postImgUrl)) return 'Post image url is invalid';
}

async function validateIsPostOwner(post: IUpdatePostRequest, context: PerRequestContext, postsRepository: PostsRepository) {
  const postId = context.getParamValue('postId') as string;
  const postData = await postsRepository.getPostById(postId);
  if (!postData || !isObject(postData)) return 'Post do not exists';
  if (postData.postedBy !== context.user?.id) return 'You are not allowed to update post';
}


export async function validateRequest(post: IUpdatePostRequest, context: PerRequestContext) {
  const postsRepository = new PostsRepository(context.transaction as Knex.Transaction);

  return {
    postOwner: await validateIsPostOwner(post, context, postsRepository),
    postImgUrl: post.postImgUrl == null ? validatePostImgUrl(post) : undefined,
    postContent: post.postContent == null ? validatePostContent(post) : undefined
  }
}
