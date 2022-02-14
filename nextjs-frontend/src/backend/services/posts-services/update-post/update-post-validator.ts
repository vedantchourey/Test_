import { IUpdatePostRequest } from './i-update-post';
import { isNullOrEmptyString, isUrl, ValidationResult } from '../../../../common/utils/validation/validator';

function validatePostContent(post: IUpdatePostRequest): string | undefined {
  if (isNullOrEmptyString(post.postContent)) return 'Post content is missing';
}

function validatePostImgUrl(post: IUpdatePostRequest): string | undefined {
  if (isNullOrEmptyString(post.postImgUrl)) return 'Post image url is missing';
  if (!isUrl(post.postImgUrl)) return 'Post image url is invalid';
}

export async function validateRequest(post: IUpdatePostRequest): Promise<ValidationResult<IUpdatePostRequest>> {
  return {
    postImgUrl: post.postImgUrl == null ? validatePostImgUrl(post) : undefined,
    postContent: post.postContent == null ? validatePostContent(post) : undefined
  }
}
