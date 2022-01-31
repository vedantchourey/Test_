import { IDeletePostRequest } from './i-delete-post';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostsRepository } from '../../database/repositories/posts-repository';
import { isUUID, ValidationResult } from '../../../../common/utils/validation/validator';
import { Knex } from 'knex';

async function validatePostId(post: IDeletePostRequest, postRepository: PostsRepository){
    if (!isUUID(post.postId)) return 'Invalid post id';
    if ((await postRepository.countPostById(post.postId as string)) === 0) return 'Post not available';
}

export async function ValidateDeletePost(obj: IDeletePostRequest, context: PerRequestContext): Promise<ValidationResult<IDeletePostRequest>>{
    const transaction = context.transaction as Knex.Transaction;
    const commentRepository = new PostsRepository(transaction);
    return <ValidationResult<IDeletePostRequest>>{
        postId: await validatePostId(obj, commentRepository)
    }
}