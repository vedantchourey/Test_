import { ServiceResponse } from "../common/contracts/service-response";
import { PerRequestContext } from '../../utils/api-middle-ware/api-middleware-typings';
import { BlockUserRequest, BlockUserResponse } from './i-block-user';
import { BlockedUserRepository } from '../database/repositories/block-user-repository';
import { Knex } from 'knex';

export default async function blockUnblockUser(context: PerRequestContext): Promise<ServiceResponse<BlockUserRequest, BlockUserResponse>> {
  const user = context.getParamValue('userId') as string;
  const blockAction = context.getParamValue('block_action') as string;
  const repository = new BlockedUserRepository(context.transaction as Knex.Transaction);
  if(blockAction === 'block'){
    await repository.addBlockUser({blockedUser: user, blockedBy: context.user?.id as string});
    return { data: { message: "User blocked." } };
  }
  await repository.unblockUser(context.user?.id as string, user);
  return { data: { message: "User unblocked." } };
}

