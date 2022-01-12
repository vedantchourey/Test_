import { BaseRepository } from './base-repository';
import { Knex } from 'knex';
import { IState } from '../models/i-state';


export class StateRepository extends BaseRepository<IState> {


  constructor(transaction: Knex.Transaction) {
    super(transaction, 'states');
  }

  getStateById(id: string, countryId: string): Promise<IState | undefined> {
    return this.entities()
               .select('id')
               .select('countryId')
               .select('displayName')
               .select('countryId')
               .where({id: id, countryId: countryId})
               .first();
  }
}


export const createStateRepository = (transaction: Knex.Transaction) => new StateRepository(transaction);



