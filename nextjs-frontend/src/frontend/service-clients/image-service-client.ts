import { frontendSupabase } from '../services/supabase-frontend-service';
import UrlBuilder from '../../common/utils/url-builder';
import { v4 } from 'uuid';
import { sendFiles } from './fetch-api-wrapper';
import { getAuthHeader } from '../utils/headers';
import { NoobPostResponse } from './messages/common-messages';
import { UploadFileRequest } from '../../backend/services/file-service/i-upload-file-type';
import { IFileResponse } from '../../backend/services/file-service/i-file-response';
import frontendConfig from '../utils/config/front-end-config';
import { AllowedBuckets } from '../../models/constants';

export function downloadImage(bucket: AllowedBuckets, filename: string, bustCache = false): Promise<{ data: Blob | null; error: Error | null }> {
  const url = bustCache ? new UrlBuilder(filename).addQueryParam('cacheBustId', v4())
                                                  .build() : filename;
  return frontendSupabase.storage
                         .from(bucket)
                         .download(url)
}

export function getImageSignedUrl(bucket: string, filename: string): Promise<{ signedURL: string | null; error: Error | null }> {
  return frontendSupabase.storage.from(bucket).createSignedUrl(filename, 60);
}

export async function getUserProfileImage(
  id: string,
  data: object
): Promise<object> {
  const user = await frontendSupabase
    .from("profiles")
    .select("avatarUrl")
    .eq("id", id);
  if (user.error) {
    return data;
  } 
    if (user.data.length && user.data[0].avatarUrl) {
      return {
        ...data,
        publicURL: frontendSupabase.storage
          .from("public-files")
          .getPublicUrl(user.data[0].avatarUrl).publicURL,
      };
    } 
      return data;
    
  
}


export function uploadImage(bucket: string, filename: string, file: File): Promise<{ data: { Key: string } | null; error: Error | null }> {
  return frontendSupabase.storage
                         .from(bucket)
                         .upload(filename, file)

}

export function updateImage(bucket: string, filename: string, file: File): Promise<{ data: { Key: string } | null; error: Error | null }> {
  return frontendSupabase.storage
                         .from(bucket)
                         .update(filename, file, {upsert: true});

}

export const updateAvatar = async (file: File): Promise<NoobPostResponse<UploadFileRequest, IFileResponse>> => {
  const setAvatarUrl = frontendConfig.noobStormServices.uploads.setAvatar;
  const response = await sendFiles(setAvatarUrl, [file], await getAuthHeader());
  const body = await response.json();
  if (response.status === 200) return body.data;
  if (response.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}

export const updateProfileBackground = async (file: File): Promise<NoobPostResponse<UploadFileRequest, IFileResponse>> => {
  const setProfileBackground = frontendConfig.noobStormServices.uploads.setProfileBackground;
  const response = await sendFiles(setProfileBackground, [file], await getAuthHeader());
  const body = await response.json();
  if (response.status === 200) return body.data;
  if (response.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}

export function getPublicUrl(bucket: string, filename: string): { data: { publicURL: string } | null; error: Error | null; publicURL: string | null } {
  return frontendSupabase.storage.from(bucket).getPublicUrl(filename);
}
