import { BaseRepository } from './base-repository';
import { Knex } from 'knex';

interface IMatchBestOf {
  id: string;
  code: string;
  displayName: string;
  numberOfRounds: number;
}

export class MatchBestOfRepository extends BaseRepository<IMatchBestOf> {

  constructor(transaction: Knex.Transaction,) {
    super(transaction, 'match_best_ofs');
  }

  getById(id: string): Promise<IMatchBestOf> {
    return this.entities()
               .select('id')
               .select('displayName')
               .select('code')
               .select('numberOfRounds')
               .where({id: id})
               .first();
  }
}
