import { IUpdatePostRequest } from './i-update-post';
import { isUUID, isNullOrEmptyString, isObject, isUrl, isObjectHasProperty } from '../../../../common/utils/validation/validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../../database/repositories/posts-repository';

function validatePostContent(post: IUpdatePostRequest) {
    if (isNullOrEmptyString(post.postContent)) return 'Post content is missing';
}

function validatePostImgUrl(post: IUpdatePostRequest) {
    if (isNullOrEmptyString(post.postImgUrl)) return 'Post image url is missing';
    if (!isUrl(post.postImgUrl)) return 'Post image url is invalid';
}

async function validateIsPostOwner(post: IUpdatePostRequest, context: PerRequestContext, postsRepository: PostsRepository) {
    if (isNullOrEmptyString(post.postId)) return 'Post id is missing';
    if (!isUUID(post.postId)) return 'Invalid post id';
    const postData = await postsRepository.getPostById(post.postId);
    if (!postData || !isObject(postData)) return 'Post do not exists';
    if (postData.postedBy !== context.user?.id) return 'You are not allowed to update post';
}


export async function validateRequest(post: IUpdatePostRequest, context: PerRequestContext) {
    const postsRepository = new PostsRepository(context.transaction!);

    return {
        postOwner: await validateIsPostOwner(post, context, postsRepository),
        postImgUrl: isObjectHasProperty(post, 'postImgUrl') ? validatePostImgUrl(post) : undefined,
        postContent: isObjectHasProperty(post, 'postContent') ? validatePostContent(post) : undefined
    }
}
