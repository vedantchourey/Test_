import { IUserFollowerRequest } from './i-add-follower';
import { ValidateFollowing } from './add-follower-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { FollowersRepository } from '../../database/repositories/followers-repository';


export async function addFollower(req: IUserFollowerRequest, context: PerRequestContext) {
  const errors = await ValidateFollowing(req, context);
  if (isThereAnyError(errors)) return { errors };
  // eslint-disable-next-line
  const followerRepository = new FollowersRepository(context.transaction!);
  if (req.follow_action === 'following') {
    // eslint-disable-next-line
    await followerRepository.createUserFollower({ followerId: req.followerId, userId: context.user?.id! });
    return { data: { message: 'Following' } }
  }
  // eslint-disable-next-line
  await followerRepository.unfollowUser(req.followerId, context.user?.id!);
  return { data: { message: 'Unfollowing' } }


}