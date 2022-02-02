import { ICreatePostRequest } from './i-create-post';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { validatePost } from './create-post-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';

interface ICreatePostResponse {
    message: string
}

export async function createPost(req: ICreatePostRequest, context: PerRequestContext) {
    const errors = await validatePost(req, context);
    if (isThereAnyError(errors)) return { errors: errors }
    const repository = new PostsRepository(context.transaction!);
    await repository.createPost({ ...req, postedBy: context.user?.id! });
    const res: ICreatePostResponse = { message: 'Post created' };
    return { data: res }
}