import { IDeletePostRequest } from './i-delete-post';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { isUUID, ValidationResult } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';

async function validatePostId(post: IDeletePostRequest, postRepository: PostsRepository, context: PerRequestContext) {
  if (!isUUID(post.postId)) return 'Invalid post id';
  const postData = await postRepository.getPostById(post.postId as string);
  if ((postData && postData.postedBy) !== context.user?.id) return 'You are not allowed to delete post';
}

export async function ValidateDeletePost(obj: IDeletePostRequest, context: PerRequestContext): Promise<ValidationResult<IDeletePostRequest>> {
  const transaction = context.transaction as Knex.Transaction;
  const commentRepository = new PostsRepository(transaction);
  return <ValidationResult<IDeletePostRequest>>{
    postId: await validatePostId(obj, commentRepository, context)
  }
}