import { CountryResponse } from './country-response';
import { get } from '../fetch-api-wrapper';
import config from '../../utils/config';
import { StateResponse } from './state-response';
import UrlBuilder from '../../utils/url-builder';

export const fetchAllCountries = async (): Promise<CountryResponse[]> => {
  const response = await get(config.noobStormServices.country.searchUrl);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
}

export const getAllStates = async (countryId: number): Promise<StateResponse[]> => {
  const url = new UrlBuilder(config.noobStormServices.country.searchStatesUrl)
    .addRouteParam('id', countryId)
    .build();
  const response = await get(url);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
}
