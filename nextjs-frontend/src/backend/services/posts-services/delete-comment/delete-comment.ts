import { ValidateDeleteComment } from './delete-comment-validator';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { IDeleteResponse } from './i-delete-comment';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';


const deleteComment = async (context: PerRequestContext) => {
  const errors = await ValidateDeleteComment(context);
  if (isThereAnyError(errors)) return { errors: errors };
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const repository = new PostCommentsRepository(context.transaction!);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await repository.deleteComment(context.getParamValue('commentId') as string, context.user?.id);
  const res: IDeleteResponse = { message: 'Comment deleted' };
  return { data: res };
}

export {
  deleteComment
}
