import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { ICountry } from '../models/i-country';

export class CountryRepository extends BaseRepository<ICountry> {

  constructor(transaction: Knex.Transaction) {
    super(transaction, 'countries');
  }

  getCountryById(id: string): Promise<ICountry | undefined> {
    return this.entities()
               .select('id')
               .select('displayName')
               .select('isoCode')
               .where({id: id})
               .first();
  }
}

export const createCountryRepository = (transaction: Knex.Transaction) => new CountryRepository(transaction);



