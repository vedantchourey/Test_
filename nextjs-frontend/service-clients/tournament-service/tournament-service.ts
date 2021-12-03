import {TournamentRequest} from './tournament-request';
import {get, post} from '../fetch-api-wrapper';
import config from '../../utils/config';
import {TournamentResponse} from './tournament-response';
import {PageResponse} from '../page-response';
import {TournamentPageRequest} from './tournament-page-request';
import UrlBuilder from '../../utils/url-builder';

export async function saveDraftTournament(request: TournamentRequest): Promise<TournamentResponse> {
  const response = await post(config.noobStormServices.tournament.createDraftUrl, request);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
}

export async function editTournament(request: TournamentRequest): Promise<TournamentResponse> {
  if (request.id == null) throw new Error('to update tournament must have an id');
  const baseUrl = config.noobStormServices.tournament.editUrl;
  const url = new UrlBuilder(baseUrl).addRouteParam('id', request.id)
                                     .build()
  const response = await post(url, request);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
}

export async function searchTournaments(request: TournamentPageRequest): Promise<PageResponse<TournamentResponse>> {
  const url = new UrlBuilder(config.noobStormServices.tournament.searchUrl)
    .addQueryParam('itemsPerPage', request.itemsPerPage)
    .addQueryParam('pageNumber', request.pageNumber)
    .addQueryParam('onlyShowMyTournaments', request.onlyShowMyTournaments)
    .addQueryParam('isEntryFeeRequired', request.isEntryFeeRequired)
    .addQueryParam('platformsIds', request.platformIds)
    .addQueryParam('isOpenedToPublic', request.isOpenedToPublic)
    .build();
  const response = await get(url);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  const {data, totalCount, pageNumber, itemsPerPage} = json;
  return {data, totalCount, pageNumber, itemsPerPage};
}

export async function getTournamentById(id: number): Promise<TournamentResponse> {
  const url = new UrlBuilder(config.noobStormServices.tournament.getByIdUrl)
    .addRouteParam('id', id)
    .build();
  const response = await get(url);
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
}

export async function openToPublic(id: number): Promise<TournamentResponse> {
  const url = new UrlBuilder(config.noobStormServices.tournament.openToPublicUrl)
    .addRouteParam('id', id)
    .build();
  const response = await post(url, {});
  const json = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(json));
  return json.data;
}
