import { CountryResponse } from './CountryResponse';
import { get } from '../FetchApiWrapper';
import config from '../../utils/Config';
import { StateResponse } from './StateResponse';
import UrlBuilder from '../../utils/UrlBuilder';

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
