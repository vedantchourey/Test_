import {get} from '../fetch-api-wrapper';
import config from '../../utils/config';
import MatchBestOfResponse from './match-best-of-response';

export async function getAllMatchBestOfs(): Promise<MatchBestOfResponse[]> {
  const response = await get(config.noobStormServices.bestOfs.searchUrl);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
};
