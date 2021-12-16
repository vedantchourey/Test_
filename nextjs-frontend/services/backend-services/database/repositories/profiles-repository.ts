import { knex } from '../knex';
import { nowAsISOString } from '../../../../utils/date-time-utils';
import { Profile } from '../models/profile';
import { Knex } from 'knex';

const profiles = (): Knex.QueryBuilder<Profile> => {
  return knex('profiles');
};

export async function createProfile(profile: Profile): Promise<Profile> {
  await profiles().insert(profile)
  return profile;
}

export async function getProfileById(id: string): Promise<Profile | undefined> {
  const profiles = await knex('profiles').select('*').where({id: id});
  return profiles[0];
}


export async function updateAvatar(userId: string, url: string) {
  return profiles().update({avatarUrl: url, updatedAt: nowAsISOString()}).where({id: userId})
}

export async function updateProfileBackground(userId: string, url: string) {
  return profiles().update({profileBackgroundImageUrl: url, updatedAt: nowAsISOString()}).where({id: userId})
}
