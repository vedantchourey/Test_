import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';
import { ProfilesRepository } from '../../database/repositories/profiles-repository';

interface updateProfilePrivacy {
  message: string
}

export async function updatePrivateStatus(context: PerRequestContext): Promise<ServiceResponse<null, updateProfilePrivacy>>{
  const repository = new ProfilesRepository(context.transaction as Knex.Transaction);
  const isPrivate = context.getParamValue('profile_privacy_action');
  if(isPrivate === 'private'){
    await repository.toggleAccountPrivacy(context.user?.id as string, true);
    return {data: {message: 'Private account'}}
  }
  await repository.toggleAccountPrivacy(context.user?.id as string, false);
  return {data: {message: 'Public account'}}
}