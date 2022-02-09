import { ICreateCommentRequest } from './i-create-comment';
import { isNullOrEmptyString } from '../../../../common/utils/validation/validator';


function validateComment(comment: ICreateCommentRequest) {
  if (isNullOrEmptyString(comment.comment)) return 'Comment is missing';
}

export async function validateRequest(comment: ICreateCommentRequest) {
  return {
    comment: validateComment(comment)
  };
}
