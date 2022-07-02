import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { NewsRepository } from '../../database/repositories/news-repository';
import { NewsLikesRepository } from '../../database/repositories/news-like-repository';
import { ServiceResponse } from '../../common/contracts/service-response';
import { Knex } from 'knex';

export const newsDetail = async (req: any, context: PerRequestContext): Promise<ServiceResponse<unknown, any>> => {
  const repository = new NewsRepository(context.transaction as Knex.Transaction);
  const Likerepository = new NewsLikesRepository(context.transaction as Knex.Transaction);
  const newsId = req?.newsId as string;
  const count = await Likerepository.likeCount({ newsId: newsId })
  var detail = await repository.getNewsUsingId(newsId)
  
  detail.likeCount = count.length ? count[0].count : "0"
  return {
    data: detail
  }
}