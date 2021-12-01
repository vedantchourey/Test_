import {get} from '../FetchApiWrapper';
import config from '../../utils/Config';
import MatchBestOfResponse from './MatchBestOfResponse';

export async function getAllMatchBestOfs(): Promise<MatchBestOfResponse[]> {
  const response = await get(config.noobStormServices.bestOfs.searchUrl);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
};
