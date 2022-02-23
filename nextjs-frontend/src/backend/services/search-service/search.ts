import { PerRequestContext } from '../../utils/api-middle-ware/api-middleware-typings';
import { isThereAnyError } from '../../../common/utils/validation/validator';
import { ProfilesRepository } from '../database/repositories/profiles-repository';
import { Knex } from 'knex';
import { ServiceResponse } from '../common/contracts/service-response';
import { ISearchRequest, ISearchResponse } from './i-search';
import { validateRequest } from './search-validators';

export async function searchUser(req: ISearchRequest, context: PerRequestContext): Promise<ServiceResponse<ISearchRequest, ISearchResponse>> {
  const errors = await validateRequest(req);
  if (isThereAnyError(errors)) return {errors};
  const repository = new ProfilesRepository(context.transaction as Knex.Transaction);
  const result = await repository.searchUser(req.search);
  return { data: result }
}