import { ICreatePostRequest, ICreatePostResponse, IPostsResponse } from './i-create-post';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../../database/repositories/posts-repository';
// import { validatePost } from './create-post-validator';
// import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';
import { getLinkPreview } from '../../../../common/url-preview/url-preview';
import { CrudRepository } from '../../database/repositories/crud-repository';
import { IProfile } from '../../database/models/i-profile';
import { IPostsMentions } from '../../database/models/i-post-mentions';
import { INotifications } from '../../database/models/i-notifications';
import { addNotifications } from '../../notifications-service';
// import { CrudRepository } from '../../database/repositories/crud-repository';
// import { IReporedPost } from '../../database/models/i-reported-post';
// import { TABLE_NAMES } from '../../../../models/constants';

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

 const addPostInTagedUser = async (
   connection: Knex,
   post_id: string,
   user_id: string,
   mention_by: string
 ): Promise<any> => {
   const postsMentionsRepo = new CrudRepository<IPostsMentions>(
     connection as Knex,
     "posts_mentions"
   );
   return await postsMentionsRepo.create({
     post_id,
     user_id,
     mention_by,
   });
 };


export async function createPost(req: ICreatePostRequest, context: PerRequestContext): Promise<ServiceResponse<Partial<ICreatePostRequest>, ICreatePostResponse>> {
  const repository = new PostsRepository(context.transaction as Knex.Transaction);

  const userRepo = new CrudRepository<IProfile>(
    context.knexConnection as Knex,
    "profiles"
  );

  const findMentions = req.postContent.split(" ").filter((s) => s[0] === "@");

  const userIdBatchResponse = await Promise.all(
    findMentions.map((u: string) =>
      userRepo.find({ username: u.replace("@", "") }))
  );

  const userIds = userIdBatchResponse
    .filter((i) => i.length > 0)
    .map((u) => u[0].id)
    .filter((i) => i !== context.user?.id);

  const regex = /\bhttps?:\/\/\S+/gi;
  const urls = req.postContent.match(regex);
  if(urls && urls.length){
    const data = await getLinkPreview(urls[0]) as PreviewResponse;
    const postId = await repository.createPost({
      postType:'url',
      postUrl: urls[0],
      urlPostTitle: data.title,
      postContent: req.postContent,
      postImgUrl:data.images.length ? data.images[0] : data.favicons[0], 
      postedBy: context.user?.id as string
    });

    const createdPost = await repository.getPostById(postId as string);

   

    const {updatedAt, createdAt, username, avatarUrl, postType, postContent, postImgUrl, postUrl, urlPostTitle, id} = createdPost as IPostsResponse;

    await Promise.all(
      userIds.map((uId) =>
        addPostInTagedUser(
          context.knexConnection as Knex,
          id,
          uId,
          context.user?.id as string
        ))
    );
    
    
    const notification: INotifications[] = userIds.map((uId) => ({
      type: "MENTION_NOTIFICATION",
      user_id: uId,
      is_action_required: false,
      sent_by: context.user?.id,
      data:{redirect:`/social/${postId}`},
      message: `${username} mention you in post`,
    }));
    
    await addNotifications(notification, context.transaction as Knex)
    
    return {
      data: {
        id,
        postContent,
        postImgUrl,
        postType,
        postUrl,
        urlPostTitle,
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
  
  await Promise.all(
    userIds.map((uId) =>
      addPostInTagedUser(
        context.knexConnection as Knex,
        id,
        uId,
        context.user?.id as string
      ))
  );

  const notification: INotifications[] = userIds.map((uId) => ({
    type: "MENTION_NOTIFICATION",
    user_id: uId,
    is_action_required: false,
    sent_by: context.user?.id,
    message: `${username} mention you in post`,
  }));
  
  await addNotifications(notification, context.transaction as Knex)

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

// export const reportPost = async (connection: Knex.Transaction, user: any, req: any) => {
//     new CrudRepository<IReporedPost>(connection, TABLE_NAMES.REPORTED_POST);
// }