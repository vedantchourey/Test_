import { ICreateNewsRequest } from './i-edit-news';
import { isNullOrEmptyString, ValidationResult } from '../../../../common/utils/validation/validator';

function validatePostContent(post: ICreateNewsRequest): string | undefined {
  if (isNullOrEmptyString(post.id)) return 'id is missing';
}
export async function validatePost(post: ICreateNewsRequest): Promise<ValidationResult<ICreateNewsRequest>> {
  return {
    id: validatePostContent(post)
  }
}