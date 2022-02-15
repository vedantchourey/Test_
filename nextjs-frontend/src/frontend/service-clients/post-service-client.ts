import { post } from "./fetch-api-wrapper";
import frontendConfig from "../utils/config/front-end-config";
import { ICreatePostRequest } from "../../backend/services/posts-services/create-post/i-create-post";
import { IPostsResponse } from "./messages/i-posts-response";
import { NoobPostResponse } from "./messages/common-messages";
import { getAuthHeader } from "../utils/headers";
import { frontendSupabase } from "../services/supabase-frontend-service";

export const getUserPosts = async (): Promise<IPostsResponse[]> => {
  const result = await frontendSupabase.from("posts").select(`
        id,
        postContent,
        postImgUrl,
        postOwner : profiles!fk_posts_profiles_id(id, username, firstName, lastName, avatarUrl),
        createdAt,
        updatedAt
  `);
  if(result.error) throw result.error;
  return result.data as IPostsResponse[];
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
