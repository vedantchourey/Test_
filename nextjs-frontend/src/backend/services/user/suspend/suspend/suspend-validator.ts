import { isNullOrEmptyString, ValidationResult } from '../../../../../common/utils/validation/validator';

function validatePostContent(post: any): string | undefined {
  if (isNullOrEmptyString(post.user_id)) return 'id is missing';
}
export async function validatePost(post: any): Promise<ValidationResult<any>> {
  return {
    id: validatePostContent(post)
  }
}