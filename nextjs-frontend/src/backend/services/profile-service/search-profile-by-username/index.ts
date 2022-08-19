import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';
import { ProfilesRepository } from '../../database/repositories/profiles-repository';

interface ISearchProfile {
  id: string,
  username:string,
  avatarUrl: string,
  isPrivate: string
  createdAt: string
}

export async function searchUserByUsername(context: PerRequestContext): Promise<ServiceResponse<null, ISearchProfile>>{
  const repository = new ProfilesRepository(context.transaction as Knex.Transaction);
  const userName = context.getParamValue('username');
  const profile = await repository.getProfileByUsername(userName as string);
  const { id, username, avatarUrl, isPrivate, createdAt } = profile;
  return {data: {
    id,
    username,
    avatarUrl,
    isPrivate,
    createdAt
  }}
}