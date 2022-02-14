import { BaseRepository } from './base-repository';
import { IUserFollower } from '../models/i-user-followers';
import { Knex } from 'knex';

export class FollowersRepository extends BaseRepository<IUserFollower> {

  constructor(transaction: Knex.Transaction) {
    super(transaction, 'user_followers');
  }

  createUserFollower(data: IUserFollower): Promise<void> {
    return this.entities().insert(data);
  }

  async countFollowerById(id: string, user: string): Promise<number> {
    const result = await this.entities()
                             .where({
                               followerId: id,
                               userId: user
                             })
                             .count('id');
    return parseInt(result[0].count, 10);
  }

<<<<<<< HEAD
  async unfollowUser(id: string, user: string) {
    return await this.entities().where({followerId: id, userId: user})
.del()
=======
  unfollowUser(id: string, user: string): Promise<number> {
    return this.entities()
               .where({
                 followerId: id,
                 userId: user
               })
               .del()
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
  }

}
