import { BaseRepository } from './base-repository';
import { Knex } from 'knex';
import { IUser } from '../models/i-user';

export class UsersRepository extends BaseRepository<IUser> {

  constructor(transaction: Knex.Transaction) {
    super(transaction, 'auth.users');
  }

  async countUsersByEmail(email: string): Promise<number> {
    const result = await this.entities()
                             .where({email: email})
                             .count('id');
    return parseInt(result[0].count, 10);
  }

  async countUsersByUserName(username: string): Promise<number> {
    const result = await this.entities().whereRaw("(raw_user_meta_data ->> 'username') = ?", [username])
                             .count('id');
    return parseInt(result[0].count, 10);
  }
}

export const createUsersRepository = (transaction: Knex.Transaction) => new UsersRepository(transaction);
