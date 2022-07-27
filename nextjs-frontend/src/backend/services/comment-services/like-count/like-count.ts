import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { NewsLikesRepository } from '../../database/repositories/comment-like-repository';
import { ServiceResponse } from '../../common/contracts/service-response';
import { Knex } from 'knex';

export const NewsLikeCount = async (req: any, context: PerRequestContext): Promise<ServiceResponse<unknown, any>> => {
  const repository = new NewsLikesRepository(context.transaction as Knex.Transaction);
  const commentId = req?.commentId as string;
  
  const count = await repository.likeCount({ commentId: commentId })
  const num = count.length ? count[0] : { count: "0" }
  return {
    data: num
  }
}