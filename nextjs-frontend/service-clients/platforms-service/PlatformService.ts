import PlatformResponse from './PlatformResponse';
import config from '../../utils/Config';
import { get } from '../FetchApiWrapper';

export async function getAllPlatforms(): Promise<PlatformResponse[]> {
  const response = await get(config.noobStormServices.platforms.searchUrl);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
}
