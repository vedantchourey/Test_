import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { IPrivateProfile } from '../models/i-private-profile';

export class PrivateProfilesRepository extends BaseRepository<IPrivateProfile> {

  constructor(transaction: Knex.Transaction) {
    super(transaction, 'private_profiles');
  }

  async createProfile(profile: IPrivateProfile): Promise<IPrivateProfile> {
    await this.entities().insert(profile)
    return profile;
  }

  async getProfileById(id: string): Promise<IPrivateProfile | undefined> {
    return this.entities()
               .select('id')
               .select('firstName')
               .select('lastName')
               .select('dateOfBirth')
               .select('countryId')
               .select('stateId')
               .select('agreeToTnc')
               .select('createdAt')
               .select('updatedAt')
               .where({id: id})
               .first();
  }
}

