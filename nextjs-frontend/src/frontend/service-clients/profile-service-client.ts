import { frontendSupabase } from '../services/supabase-frontend-service';
import { authenticatedUser } from './auth-service-client';
import { get, post, patch } from './fetch-api-wrapper';
import frontendConfig from '../utils/config/front-end-config';
import { NoobPostResponse } from './messages/common-messages';
import { UpdateProfileImageRequest } from '../../backend/services/profile-service/update-profile-image-request';
import { IProfileResponse, IOthersProfileResponse } from './messages/i-profile';
import { IFollowersList } from './messages/i-followers-list-response';
import { getAuthHeader } from '../utils/headers';

const imagesUrl = frontendConfig.noobStormServices.profile.profileImages;

interface IRawProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  countryId: string;
  stateId: string;
  agreeToTnc: boolean;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
  isPrivate: boolean;
  profileBackgroundImageUrl?: string,
  user_roles: { id: string, code: string }[]
}

interface IPrivatePublicProfileResponse {
  message: string,
  errors: string,
  isError: boolean
}

export async function fetchUserProfile(): Promise<IProfileResponse> {
  const user = await authenticatedUser();
  if (user == null) throw new Error('User cannot be null');
  const profiles = await frontendSupabase.from('profiles')
    .select('*,user_roles(id,code)')
    .eq('id', user.id)
    .single();
  const rawProfile = profiles.data as IRawProfile;
  const { user_roles, ...others } = rawProfile;
  const userRoles = user_roles.map((x) => x.code);
  const counterData = await getCounterMeta(others.id);
  return { ...others, userRoles, ...counterData }
}

export async function getCounterMeta(userid: string): Promise<{
  totalFollowers: number;
  totalPosts: number;
  totalFollowing: number;
}> {
  const totalFollowers = await frontendSupabase.from('user_followers').select('*', { count: 'exact' })
    .match({
      userId: userid
    });

  const totalPosts = await frontendSupabase.from('posts').select('*', { count: 'exact' })
    .match({
      postedBy: userid
    });

  const totalFollowing = await frontendSupabase.from('user_followers').select('*', { count: 'exact' })
    .match({
      followerId: userid
    });

  return {
    totalFollowers: totalFollowers.count || 0,
    totalPosts: totalPosts.count || 0,
    totalFollowing: totalFollowing.count || 0
  }
}

export async function getUserProfileByUsername(username: string): Promise<IOthersProfileResponse | {error : unknown}> {
  const searchByUsernameUrl = frontendConfig.noobStormServices.profile.searchByUsername(username);
  const headers = await getAuthHeader();
  const result = await get(searchByUsernameUrl, null, headers);
  const body = await result.json();
  if (result.status !== 200) throw result.body;
  const followerId = frontendSupabase.auth.user()?.id;
  const isFollowingRes = await frontendSupabase.from('user_followers').select('id', { count: 'exact' })
    .match({
      followerId: followerId,
      userId: body.id
    });
  const isBlockedRes = await frontendSupabase.from('blocked_users').select('id', { count: 'exact' });

  // eslint-disable-next-line no-unneeded-ternary
  const isFollowing = isFollowingRes.count ? true : false
  // eslint-disable-next-line no-unneeded-ternary
  const isBlocked = isBlockedRes.count ? true : false;
  const counterData = await getCounterMeta(body.id);
  return { ...body, ...counterData, isFollowing, isBlocked };
}

export async function updateProfileImages(request: UpdateProfileImageRequest): Promise<NoobPostResponse<UpdateProfileImageRequest, IProfileResponse>> {
  const header = await getAuthHeader();
  const result = await post(imagesUrl, request, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null) return { errors: body.errors, isError: true }
  throw body;
}

export async function setPrivateAccount(): Promise<Partial<IPrivatePublicProfileResponse>> {
  const endpoint = frontendConfig.noobStormServices.profile.privacyAction.privateProfileUrl;
  const header = await getAuthHeader();
  const result = await patch(endpoint, null, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null) return { errors: body.errors, isError: true }
  throw body;
}

export async function setPublicAccount(): Promise<Partial<IPrivatePublicProfileResponse>> {
  const endpoint = frontendConfig.noobStormServices.profile.privacyAction.publicProfileUrl;
  const header = await getAuthHeader();
  const result = await patch(endpoint, null, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null) return { errors: body.errors, isError: true }
  throw body;
}

export async function fetchUserFollowerList(userid: string): Promise<IFollowersList[]> {
  const result = await frontendSupabase.from('user_followers')
    .select(`
   follower: profiles!fk_user_followers_followerid_profiles_id(id,username,firstName,lastName)
  `)
    .match({
      userId: userid
    });
  if (result.error) throw result.body;
  return result.body;
}