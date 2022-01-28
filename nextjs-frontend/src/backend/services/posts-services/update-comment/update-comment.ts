import { IUpdateCommentRequest } from './i-update-post-comment';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { validateUpdateCommentRequest } from './update-post-comment-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { sanitizeObject } from '../../../../common/utils/utils';

export async function updateComment(comment: IUpdateCommentRequest, context: PerRequestContext) {
    const errors = await validateUpdateCommentRequest(comment, context);
    if (isThereAnyError(errors)) return { errors }
    const repository = new PostCommentsRepository(context.transaction!);

    // Remove unwanted fields if exists
    const update = sanitizeObject(comment, ['commentBy', 'commentId', 'postId']);
    
    await repository.updateComment(comment.commentId as string, update);

    return {
        data: {
            message: 'Comment updated'
        }
    }
}