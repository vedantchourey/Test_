import {GameResponse} from './GameResponse';
import config from '../../utils/Config';
import {get, post} from '../FetchApiWrapper';
import {UpdateGameRequest} from './UpdateGameRequest';

export async function getAllGames(): Promise<GameResponse[]> {
  const response = await get(config.noobStormServices.games.searchUrl);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
}

export async function updateGame(id: number, request: UpdateGameRequest): Promise<GameResponse> {
  const response = await post(`${config.noobStormServices.games.updateUrl}/${id}`, request);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
}
