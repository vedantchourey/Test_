import { ICreateCommentRequest } from './i-create-comment';
import { isNullOrEmptyString, ValidationResult } from '../../../../common/utils/validation/validator';


function validateComment(comment: ICreateCommentRequest): string | undefined {
  if (isNullOrEmptyString(comment.comment)) return 'Comment is missing';
}

export async function validateRequest(comment: ICreateCommentRequest): Promise<ValidationResult<ICreateCommentRequest>> {
  return {
    comment: validateComment(comment)
  };
}
