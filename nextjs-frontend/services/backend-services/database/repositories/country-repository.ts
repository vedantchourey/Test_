import { Knex } from 'knex';
import { BaseRepository } from './base-repository';

interface ICountry {
  id: number;
  isoCode: string;
  displayName: string;
}

export class CountryRepository extends BaseRepository<ICountry> {

  constructor(transaction: Knex.Transaction) {
    super(transaction, 'countries');
  }

  getCountryById(id: number): Promise<ICountry | undefined> {
    return this.entities()
               .select('id')
               .select('displayName')
               .select('isoCode')
               .where({id: id})
               .first();
  }
}

export const createCountryRepository = (transaction: Knex.Transaction) => new CountryRepository(transaction);



