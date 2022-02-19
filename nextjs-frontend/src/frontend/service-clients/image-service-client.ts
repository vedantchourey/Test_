import { frontendSupabase } from '../services/supabase-frontend-service';
import UrlBuilder from '../../common/utils/url-builder';
import { v4 } from 'uuid';
import { sendFiles } from './fetch-api-wrapper';
import { getAuthHeader } from '../utils/headers';
import { NoobPostResponse } from './messages/common-messages';
import { UploadFileRequest } from '../../backend/services/file-service/i-file-type';
import { IFileResponse } from '../../backend/services/file-service/i-file-response';
import frontendConfig from '../utils/config/front-end-config';

export function downloadImage(bucket: string, filename: string, bustCache = false): Promise<{ data: Blob | null; error: Error | null }> {
  const url = bustCache ? new UrlBuilder(filename).addQueryParam('cacheBustId', v4())
                                                  .build() : filename;
  return frontendSupabase.storage
                         .from('public')
                         .download('test.jpeg')
}

export function getImageSignedUrl(bucket: string, filename: string): Promise<{ signedURL: string | null; error: Error | null }> {
  return frontendSupabase.storage.from(bucket).createSignedUrl(filename, 60);
}


export function uploadImage(bucket: string, filename: string, file: File): Promise<{ data: { Key: string } | null; error: Error | null }> {
  return frontendSupabase.storage
                         .from('public')
                         .upload('test.jpeg', file)

}

export function updateImage(bucket: string, filename: string, file: File): Promise<{ data: { Key: string } | null; error: Error | null }> {
  return frontendSupabase.storage
                         .from('public')
                         .update('test.jpeg', file, {upsert: true});

}

export const updateAvatar = async (file: File): Promise<NoobPostResponse<UploadFileRequest, IFileResponse>> => {
  const setAvatarUrl = frontendConfig.noobStormServices.uploads.setAvatar;
  const response = await sendFiles(setAvatarUrl, [file], await getAuthHeader());
  const body = await response.json();
  if (response.status === 200) return body.data;
  if (response.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}

