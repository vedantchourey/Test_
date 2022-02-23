import frontendConfig from '../utils/config/front-end-config';
import { getAuthHeader } from '../utils/headers';
import { post } from './fetch-api-wrapper';
import { ISearchPeopleByUsernameResponse, ISearchRequest } from './messages/i-search';

export const searchPeopleByText = async (
  request: ISearchRequest
): Promise<ISearchPeopleByUsernameResponse[]> => {
  const endpoint = frontendConfig.noobStormServices.search.searchUser;
  const header = await getAuthHeader();
  const result = await post(endpoint, request, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  throw body;
};