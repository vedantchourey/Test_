import { frontendSupabase } from '../services/supabase-frontend-service';

export function downloadImage(bucket: string, filename: string): Promise<{ data: Blob | null; error: Error | null }> {
  return frontendSupabase.storage
                         .from(bucket)
                         .download(filename)
}


export function uploadImage(bucket: string, filename: string, file: File){
  return frontendSupabase.storage
                         .from(bucket)
                         .upload(filename, file)

}
