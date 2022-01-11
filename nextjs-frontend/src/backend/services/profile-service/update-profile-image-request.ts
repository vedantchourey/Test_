import { ProfileImageTypes } from './profile-image-types';

export interface UpdateProfileImageRequest {
  imageType: ProfileImageTypes;
  url: string;
}
