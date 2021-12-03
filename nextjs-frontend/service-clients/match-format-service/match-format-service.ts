import {get} from '../fetch-api-wrapper';
import config from '../../utils/config';
import MatchFormatResponse from './match-format-response';

export async function getAllMatchFormats(): Promise<MatchFormatResponse[]> {
  const response = await get(config.noobStormServices.matchFormat.searchUrl);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
};
