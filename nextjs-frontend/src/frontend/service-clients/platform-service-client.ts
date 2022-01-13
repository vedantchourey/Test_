import { frontendSupabase } from '../services/supabase-frontend-service';
import { IPlatformResponse } from './messages/i-platform-response';

export async function fetchAllPlatforms(): Promise<IPlatformResponse[]> {
  const values = await frontendSupabase.from('platforms')
                                       .select('id,displayName,code');
  return values.data as IPlatformResponse[];
}
