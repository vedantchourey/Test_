import PlatformResponse from './platform-response';
import frontEndConfig from '../../utils/config/front-end-config';
import { get } from '../fetch-api-wrapper';

export async function getAllPlatforms(): Promise<PlatformResponse[]> {
  const response = await get(frontEndConfig.noobStormServices.platforms.searchUrl);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
}
