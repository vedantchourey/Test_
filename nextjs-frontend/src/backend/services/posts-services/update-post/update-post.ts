import { IUpdatePostRequest, IPostResponse, IUpdatePostResponse } from './i-update-post';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { validateRequest } from './update-post-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { PostLikesRepository } from '../../database/repositories/post-likes-repository';


export async function updatePost(request: IUpdatePostRequest, context: PerRequestContext): Promise<ServiceResponse<IUpdatePostRequest, IUpdatePostResponse>> {
  const errors = await validateRequest(request);
  if (isThereAnyError(errors)) return {errors}
  const postId = context.getParamValue('postId') as string;
  const repository = new PostsRepository(context.transaction as Knex.Transaction);
  const postCommentRepository = new PostCommentsRepository(context.transaction as Knex.Transaction);
  const postLikeRepository = new PostLikesRepository(context.transaction as Knex.Transaction);
  const updatedPost = {
    postImgUrl: request.postImgUrl,
    postContent: request.postContent
  };
  await repository.updatePost(postId, updatedPost);
  const updatedPostFromDb = await repository.getPostById(postId);
  const commentCount = await postCommentRepository.countCommentByPostId(postId);
  const likeCount = await postLikeRepository.countLikesByPostId(postId);
  const isLiked = await postLikeRepository.isLiked(postId, context.user?.id as string)
  const {updatedAt, createdAt, username, avatarUrl, postContent, postImgUrl, id} = updatedPostFromDb as IPostResponse;
  return {
    data: {
      id,
      postContent,
      postImgUrl,
      postOwner: {
        username: username,
        avatarUrl: avatarUrl
      },
      updatedAt: updatedAt?.toISOString() as string,
      createdAt: createdAt?.toISOString() as string,
      totalComments: commentCount,
      totalLikes: likeCount,
      isLiked: isLiked
    } as unknown as IUpdatePostResponse
  }
}
