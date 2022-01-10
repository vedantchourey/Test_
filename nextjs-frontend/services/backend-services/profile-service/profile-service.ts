import { ServiceResponse } from '../common/contracts/service-response';
import { ProfileImageTypes } from './profile-image-types';
import { UpdateProfileImageRequest } from './update-profile-image-request';
import { backendSupabase } from '../common/supabase-backend-client';
import { IProfile } from '../database/models/i-profile';
import { createProfileRepository, ProfilesRepository } from '../database/repositories/profiles-repository';
import { Knex } from 'knex';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';

async function handleAvatarUpdate(userId: string, request: UpdateProfileImageRequest, userProfile: IProfile, profilesRepository: ProfilesRepository) {
  await profilesRepository.updateAvatar(userId, request.url);
  if (userProfile.avatarUrl == null) return;
  await backendSupabase.storage.from('resources').remove([userProfile.avatarUrl]);
}

async function handleBackgroundImageUpdate(userId: string, request: UpdateProfileImageRequest, userProfile: IProfile, profilesRepository: ProfilesRepository) {
  await profilesRepository.updateProfileBackground(userId, request.url);
  if (userProfile.profileBackgroundImageUrl == null) return;
  await backendSupabase.storage.from('resources').remove([userProfile.profileBackgroundImageUrl]);
}

export async function updateProfileImage(request: UpdateProfileImageRequest, context: PerRequestContext): Promise<ServiceResponse<UpdateProfileImageRequest, IProfile>> {
  const profilesRepository = createProfileRepository(context.transaction as Knex.Transaction);
  const userId = context!.user!.id;
  const userProfile = await profilesRepository.getProfileById(userId);
  if (userProfile == null) return {errors: {apiError: {message: 'Could not find profile.', status: 404}}}
  if (request.imageType === ProfileImageTypes.avatar) await handleAvatarUpdate(userId, request, userProfile, profilesRepository);
  if (request.imageType === ProfileImageTypes.background) await handleBackgroundImageUpdate(userId, request, userProfile, profilesRepository);
  return {data: await profilesRepository.getProfileById(userId)};
}
