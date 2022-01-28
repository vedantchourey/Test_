import { IUpdatePostRequest } from './i-update-post';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { validateRequest } from './update-post-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';


export async function updatePost(post: IUpdatePostRequest, context: PerRequestContext) {
    const errors = await validateRequest(post, context);
    if (isThereAnyError(errors)) return { errors }
    const repository = new PostsRepository(context.transaction!);
    return {
        data: {
            message: 'Post updated'
        }
    }
}