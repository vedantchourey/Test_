import { ICreatePostRequest } from './i-create-post';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { validatePost } from './create-post-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';
import { IPostResponse } from '../i-post-response';
import { IPost } from '../../database/models/i-post';

export async function createPost(req: ICreatePostRequest, context: PerRequestContext): Promise<ServiceResponse<ICreatePostRequest, IPostResponse>> {
  const errors = await validatePost(req);
  if (isThereAnyError(errors)) return { errors: errors }
  const repository = new PostsRepository(context.transaction as Knex.Transaction);
  const id = await repository.createPost({ ...req, postedBy: context.user?.id as string });
  const createdPost = await repository.getPostById(id as string);
  const { updatedAt, createdAt, ...others } = createdPost as IPost;
  return {
    data: {
      ...others,
      updatedAt: updatedAt?.toISOString() as string,
      createdAt: createdAt?.toISOString() as string
    } as IPostResponse
  }
}
