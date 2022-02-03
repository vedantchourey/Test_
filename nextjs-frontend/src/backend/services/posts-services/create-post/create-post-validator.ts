import { ICreatePostRequest } from './i-create-post';
import { isNullOrEmptyString, isUrl } from '../../../../common/utils/validation/validator';

function validatePostContent(post: ICreatePostRequest) {
  if (isNullOrEmptyString(post.postContent)) return 'Post content is missing';
}

function validatePostImgUrl(post: ICreatePostRequest) {
  if (isNullOrEmptyString(post.postImgUrl)) return 'Post image url is missing';
  if (!isUrl(post.postImgUrl)) return 'Post image url is invalid';
}

export async function validatePost(post: ICreatePostRequest) {
  return {
    postContent: validatePostContent(post),
    postImgUrl: validatePostImgUrl(post)
  }
}
