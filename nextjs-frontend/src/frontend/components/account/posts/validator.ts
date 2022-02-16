import { isNullOrEmptyString, ValidationResult } from "../../../../common/utils/validation/validator";
import { ICreatePostRequest } from '../../../../backend/services/posts-services/create-post/i-create-post';

function validateMessage(obj: Partial<ICreatePostRequest>): undefined | string {
  if (isNullOrEmptyString(obj.postContent)) return 'Please enter post caption';
}

export function validatePostContent(obj: Partial<ICreatePostRequest>): ValidationResult<ICreatePostRequest> {
  return {
    postContent: validateMessage(obj),
    postImgUrl: undefined
  };
}

