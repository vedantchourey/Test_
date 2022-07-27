import { ILikeNews } from './i-like-news'
import { isNullOrEmptyString, ValidationResult } from '../../../../common/utils/validation/validator';

function validatePostContent(data: ILikeNews): string | undefined {
  if (isNullOrEmptyString(data.commentId)) return 'id is missing';
}
export async function validatePost(data: ILikeNews): Promise<ValidationResult<ILikeNews>> {
  return {
    commentId: validatePostContent(data)
  }
}