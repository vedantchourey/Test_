import { ICreatePostRequest } from './i-create-post';
import { isNullOrEmptyString, isUrl } from '../../../../common/utils/validation/validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';

function validatePostContent(post: ICreatePostRequest) {
  if (isNullOrEmptyString(post.postContent)) return 'Post content is missing';
}

function validatePostImgUrl(post: ICreatePostRequest) {
  if (isNullOrEmptyString(post.postImgUrl)) return 'Post image url is missing';
  if (!isUrl(post.postImgUrl)) return 'Post image url is invalid';
}

export async function validatePost(post: ICreatePostRequest, context: PerRequestContext) {
  return {
    postContent: validatePostContent(post),
    postImgUrl: validatePostImgUrl(post)
  }
}
