import { IUserFollowerRequest, IUserFollowerResponse } from './i-add-follower';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { FollowersRepository } from '../../database/repositories/followers-repository';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';


export async function followUnfollow(context: PerRequestContext): Promise<ServiceResponse<IUserFollowerRequest, IUserFollowerResponse>> {
  const followerRepository = new FollowersRepository(context.transaction as Knex.Transaction);
  const follow_action = context.getParamValue('follow_action') as string;
  const userId = context.getParamValue('userId') as string;
  if (follow_action === 'following') {
    await followerRepository.createUserFollower({ followerId: userId, userId: context.user?.id as string });
    return { data: { message: 'Following' } }
  }
  await followerRepository.unfollowUser(userId, context.user?.id as string);
  return { data: { message: 'Unfollowed' } }
}
