import { ICreateCommentRequest } from './i-create-comment';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { validateRequest } from './create-comment-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';

export async function createComment(req: ICreateCommentRequest, context: PerRequestContext) {
    const errors = await validateRequest(req, context);
    if (isThereAnyError(errors)) return { errors };
    const repository = new PostCommentsRepository(context.transaction!);
    await repository.createComment({ ...req, commentBy: context.user?.id! });
    return { data: { message: 'Post Created' } }
}