import { ICreateCommentRequest } from './i-create-comment';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { validateRequest } from './create-comment-validator';
import { isThereAnyError } from '../../../../common/utils/validation/validator';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';

export async function createComment(req: ICreateCommentRequest, context: PerRequestContext) {
  const errors = await validateRequest(req, context);
  if (isThereAnyError(errors)) return { errors };
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const repository = new PostCommentsRepository(context.transaction!);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  console.log({ ...req, commentBy: context.user?.id, postId: context.param.postId});
  await repository.createComment({ ...req, commentBy: context.user?.id, postId: context.param.postId as string });
  return { data: { message: 'Comment created' } }
}