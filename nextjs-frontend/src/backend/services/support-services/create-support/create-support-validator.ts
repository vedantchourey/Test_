import { ICreateNewsRequest } from './i-create-support';
import { isNullOrEmptyString, ValidationResult } from '../../../../common/utils/validation/validator';

function validatePostContent(post: ICreateNewsRequest): string | undefined {
  if (isNullOrEmptyString(post.message)) return 'message is missing';
  if (isNullOrEmptyString(post.type)) return 'type is missing';
  if (isNullOrEmptyString(post.subject)) return 'subject is missing';
}
export async function validatePost(post: any): Promise<ValidationResult<any>> {
  return {
    data: validatePostContent(post)
  }
}