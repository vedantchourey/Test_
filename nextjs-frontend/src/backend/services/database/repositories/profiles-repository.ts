import { nowAsISOString } from '../../../../common/utils/date-time-utils';
import { IProfile } from '../models/i-profile';
import { Knex } from 'knex';
import { BaseRepository } from './base-repository';

export class ProfilesRepository extends BaseRepository<IProfile> {

  constructor(transaction: Knex.Transaction) {
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
               .select('firstName')
               .select('lastName')
               .select('dateOfBirth')
               .select('countryId')
               .select('stateId')
               .select('agreeToTnc')
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
}

export const createProfileRepository = (transaction: Knex.Transaction): ProfilesRepository => new ProfilesRepository(transaction);
