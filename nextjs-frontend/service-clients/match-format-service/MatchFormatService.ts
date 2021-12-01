import {get} from '../FetchApiWrapper';
import config from '../../utils/Config';
import MatchFormatResponse from './MatchFormatResponse';

export async function getAllMatchFormats(): Promise<MatchFormatResponse[]> {
  const response = await get(config.noobStormServices.matchFormat.searchUrl);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
};
