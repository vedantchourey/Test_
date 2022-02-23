import frontendConfig from '../utils/config/front-end-config';
import { getAuthHeader } from '../utils/headers';
import { post } from './fetch-api-wrapper';
import { NoobPostResponse } from './messages/common-messages';
import { ISearchPeopleByUsernameResponse, ISearchRequest } from './messages/i-search';

export const searchPeopleByText = async (
  request: ISearchRequest
): Promise<NoobPostResponse<ISearchRequest, ISearchPeopleByUsernameResponse>> => {
  const endpoint = frontendConfig.noobStormServices.search.searchUser;
  const header = await getAuthHeader();
  const result = await post(endpoint, request, header);
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null)
    return { errors: body.errors, isError: true };
  throw body;
};