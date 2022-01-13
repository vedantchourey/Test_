import { frontendSupabase } from '../services/supabase-frontend-service';
import { IMatchBestOfResponse } from './messages/i-match-best-of-response';

export async function fetchAllMatchBestOfs(): Promise<IMatchBestOfResponse[]> {
  const bestOfs = await frontendSupabase.from('match_best_ofs')
                                        .select('id,displayName,code,numberOfRounds');
  return bestOfs.data as IMatchBestOfResponse[];
}
