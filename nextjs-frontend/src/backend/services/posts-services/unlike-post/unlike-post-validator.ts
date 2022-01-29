import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { isNullOrEmptyString, isUUID, isObjectHasProperty } from '../../../../common/utils/validation/validator';
import { IUnlikePostRequest } from './i-unlike-post';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { PostLikesRepository } from '../../database/repositories/post-likes-repository';


async function validatePostId(post: IUnlikePostRequest, postsRepository: PostsRepository) {
    if (isNullOrEmptyString(post.postId)) return 'Post id is missing';
    if (!isUUID(post.postId)) return 'Invalid post id';
    const postData = await postsRepository.getPostById(post.postId) || {};
    if (!('id' in postData)) return 'Invalid post id';
}

async function validateIsAlreadyLiked(post: IUnlikePostRequest, context: PerRequestContext, postLikesRepository: PostLikesRepository) {
    const isLiked = await postLikesRepository.isLiked(post.postId, context.user?.id!);
    /* Validate if post already liked */
    if (!isObjectHasProperty(isLiked, 'id')) return 'Post not liked';
}

export async function validateRequest(post: IUnlikePostRequest, context: PerRequestContext) {
    const postsRepository = new PostsRepository(context.transaction!);
    const postLikesRepository = new PostLikesRepository(context.transaction!);

    return {
        postId: await validatePostId(post, postsRepository),
        isAlreadyLiked: await validateIsAlreadyLiked(post, context, postLikesRepository)
    }
}