import { ICreateCommentRequest } from './i-create-comment';
import { isNullOrEmptyString, isUUID } from '../../../../common/utils/validation/validator';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';

async function validatePostId(comment: ICreateCommentRequest, postsRepository: PostsRepository) {
    if (isNullOrEmptyString(comment.postId)) return 'Post id is missing';
    if (!isUUID(comment.postId)) return 'Invalid post id';
    const postData = await postsRepository.getPostById(comment.postId) || {};
    if (!('id' in postData)) return 'Invalid post id';
}

export async function validateRequest(comment: ICreateCommentRequest, context: PerRequestContext) {
    const postsRepository = new PostsRepository(context.transaction!)
    return {
        postId: await validatePostId(comment, postsRepository)
    };
}