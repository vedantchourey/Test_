import { BaseRepository } from './base-repository';
import { Knex } from 'knex';

interface IState {
  id: number;
  isoCode: string;
  displayName: string;
  countryId: number;
}

export class StateRepository extends BaseRepository<IState> {


  constructor(transaction: Knex.Transaction) {
    super(transaction, 'states');
  }

  getStateById(id: number, countryId: number): Promise<IState | undefined> {
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



