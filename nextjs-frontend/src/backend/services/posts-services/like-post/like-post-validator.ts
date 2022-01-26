import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { isNullOrEmptyString, isUUID } from '../../../../common/utils/validation/validator';
import { ILikePostRequest } from './i-like-post';
import { PostsRepository } from '../../database/repositories/posts-repository';


async function validatePostId(post: ILikePostRequest, postsRepository: PostsRepository) {
    if (isNullOrEmptyString(post.postId)) return 'Post id is missing';
    if (!isUUID(post.postId)) return 'Invalid post id';
    const postData = await postsRepository.getPostById(post.postId) || {};
    if (!('id' in postData)) return 'Invalid post id';
}

export async function validateRequest(post: ILikePostRequest, context: PerRequestContext) {
    const postsRepository = new PostsRepository(context.transaction!);
    return {
        postId: await validatePostId(post, postsRepository)
    }
}