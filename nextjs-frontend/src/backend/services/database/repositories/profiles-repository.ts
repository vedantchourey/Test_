import { nowAsISOString } from '../../../../common/utils/date-time-utils';
import { IProfile, ISearchUser } from '../models/i-profile';
import { Knex } from 'knex';
import { BaseRepository } from './base-repository';

export class ProfilesRepository extends BaseRepository<IProfile> {

  constructor(transaction: Knex | Knex.Transaction) {
    super(transaction, 'profiles');
  }

  async createProfile(profile: IProfile): Promise<IProfile> {
    await this.entities().insert(profile)
    return profile;
  }

  async getProfileById(id: string): Promise<IProfile | undefined> {
    return this.entities()
               .select('id')
               .select('username')
               .select('createdAt')
               .select('updatedAt')
               .select('avatarUrl')
               .select('isPrivate')
               .select('profileBackgroundImageUrl')
               .where({id: id})
               .first();
  }

  async countUserById(id: string): Promise<number> {
    const result = await this.entities().where({id: id})
        .count('id');
    return parseInt(result[0].count, 10);
  }

  async updateAvatar(userId: string, url: string): Promise<number> {
    return this.entities()
               .update({avatarUrl: url, updatedAt: nowAsISOString()})
               .where({id: userId})
  }

  async block(userId: string, value: string): Promise<number> {
    return this.entities()
               .update({isBlocked: value === "false" ? false : true, updatedAt: nowAsISOString()})
               .where({id: userId})
  }

  async suspend(userId: string, value: Date): Promise<number> {
    return this.entities()
               .update({suspended: value, updatedAt: nowAsISOString()})
               .where({id: userId})
  }

  async updateProfileBackground(userId: string, url: string): Promise<number> {
    return this.entities()
               .update({profileBackgroundImageUrl: url, updatedAt: nowAsISOString()})
               .where({id: userId})
  }

  async toggleAccountPrivacy(userId: string, isPrivate: boolean): Promise<boolean>{
    return this.entities()
      .where({id: userId})
      .update({
        isPrivate: isPrivate
      })
      .returning('isPrivate');
  }

  async searchUser(text: string): Promise<ISearchUser>{
    return this.entities()
    .distinctOn('username')
    .select('id')
    .select('username')
    .select('avatarUrl')
    .where('username', 'like', `%${text}%`)
    .limit(5)
  }

  async getProfileByUsername(username: string): Promise<ISearchUser>{
    return this.entities()
    .select('id')
    .select('username')
    .select('avatarUrl')
    .select('isPrivate')
    .where({username: username})
    .first()
  }
}

export const createProfileRepository = (transaction: Knex.Transaction): ProfilesRepository => new ProfilesRepository(transaction);
