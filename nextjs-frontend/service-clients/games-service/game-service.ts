import {GameResponse} from './game-response';
import frontEndConfig from '../../utils/config/front-end-config';
import {get, post} from '../fetch-api-wrapper';
import {UpdateGameRequest} from './update-game-request';

export async function getAllGames(): Promise<GameResponse[]> {
  const response = await get(frontEndConfig.noobStormServices.games.searchUrl);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
}

export async function updateGame(id: number, request: UpdateGameRequest): Promise<GameResponse> {
  const response = await post(`${frontEndConfig.noobStormServices.games.updateUrl}/${id}`, request);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
}
