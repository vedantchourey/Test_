import { knex } from '../knex';
import { nowAsISOString } from '../../../../utils/date-time-utils';

export interface Profile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  countryId: number;
  stateId: number;
  agreeToTnc: boolean;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function createProfile(profile: Profile): Promise<Profile> {
  const nowAsString = nowAsISOString();
  const profileToCreate: Profile = {
    ...profile,
    createdAt: nowAsString,
    updatedAt: nowAsString
  };
  await knex('profiles').insert(profileToCreate)
  return profileToCreate;
}
