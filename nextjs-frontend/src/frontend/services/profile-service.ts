import { frontendSupabase } from './supabase-frontend-service';
import { authenticatedUser, authSession } from './auth-service';
import { post } from '../service-clients/fetch-api-wrapper';
import frontendConfig from '../utils/config/front-end-config';
import { NoobFetchResponse } from './common-messages';
import { UpdateProfileImageRequest } from '../../backend/services/profile-service/update-profile-image-request';
import { IProfile } from '../../backend/services/database/models/i-profile';

const imagesUrl = frontendConfig.noobStormServices.profile.profileImages;

export async function fetchUserProfile(): Promise<IProfile> {
  const user = await authenticatedUser();
  const profiles = await frontendSupabase.from('profiles').select('*').eq('id', user!.id).single();
  return profiles.data as IProfile;
}

export async function updateProfileImages(request: UpdateProfileImageRequest): Promise<NoobFetchResponse<UpdateProfileImageRequest, IProfile>> {
  const session = await authSession();
  const result = await post(imagesUrl, request, {'Authorization': `Bearer ${session!.access_token}`});
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}
