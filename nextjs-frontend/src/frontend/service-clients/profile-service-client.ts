import { frontendSupabase } from '../services/supabase-frontend-service';
import { authenticatedUser } from './auth-service-client';
import { post } from './fetch-api-wrapper';
import frontendConfig from '../utils/config/front-end-config';
import { NoobPostResponse } from './messages/common-messages';
import { UpdateProfileImageRequest } from '../../backend/services/profile-service/update-profile-image-request';
import { IProfileResponse } from './messages/i-profile';
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
  profileBackgroundImageUrl?: string,
  user_roles: { id: string, code: string }[]
}


export async function fetchUserProfile(): Promise<IProfileResponse> {
  const user = await authenticatedUser();
  if (user == null) throw new Error('User cannot be null');
  const profiles = await frontendSupabase.from('profiles')
                                         .select('*,user_roles(id,code)')
                                         .eq('id', user.id)
                                         .single();
  const rawProfile = profiles.data as IRawProfile;
  const {user_roles, ...others} = rawProfile;
  const userRoles = user_roles.map((x) => x.code);
  return {...others, userRoles}
}

export async function updateProfileImages(request: UpdateProfileImageRequest): Promise<NoobPostResponse<UpdateProfileImageRequest, IProfileResponse>> {
  const header = await getAuthHeader();
  const result = await post(imagesUrl, request, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}
