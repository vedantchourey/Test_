import { frontendSupabase } from '../services/supabase-frontend-service';
import { IMatchFormatResponse } from './messages/i-match-format-response';

export async function fetchAllMatchFormats(): Promise<IMatchFormatResponse[]> {
  const bestOfs = await frontendSupabase.from('match_formats')
                                        .select('id,displayName,code,peopleInEachTeam');
  return bestOfs.data as IMatchFormatResponse[];
}
