import { BaseRepository } from './base-repository';
import { IGame } from '../models/i-game';
import { Knex } from 'knex';

export class GameRepository extends BaseRepository<IGame> {

  constructor(transaction: Knex.Transaction) {
    super(transaction, 'games');
  }

  getGameById(id: string): Promise<IGame> {
    return this.entities()
               .select('id')
               .select('code')
               .select('displayName')
               .where({id: id})
               .first()
  }
}


