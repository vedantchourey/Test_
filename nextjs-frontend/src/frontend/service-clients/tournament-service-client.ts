import { CreateOrEditTournamentRequest } from '../../backend/services/tournament-service/create-or-edit-tournament-request';
import { NoobPostResponse } from './messages/common-messages';
import { ITournamentResponse } from '../../backend/services/tournament-service/i-tournament-response';
import { post } from './fetch-api-wrapper';
import frontendConfig from '../utils/config/front-end-config';
import { authSession } from './auth-service-client';


export async function createTournament(tournament: CreateOrEditTournamentRequest): Promise<NoobPostResponse<CreateOrEditTournamentRequest, ITournamentResponse>> {
  const session = await authSession();
  const result = await post(frontendConfig.noobStormServices.tournament.createUrl, tournament, {'Authorization': `Bearer ${session!.access_token}`});
  const body = await result.json();
  if (result.status === 200) return body.data;
  if (result.status === 400 && body.errors.apiError == null) return {errors: body.errors, isError: true}
  throw body;
}


export async function getTournamentById(id: string) {
  const session = await authSession();

}
