import { BaseRepository } from './base-repository';
import { IPlatform } from '../models/i-platform';
import { Knex } from 'knex';

export class PlatformRepository extends BaseRepository<IPlatform> {

  constructor(transaction: Knex.Transaction) {
    super(transaction, 'platforms');
  }

  getById(id: string): Promise<IPlatform> {
    return this.entities()
               .select('id')
               .select('code')
               .select('displayName')
               .where({id: id})
               .first()
  }
}
