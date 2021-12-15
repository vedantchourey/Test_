import { ServiceResponse } from '../common/contracts/service-response';
import UserProfileResponse from '../../front-end-services/auth/user-profile-response';
import { getProfileById, updateAvatar, updateProfileBackground } from '../database/repositories/profiles-repository';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-handler-factory';

export enum ProfileImageTypes {
  avatar = 0,
  background = 1
}

export interface UpdateProfileImageRequest {
  imageType: ProfileImageTypes;
  url: string;
}

export async function updateProfileImage(request: UpdateProfileImageRequest, context: PerRequestContext): Promise<ServiceResponse<UpdateProfileImageRequest, UserProfileResponse>> {
  const userId = context!.user!.id;
  if (request.imageType === ProfileImageTypes.avatar) await updateAvatar(userId, request.url);
  if (request.imageType === ProfileImageTypes.background) await updateProfileBackground(userId, request.url);
  const userProfile = await getProfileById(userId);
  if (userProfile == null) return {errors: {apiError: {message: 'Could not find profile.', status: 404}}}
  return {data: userProfile};
}
