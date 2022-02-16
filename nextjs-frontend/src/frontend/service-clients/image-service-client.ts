import { frontendSupabase } from '../services/supabase-frontend-service';
import UrlBuilder from '../../common/utils/url-builder';
import { v4 } from 'uuid';

export function downloadImage(bucket: string, filename: string, bustCache = false): Promise<{ data: Blob | null; error: Error | null }> {
  const url = bustCache ? new UrlBuilder(filename).addQueryParam('cacheBustId', v4())
                                                  .build() : filename;
  return frontendSupabase.storage
                         .from(bucket)
                         .download(url)
}

export function getImageSignedUrl(bucket: string, filename: string):Promise<{signedURL :string | null; error : Error | null}>{
  return frontendSupabase.storage.from(bucket).createSignedUrl(filename,60);
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
