import {ValidationResult } from "../../../../common/utils/validation/validator";
import { ICreatePostRequest } from '../../../../backend/services/posts-services/create-post/i-create-post';

function validateData(obj : ICreatePostRequest) :undefined | string {
  if(!obj.postContent && !obj.postImgUrl) return 'Please input something';
}

export function validatePostContent(obj: ICreatePostRequest): ValidationResult<ICreatePostRequest> {
  return {
    postContent: validateData(obj),
    postImgUrl: validateData(obj)
  };
}

