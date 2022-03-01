import { ICreatePostRequest, ICreatePostResponse, IPostsResponse } from './i-create-post';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { validatePost } from './create-post-validator';
import { isThereAnyError, isUrl } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';
import { getLinkPreview } from '../../../../common/url-preview/url-preview';

interface PreviewResponse {
   url: string; 
   title: string; 
   siteName: string; 
   description: string; 
   mediaType: string; 
   contentType: string; 
   images: string[]; 
   videos: { url: string; secureUrl: string; type: string; width: string; height: string; }[]; 
   favicons: string[]; 
   error?: string; 
 }


export async function createPost(req: ICreatePostRequest, context: PerRequestContext): Promise<ServiceResponse<Partial<ICreatePostRequest>, ICreatePostResponse>> {
  const errors = await validatePost(req);
  if (isThereAnyError(errors)) return {errors: errors}
  const repository = new PostsRepository(context.transaction as Knex.Transaction);
  if(isUrl(req.postContent)){
    const data = await getLinkPreview(req.postContent) as PreviewResponse;
    const postId = await repository.createPost({
      postType:'url',
      postContent: data.title ? data.title : data.description ? data.description : req.postContent, 
      postImgUrl:data.images.length ? data.images[0] : data.favicons[0], 
      postedBy: context.user?.id as string
    });
    const createdPost = await repository.getPostById(postId as string);
    const {updatedAt, createdAt, username, avatarUrl, postType, postContent, postImgUrl, id} = createdPost as IPostsResponse;
    return {
      data: {
        id,
        postContent,
        postImgUrl,
        postType,
        postOwner: {
          username: username,
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
  const postId = await repository.createPost({postContent: req.postContent, postImgUrl:req.postImgUrl, postedBy: context.user?.id as string});
  const createdPost = await repository.getPostById(postId as string);
  const {updatedAt, createdAt, username, avatarUrl, postType, postContent, postImgUrl, id} = createdPost as IPostsResponse;
  return {
    data: {
      id,
      postContent,
      postImgUrl,
      postType,
      postOwner: {
        username: username,
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
