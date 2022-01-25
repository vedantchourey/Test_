import { ICreatePostRequest } from './i-posts-service';
import { isNullOrEmptyString, isUrl, isUUID } from '../../../../common/utils/validation/validator';
import { ProfilesRepository } from '../../database/repositories/profiles-repository';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';

function validatePostContent(post: ICreatePostRequest) {
    if (isNullOrEmptyString(post.postContent)) return 'Post content is missing';
}

function validatePostImgUrl(post: ICreatePostRequest) {
    if (isNullOrEmptyString(post.postImgUrl)) return 'Post image url is missing';
    if (!isUrl(post.postImgUrl)) return 'Post image url is invalid';
}

async function validatePostOwner(post: ICreatePostRequest, profilesRepository: ProfilesRepository) {
    if (isNullOrEmptyString(post.postedBy)) return 'Post owner is missing';
    if (!isUUID(post.postedBy)) return 'Invalid post owner id';
    const user = await profilesRepository.getProfileById(post.postedBy);
    if (!user?.id) return 'Invalid post owner';
}

export async function validatePost(post: ICreatePostRequest, context: PerRequestContext) {
    const profilesRepository = new ProfilesRepository(context.transaction!);
    return {
        postContent: validatePostContent(post),
        postImgUrl: validatePostImgUrl(post),
        postedBy: await validatePostOwner(post, profilesRepository)
    }
}
