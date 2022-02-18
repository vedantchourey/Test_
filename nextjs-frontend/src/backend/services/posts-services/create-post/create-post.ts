import { ICreatePostRequest, ICreatePostResponse, IPostsResponse } from './i-create-post';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { validatePost } from './create-post-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';

export async function createPost(req: ICreatePostRequest, context: PerRequestContext): Promise<ServiceResponse<ICreatePostRequest, ICreatePostResponse>> {
  const errors = await validatePost(req);
  if (isThereAnyError(errors)) return {errors: errors}
  const repository = new PostsRepository(context.transaction as Knex.Transaction);
  const postId = await repository.createPost({...req, postedBy: context.user?.id as string});
  const createdPost = await repository.getPostById(postId as string);
  const {updatedAt, createdAt, username, firstName, lastName, avatarUrl, postContent, postImgUrl, id} = createdPost as IPostsResponse;
  return {
    data: {
      id,
      postContent,
      postImgUrl,
      postOwner: {
        username: username,
        firstName: firstName,
        lastName: lastName,
        avatarUrl: avatarUrl
      },
      updatedAt: updatedAt?.toISOString() as string,
      createdAt: createdAt?.toISOString() as string,
      totalComments: 0,
      totalLikes: 0,
      isLiked: false
    } as unknown as ICreatePostResponse
  }
}
