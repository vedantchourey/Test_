import { post, deleteRequest, patch } from "./fetch-api-wrapper";
import frontendConfig from "../utils/config/front-end-config";
import { ICreatePostRequest } from "../../backend/services/posts-services/create-post/i-create-post";
import { IPostsResponse, ILikePostResponse, IPostCommentResponse, IPostImageUploadResponse, IDeleteCommentResponse } from "./messages/i-posts-response";
import { NoobPostResponse } from "./messages/common-messages";
import { getAuthHeader } from "../utils/headers";
import { frontendSupabase } from "../services/supabase-frontend-service";
import { ICreateCommentRequest } from "../../backend/services/posts-services/create-comment/i-create-comment";
import { sendFiles } from './fetch-api-wrapper';
import _ from "lodash";

export const getPostsByUserId = async (userid: string): Promise<IPostsResponse[]> => {
  const result = await frontendSupabase.from("posts").select(`
        id,
        postContent,
        postImgUrl,
        postOwner : profiles!fk_posts_profiles_id(id, username, avatarUrl),
        postType,
        createdAt,
        updatedAt,
        postUrl,
        urlPostTitle
  `)
    .order('createdAt', { ascending: false })
    .match({ postedBy: userid });
  if (result.error) throw result.error;
  return result.data as IPostsResponse[];
};

const getPostById =async (postId:string): Promise<IPostsResponse> => {
  const result = await frontendSupabase.from("posts").select(`
        id,
        postContent,
        postImgUrl,
        postOwner : profiles!fk_posts_profiles_id(id, username, avatarUrl),
        postType,
        createdAt,
        updatedAt,
        postUrl,
        urlPostTitle
  `)
.match({ id: postId });
  if (result.error) throw result.error;
  return result.data[0] as IPostsResponse;
}

export const getTopPosts = async (): Promise<IPostsResponse[] | undefined> => {
  try {    
    console.log('frontendSupabase -> ', frontendSupabase);
    const res = await frontendSupabase.from('post_likes').select("*");
    console.log('getTopPosts res -> ', res)
    const postsLikeList = _.groupBy(res.body, "postId");
    const listOfPost = Object.values(postsLikeList)
    const listOfTopPost = listOfPost
      .sort((a, b) => b.length - a.length)
      .slice(0, 5)
      .map((i) => i[0].postId);
    const postBatch = listOfTopPost.map((postId: string) => getPostById(postId));
    const result = await Promise.all(postBatch);    
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const createPost = async (
  request: ICreatePostRequest
): Promise<NoobPostResponse<ICreatePostRequest, IPostsResponse>> => {
  const endpoint = frontendConfig.noobStormServices.post.createUrl;
  const header = await getAuthHeader();
  const result = await post(endpoint, request, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null)
    return { errors: body.errors, isError: true };
  throw body;
};

export const uploadPostImage = async(file : File): Promise<IPostImageUploadResponse> => {
  const endpoint = frontendConfig.noobStormServices.post.postImageUploadUrl;
  const header = await getAuthHeader();
  const result = await sendFiles(endpoint, [file], header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  throw body;
}

export const checkIsPostLiked = async (payload: { userId: string | undefined; postId: string }): Promise<{ isLiked?: boolean | undefined, error?: unknown }> => {
  const result = await frontendSupabase.from('post_likes').select('id', { count: 'exact' })
    .match({
      postId: payload.postId,
      likedBy: payload.userId
    })
    .limit(1)
  if (result.error) throw result.error;
  return { isLiked: result.data.length > 0 };
}

export const getPostLikesCount = async (postId: string): Promise<{ totalLikes: number | null }> => {
  const result = await frontendSupabase.from('post_likes').select('*', { count: 'exact' })
    .match({
      postId
    })
  if (result.error) throw result.error;
  return { totalLikes: result.count };
}

export const getPostCommentsCount = async (postId: string): Promise<{ totalComments: number | null }> => {
  const result = await frontendSupabase.from('post_comments').select('*', { count: 'exact' })
    .match({
      postId
    })
  if (result.error) throw result.error;
  return { totalComments: result.count };
}

export const likePost = async (postId: string): Promise<NoobPostResponse<unknown, ILikePostResponse>> => {
  const endpoint = frontendConfig.noobStormServices.post.likePostUrl(postId);
  const header = await getAuthHeader();
  const result = await post(endpoint, null, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null)
    return { errors: body.errors, isError: true };
  throw body;
}

export const unlikePost = async (postId: string): Promise<NoobPostResponse<unknown, ILikePostResponse>> => {
  const endpoint = frontendConfig.noobStormServices.post.unlikePostUrl(postId);
  const header = await getAuthHeader();
  const result = await deleteRequest(endpoint, null, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null)
    return { errors: body.errors, isError: true };
  throw body;
}

export const createComment = async (
  payload: { postId: string; comment: string }
): Promise<NoobPostResponse<ICreateCommentRequest, IPostCommentResponse>> => {
  const endpoint = frontendConfig.noobStormServices.post.createCommentUrl(payload.postId);
  const header = await getAuthHeader();
  const result = await post(endpoint, { comment: payload.comment }, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null)
    return { errors: body.errors, isError: true };
  throw body;
}

export const getPostComments = async (postId: string): Promise<IPostCommentResponse[]> => {
  const result = await frontendSupabase.from('post_comments').select(`
    id,
    comment,
    commentOwner : profiles!fk_post_comments_profile_id(id, username, avatarUrl),
    createdAt
  `)
    .match({ postId })
    .order('createdAt', { ascending: false });
  if (result.error) throw result.error;
  return result.data;
}

export const deleteComment = async (postId: string, commentId: string): Promise<NoobPostResponse<unknown, IDeleteCommentResponse>> => {
  const endpoint = frontendConfig.noobStormServices.post.deleteCommentUrl(postId, commentId);
  const header = await getAuthHeader();
  const result = await deleteRequest(endpoint, null, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null)
    return { errors: body.errors, isError: true };
  throw body;
}

export const updatePost = async (postId: string, post:ICreatePostRequest ): Promise<NoobPostResponse<ICreatePostRequest, IPostsResponse>> => {
  const endpoint = frontendConfig.noobStormServices.post.updatePostUrl(postId);
  const header = await getAuthHeader();
  const result = await patch(endpoint, post, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null)
    return { errors: body.errors, isError: true };
  throw body;
}

export const updateComment = async (postId: string, commentId: string,comment : string): Promise<NoobPostResponse<unknown, IPostsResponse>> => {
  const endpoint = frontendConfig.noobStormServices.post.updateCommentUrl(postId, commentId);
  const header = await getAuthHeader();
  const result = await patch(endpoint, {comment}, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null)
    return { errors: body.errors, isError: true };
  throw body;
}

export const deletePost = async (postId: string): Promise<NoobPostResponse<unknown, IDeleteCommentResponse>> => {
  const endpoint = frontendConfig.noobStormServices.post.deletePostUrl(postId);
  const header = await getAuthHeader();
  const result = await deleteRequest(endpoint, null, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null)
    return { errors: body.errors, isError: true };
  throw body;
}