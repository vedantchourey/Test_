import { BaseRepository } from './base-repository';
import { IGameMap } from '../models/i-game';
import { Knex } from 'knex';

export class GameMapsRepository extends BaseRepository<IGameMap> {


  constructor(transaction: Knex.Transaction) {
    super(transaction, 'game_maps');
  }

  getForGame(gameId: string): Promise<IGameMap[]> {
    return this.entities()
               .select('displayName')
               .select('id')
               .select('code')
               .select('gameId')
               .where({gameId: gameId})
  }

}
