import { ICreateCommentRequest } from './i-create-comment';
import { isNullOrEmptyString, ValidationResult } from '../../../../common/utils/validation/validator';

<<<<<<< HEAD
async function validatePostId(comment: ICreateCommentRequest, postsRepository: PostsRepository) {
  if (isNullOrEmptyString(comment.postId)) return 'Post id is missing';
  if (!isUUID(comment.postId)) return 'Invalid post id';
  const postData = await postsRepository.getPostById(comment.postId) || {};
  if (!('id' in postData)) return 'Invalid post id';
}

function validateComment(comment: ICreateCommentRequest) {
  if (isNullOrEmptyString(comment.comment)) return 'Comment is missing';
}

export async function validateRequest(comment: ICreateCommentRequest, context: PerRequestContext) {
  const postsRepository = new PostsRepository(context.transaction!)
  return {
    postId: await validatePostId(comment, postsRepository),
    comment: validateComment(comment)
  };
}
=======

function validateComment(comment: ICreateCommentRequest): string | undefined {
  if (isNullOrEmptyString(comment.comment)) return 'Comment is missing';
}

export async function validateRequest(comment: ICreateCommentRequest): Promise<ValidationResult<ICreateCommentRequest>> {
  return {
    comment: validateComment(comment)
  };
}
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
