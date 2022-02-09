import { IUpdatePostRequest } from './i-update-post';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { validateRequest } from './update-post-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';
import { IPostResponse } from '../i-post-response';
import { IPost } from '../../database/models/i-post';

export async function updatePost(request: IUpdatePostRequest, context: PerRequestContext): Promise<ServiceResponse<IUpdatePostRequest, IPostResponse>> {
  const errors = await validateRequest(request, context);
  if (isThereAnyError(errors)) return {errors}
  const repository = new PostsRepository(context.transaction as Knex.Transaction);
  const postId = context.getParamValue('postId') as string;
  const updatedPost = {
    postImgUrl: request.postImgUrl,
    postContent: request.postContent
  };
  await repository.updatePost(postId, updatedPost);
  const updatedPostFromDb = await repository.getPostById(postId as string);
  const {updatedAt, createdAt, ...others} = updatedPostFromDb as IPost;
  return {
    data: {
      ...others,
      updatedAt: updatedAt?.toISOString() as string,
      createdAt: createdAt?.toISOString() as string
    } as IPostResponse
  }
}
