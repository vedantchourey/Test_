import { NoobApiService } from '../../utils/api-middle-ware/api-middleware-typings';
import { CreateOrEditTournamentRequest } from './create-or-edit-tournament-request';
import { ITournamentResponse } from './i-tournament-response';
import { validateTournament } from './create-tournament-validator';
import { isThereAnyError } from '../../../common/utils/validation/validator';
import { TournamentRepository } from '../database/repositories/tournament-repository';
import { Knex } from 'knex';

export const createTournament: NoobApiService<CreateOrEditTournamentRequest, ITournamentResponse> = async (req, context) => {
  const errors = await validateTournament(req, context);
  if (isThereAnyError(errors)) return { errors: errors };
  const repository = new TournamentRepository(context.transaction as Knex.Transaction);
  const createdTournament = await repository.create({ id: undefined, isOpenToPublic: false, ...req });
  const { id, ...others } = createdTournament;
  return { data: { id: id as string, ...others } };
}
