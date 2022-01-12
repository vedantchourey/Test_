import { IGame } from '../../backend/services/database/models/i-game';
import { frontendSupabase } from '../services/supabase-frontend-service';

interface IRawGamePlatforms {
  id: string;
  displayName: string;
  code: string;
  game_platforms: { platformId: string }[];
}

export async function getAllGames(): Promise<IGame[]> {
  const values = await frontendSupabase.from('games')
                                       .select(`
                                         id,
                                         displayName,
                                         code,
                                         game_platforms(platformId)
                                       `);
  const rawGames = values.data as IRawGamePlatforms[];
  return rawGames.map(x => {
    const {game_platforms, ...others} = x;
    const platformIds: string[] = game_platforms.map(x => x.platformId);
    return {
      ...others,
      platformIds
    }
  });
}
