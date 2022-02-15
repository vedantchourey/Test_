import { post } from "./fetch-api-wrapper";
import frontendConfig from "../utils/config/front-end-config";
import { ICreatePostRequest } from "../../backend/services/posts-services/create-post/i-create-post";
import { IPostResponse } from "../../backend/services/posts-services/i-post-response";
import { NoobPostResponse } from "./messages/common-messages";
import { getAuthHeader } from "../utils/headers";
import { frontendSupabase } from "../services/supabase-frontend-service";

export const getUserPosts = async (): Promise<IPostResponse[]> => {
  const result = await frontendSupabase.from("posts").select("*");
  return result.data as IPostResponse[];
};

export const createPost = async (
  request: ICreatePostRequest
): Promise<NoobPostResponse<ICreatePostRequest, IPostResponse>> => {
  const endpoint = frontendConfig.noobStormServices.post.createUrl;
  const header = await getAuthHeader();
  const result = await post(endpoint, request, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null)
    return { errors: body.errors, isError: true };
  throw body;
};
