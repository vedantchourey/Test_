import { knex } from '../knex';
import { CountryResponse } from '../../../../service-clients/country-service/country-response';

  export function searchCountriesById(id: number): CountryResponse[] {
  return knex('countries').select('*').where({id: id});
}
