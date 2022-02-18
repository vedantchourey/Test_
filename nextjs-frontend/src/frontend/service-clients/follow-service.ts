import { post } from './fetch-api-wrapper';
import { getAuthHeader } from '../utils/headers';
import frontendConfig from "../utils/config/front-end-config";
import { NoobPostResponse } from './messages/common-messages';

interface IFollowRequest {
    followerId : string;
}

interface IUserFollowerResponse{
    message: string
}

const followUser = async (followerId: string):Promise<NoobPostResponse <IFollowRequest,IUserFollowerResponse> > => {
  const endpoint = frontendConfig.noobStormServices.followActions.followUser;
  const headers = await getAuthHeader();
  const result = await post(endpoint, {followerId}, headers);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}

const unFollowUser = async (followerId: string):Promise<NoobPostResponse <IFollowRequest,IUserFollowerResponse> > => {
  const endpoint = frontendConfig.noobStormServices.followActions.unFollowUser;
  const headers = await getAuthHeader();
  const result = await post(endpoint, {followerId}, headers);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}
  

export {
  followUser,
  unFollowUser
}