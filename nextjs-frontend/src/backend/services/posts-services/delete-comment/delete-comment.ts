import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { IDeleteResponse } from './i-delete-comment';
import { PostCommentsRepository } from '../../database/repositories/post-comments-repository';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';


export const deleteComment = async (context: PerRequestContext): Promise<ServiceResponse<unknown, IDeleteResponse>> => {
  const repository = new PostCommentsRepository(context.transaction as Knex.Transaction);
  await repository.deleteComment(context.getParamValue('commentId') as string, context.user?.id);
  return {data: {message: 'Comment deleted'}};
}

