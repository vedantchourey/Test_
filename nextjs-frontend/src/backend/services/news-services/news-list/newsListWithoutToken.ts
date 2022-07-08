import { ICreateNewsRequest } from './i-list-news';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { NewsRepository } from '../../database/repositories/news-repository';
import { Knex } from 'knex';

export const newsListWithoutToken = async (
    context: PerRequestContext
    ): Promise<ICreateNewsRequest | undefined> => {
    let dd: any = "news"
    const transaction = context.transaction as Knex.Transaction;
    const productsRepo = new NewsRepository(transaction);
    const result = await productsRepo.fetch()
    return result;
}
