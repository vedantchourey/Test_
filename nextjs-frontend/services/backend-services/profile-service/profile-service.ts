import { ServiceResponse } from '../common/contracts/service-response';
import UserProfileResponse from '../../front-end-services/user-profile-response';
import { getProfileById, updateAvatar, updateProfileBackground } from '../database/repositories/profiles-repository';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-handler-factory';
import { ProfileImageTypes } from './profile-image-types';
import { UpdateProfileImageRequest } from './update-profile-image-request';
import { backendSupabase } from '../common/supabase-backend-client';
import { Profile } from '../database/models/profile';

async function handleAvatarUpdate(userId: string, request: UpdateProfileImageRequest, userProfile: Profile) {
  await updateAvatar(userId, request.url);
  if (userProfile.avatarUrl == null) return;
  await backendSupabase.storage.from('resources').remove([userProfile.avatarUrl]);
}

async function handleBackgroundImageUpdate(userId: string, request: UpdateProfileImageRequest, userProfile: Profile) {
  await updateProfileBackground(userId, request.url);
  if (userProfile.profileBackgroundImageUrl == null) return;
  await backendSupabase.storage.from('resources').remove([userProfile.profileBackgroundImageUrl]);
}

export async function updateProfileImage(request: UpdateProfileImageRequest, context: PerRequestContext): Promise<ServiceResponse<UpdateProfileImageRequest, UserProfileResponse>> {
  const userId = context!.user!.id;
  const userProfile = await getProfileById(userId);
  if (userProfile == null) return {errors: {apiError: {message: 'Could not find profile.', status: 404}}}
  if (request.imageType === ProfileImageTypes.avatar) await handleAvatarUpdate(userId, request, userProfile);
  if (request.imageType === ProfileImageTypes.background) await handleBackgroundImageUpdate(userId, request, userProfile);
  return {data: await getProfileById(userId)};
}
