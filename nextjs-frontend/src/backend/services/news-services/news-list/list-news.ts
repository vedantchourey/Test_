import { ICreateNewsRequest } from './i-list-news';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { NewsRepository } from '../../database/repositories/news-repository';
import { Knex } from 'knex';
import { ServiceResponse } from '../../common/contracts/service-response';

export const newsList = async (
    context: PerRequestContext
    ): Promise<ICreateNewsRequest | undefined> => {
    const transaction = context.transaction as Knex.Transaction;
    const productsRepo = new NewsRepository(transaction);
    const result = await productsRepo.fetch()
    return result;
}
