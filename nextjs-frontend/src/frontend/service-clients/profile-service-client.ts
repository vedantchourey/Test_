import { frontendSupabase } from '../services/supabase-frontend-service';
import { authenticatedUser, authSession } from './auth-service-client';
import { post } from './fetch-api-wrapper';
import frontendConfig from '../utils/config/front-end-config';
import { NoobFetchResponse } from './messages/common-messages';
import { UpdateProfileImageRequest } from '../../backend/services/profile-service/update-profile-image-request';
import { IProfileResponse } from './messages/i-profile';

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
  const profiles = await frontendSupabase.from('profiles')
                                         .select('*,user_roles(id,code)')
                                         .eq('id', user!.id)
                                         .single();
  const rawProfile = profiles.data as IRawProfile;
  const {user_roles, ...others} = rawProfile;
  const userRoles = user_roles.map(x => x.code);
  return {...others, userRoles}
}

export async function updateProfileImages(request: UpdateProfileImageRequest): Promise<NoobFetchResponse<UpdateProfileImageRequest, IProfileResponse>> {
  const session = await authSession();
  const result = await post(imagesUrl, request, {'Authorization': `Bearer ${session!.access_token}`});
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}
