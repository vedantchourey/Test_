import { BaseRepository } from './base-repository';
import { IUserFollower } from '../models/i-user-followers';
import { Knex } from 'knex';

export class FollowersRepository extends BaseRepository<IUserFollower> {

  constructor(transaction: Knex.Transaction) {
    super(transaction, 'user_followers');
  }

  async createUserFollower(data: IUserFollower) {
    return await this.entities().insert(data);
  }

  async countFollowerById(id: string, user: string): Promise<number> {
    const result = await this.entities().where({followerId: id, userId: user})
        .count('id');
    return parseInt(result[0].count, 10);
  }

  async unfollowUser(id: string, user: string) {
      return await this.entities().where({followerId: id, userId: user}).del()
  }
  
}
