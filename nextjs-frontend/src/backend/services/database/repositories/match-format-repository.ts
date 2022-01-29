import { BaseRepository } from './base-repository';
import { Knex } from 'knex';

interface IMatchFormat {
  id: string;
  code: string;
  displayName: string;
}

export class MatchFormatRepository extends BaseRepository<IMatchFormat> {

  constructor(transaction: Knex.Transaction) {
    super(transaction, 'match_formats');
  }

  getById(id: string): Promise<IMatchFormat> {
    return this.entities()
               .select('id')
               .select('code')
               .select('displayName')
               .where({id: id})
               .first()
  }

}
