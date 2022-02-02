import { ValidateDeleteComment } from './delete-comment-validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { IDeleteCommentRequest , IDeleteResponse } from './i-delete-comment';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';


const deleteComment = async (req: IDeleteCommentRequest, context: PerRequestContext) => {
    const errors = await ValidateDeleteComment(req, context);
    if (isThereAnyError(errors)) return { errors: errors };
    const repository = new PostCommentsRepository(context.transaction!);
    const data = await repository.deleteComment(req.commentId, context.user?.id! as string);
    console.log(data)
    const res: IDeleteResponse = { message: 'Comment deleted' };
    return { data: res };
}

export {
    deleteComment
}