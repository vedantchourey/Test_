import { frontendSupabase } from '../services/supabase-frontend-service';
import { IPlatform } from '../../backend/services/database/models/i-platform';

export async function fetchAllPlatforms(): Promise<IPlatform[]> {
  const values = await frontendSupabase.from('platforms')
                                       .select('id,displayName,code');
  return values.data as IPlatform[];
}
