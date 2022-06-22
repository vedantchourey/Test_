import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { NewsRepository } from '../../database/repositories/news-repository';
import { ServiceResponse } from '../../common/contracts/service-response';
import { Knex } from 'knex';

export const deleteNews = async (req: any, context: PerRequestContext): Promise<ServiceResponse<unknown, { message: string }>> => {
  const repository = new NewsRepository(context.transaction as Knex.Transaction);
  const newsId = req?.newsId as string;
  await repository.delete(newsId)
  return {
    data: { message: "News deleted" }
  }
}
