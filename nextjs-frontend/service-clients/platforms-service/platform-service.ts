import PlatformResponse from './platform-response';
import config from '../../utils/config';
import { get } from '../fetch-api-wrapper';

export async function getAllPlatforms(): Promise<PlatformResponse[]> {
  const response = await get(config.noobStormServices.platforms.searchUrl);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
}
