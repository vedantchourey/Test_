import { ICreatePostRequest } from './i-create-post';
import { isNullOrEmptyString, isUrl, ValidationResult } from '../../../../common/utils/validation/validator';

<<<<<<< HEAD
function validatePostContent(post: ICreatePostRequest) {
  if (isNullOrEmptyString(post.postContent)) return 'Post content is missing';
}

function validatePostImgUrl(post: ICreatePostRequest) {
=======
function validatePostContent(post: ICreatePostRequest): string | undefined {
  if (isNullOrEmptyString(post.postContent)) return 'Post content is missing';
}

function validatePostImgUrl(post: ICreatePostRequest): string| undefined {
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
  if (isNullOrEmptyString(post.postImgUrl)) return 'Post image url is missing';
  if (!isUrl(post.postImgUrl)) return 'Post image url is invalid';
}

<<<<<<< HEAD
export async function validatePost(post: ICreatePostRequest, context: PerRequestContext) {
=======
export async function validatePost(post: ICreatePostRequest): Promise<ValidationResult<ICreatePostRequest>> {
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
  return {
    postContent: validatePostContent(post),
    postImgUrl: validatePostImgUrl(post)
  }
}
