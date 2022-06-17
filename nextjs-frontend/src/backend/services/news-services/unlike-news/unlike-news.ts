import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { NewsLikesRepository } from '../../database/repositories/news-like-repository';
import { ServiceResponse } from '../../common/contracts/service-response';
import { Knex } from 'knex';

export const unlikeNews = async (req: any, context: PerRequestContext): Promise<ServiceResponse<unknown, { message: string }>> => {
  const repository = new NewsLikesRepository(context.transaction as Knex.Transaction);
  const newsId = req?.newsId as string;
  await repository.deleteLike({ newsId: newsId, likedBy: context.user?.id as string })
  return {
    data: { message: "News unliked" }
  }
}
