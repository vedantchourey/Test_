import { ICreatePostRequest } from './i-create-post';
import { isNullOrEmptyString, ValidationResult } from '../../../../common/utils/validation/validator';

function validatePostContent(post: ICreatePostRequest): string | undefined {
  if (isNullOrEmptyString(post.postContent)) return 'Post content is missing';
}
export async function validatePost(post: ICreatePostRequest): Promise<ValidationResult<ICreatePostRequest>> {
  return {
    postContent: validatePostContent(post)
  }
}
