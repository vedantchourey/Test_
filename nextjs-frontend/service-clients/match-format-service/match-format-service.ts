import {get} from '../fetch-api-wrapper';
import frontEndConfig from '../../utils/config/front-end-config';
import MatchFormatResponse from './match-format-response';

export async function getAllMatchFormats(): Promise<MatchFormatResponse[]> {
  const response = await get(frontEndConfig.noobStormServices.matchFormat.searchUrl);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
};
