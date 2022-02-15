import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { IBlockedUser } from '../models/i-blocked-user';

export class BlockedUserRepository extends BaseRepository<IBlockedUser> {

  constructor(transaction: Knex.Transaction) {
    super(transaction, 'blocked_users');
  }

  async addBlockUser(user: IBlockedUser): Promise<string> {
    const createdItems = await this.entities()
        .insert(user, [
          'id',
          'blockedUser',
          'blockedBy',
          'createdAt'
        ]);
    return createdItems[0];
  }

  async getBlockedUserById(blockedBy: string, user: string): Promise<IBlockedUser | undefined> {
    return await this.entities()
        .select('id')
        .select('blockedBy')
        .select('blockedUser')
        .select('createdAt')
        .where({ blockedBy: blockedBy, blockedUser: user })
        .first();
  }

  async unblockUser(blockedBy: string, user: string): Promise<number> {
    return this.entities()
        .where({
          blockedBy: blockedBy,
          blockedUser: user
        })
        .del();
  }
}