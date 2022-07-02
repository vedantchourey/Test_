import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { NewsLikesRepository } from '../../database/repositories/news-like-repository';
import { ServiceResponse } from '../../common/contracts/service-response';
import { Knex } from 'knex';

export const NewsLikeCount = async (req: any, context: PerRequestContext): Promise<ServiceResponse<unknown, any>> => {
  const repository = new NewsLikesRepository(context.transaction as Knex.Transaction);
  const newsId = req?.newsId as string;
  console.log(newsId);
  
  const count = await repository.likeCount({ newsId: newsId })
  var num = count.length ? count[0] : { count: "0" }
  return {
    data: num
  }
}