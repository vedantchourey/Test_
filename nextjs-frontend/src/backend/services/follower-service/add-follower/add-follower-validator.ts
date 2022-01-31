import { IUserFollowerRequest } from './i-add-follower';
import { ProfilesRepository } from '../../../services/database/repositories/profiles-repository';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { isNullOrEmptyString, isUUID, ValidationResult } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';
import { FollowersRepository } from '../../database/repositories/followers-repository';

async function validateFollowerId(id: Partial<IUserFollowerRequest>, profileRepository: ProfilesRepository, followerRepository: FollowersRepository, context: PerRequestContext) {
    if(isNullOrEmptyString(id.followerId)) return 'Follower id is missing';
    if(!isUUID(id.followerId)) return 'Invalid follower id';
    if((await profileRepository.countUserById(id.followerId as string)) === 0) return 'User is not available';
    if((await followerRepository.countFollowerById(id.followerId as string, context.user?.id!))) return 'Already following'
}

export async function ValidateFollowing(obj: Partial<IUserFollowerRequest>, context: PerRequestContext): Promise<ValidationResult<IUserFollowerRequest>> {
    const transaction = context.transaction as Knex.Transaction;
    const repository = new ProfilesRepository(transaction);
    const followerRepository = new FollowersRepository(transaction);
    return <ValidationResult<IUserFollowerRequest>>{
        followerId: await validateFollowerId(obj, repository, followerRepository, context),
    }
}
