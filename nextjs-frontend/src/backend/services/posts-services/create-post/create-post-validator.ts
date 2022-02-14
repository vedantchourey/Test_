import { ICreatePostRequest } from './i-create-post';
import { isNullOrEmptyString, isUrl, ValidationResult } from '../../../../common/utils/validation/validator';

function validatePostContent(post: ICreatePostRequest): string | undefined {
  if (isNullOrEmptyString(post.postContent)) return 'Post content is missing';
}

function validatePostImgUrl(post: ICreatePostRequest): string | undefined {
  if (isNullOrEmptyString(post.postImgUrl)) return 'Post image url is missing';
  if (!isUrl(post.postImgUrl)) return 'Post image url is invalid';
}

export async function validatePost(post: ICreatePostRequest): Promise<ValidationResult<ICreatePostRequest>> {
  return {
    postContent: validatePostContent(post),
    postImgUrl: validatePostImgUrl(post)
  }
}
