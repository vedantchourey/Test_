import { ICreateNewsRequest } from './i-create-news';
import { isNullOrEmptyString, ValidationResult } from '../../../../common/utils/validation/validator';

function validatePostContent(post: ICreateNewsRequest): string | undefined {
  if (isNullOrEmptyString(post.title)) return 'title is missing';
  if (isNullOrEmptyString(post.subtitle)) return 'subtitle is missing';
  if (isNullOrEmptyString(post.author)) return 'author is missing';
  if (isNullOrEmptyString(post.image)) return 'image is missing';
  if (isNullOrEmptyString(post.description)) return 'description is missing';
}
export async function validatePost(post: ICreateNewsRequest): Promise<ValidationResult<ICreateNewsRequest>> {
  return {
    data: validatePostContent(post)
  }
}