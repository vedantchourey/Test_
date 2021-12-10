import { knex } from '../../knex';
import { StateResponse } from '../../../../../service-clients/country-service/state-response';

export function searchStatesById(id: number, countryId: number): StateResponse[] {
  return knex('states').select('*')
                       .where({id: id, countryId: countryId});
}
