import { knexQuery } from '../database/repositories/knex-utils';
import { ICreatePostRequest } from './create-post/i-posts-service';
import { PerRequestContext } from '../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../database/repositories/posts-repository';
import { validatePost } from './create-post/create-post-validator';
import { isThereAnyError } from '../../../common/utils/validation/validator';


export async function createPost(req: ICreatePostRequest, context: PerRequestContext) {
    const errors = await validatePost(req, context);
    if (isThereAnyError(errors)) return { errors: errors }
    const repository = new PostsRepository(context.transaction!);
    await repository.createPost(req);
    return { data: { message: 'Post created' } }
}

export async function getPost() {
    const result = await knexQuery('posts');
    return { data: result }
}