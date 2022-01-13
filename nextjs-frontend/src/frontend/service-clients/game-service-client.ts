import { frontendSupabase } from '../services/supabase-frontend-service';
import { IGameResponse } from './messages/i-game-response';

interface IRawGamePlatforms {
  id: string;
  displayName: string;
  code: string;
  game_platforms: { platformId: string }[];
  game_maps: { displayName: string, id: string, code: string, gameId: string }[]
}

export async function getAllGames(): Promise<IGameResponse[]> {
  const values = await frontendSupabase.from('games')
                                       .select(`
                                         id,
                                         displayName,
                                         code,
                                         game_platforms(platformId)
                                       `);
  const rawGames = values.data as IRawGamePlatforms[];
  return rawGames.map(x => {
    const {game_platforms, game_maps, ...others} = x;
    const platformIds: string[] = game_platforms.map(x => x.platformId);
    return {
      ...others,
      platformIds,
      gameMaps: game_maps
    }
  });
}
