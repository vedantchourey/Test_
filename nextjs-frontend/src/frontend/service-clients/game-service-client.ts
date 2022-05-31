import { frontendSupabase } from "../services/supabase-frontend-service";
import { IGameResponse } from "./messages/i-game-response";
import _ from "lodash";
interface IRawGamePlatforms {
  id: string;
  displayName: string;
  code: string;
  game_platforms: { platformId: string }[];
  game_maps: {
    displayName: string;
    id: string;
    code: string;
    gameId: string;
  }[];
}

export async function getAllGames(): Promise<IGameResponse[]> {
  const values = await frontendSupabase.from("games").select(`
                                         id,
                                         displayName,
                                         code,
                                         game_platforms(platformId),
                                         game_maps!fk_game_maps_games_id(id,code,displayName,gameId)
                                       `);
  const rawGames = values.data as IRawGamePlatforms[];
  return rawGames.map((x) => {
    const { game_platforms, game_maps, ...others } = x;
    const platformIds: string[] = game_platforms.map((x) => x.platformId);
    return {
      ...others,
      platformIds,
      gameMaps: game_maps,
    };
  });
}
export async function getAllFormats(): Promise<IGameResponse[]> {
  const values = await frontendSupabase.from("tournamentsData").select(`
                                         id,
                                         settings 
                                       `)
.not( "settings", "is", "null" );
  const rawFormat = values.data as any;
  const keys = rawFormat.map((x: any) => x?.settings?.tournamentFormat);
  return _.uniq(keys);
}
