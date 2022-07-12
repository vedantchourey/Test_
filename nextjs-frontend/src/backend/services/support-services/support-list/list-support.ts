import { ICreateNewsRequest } from './i-list-news';
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { SupportRepository } from '../../database/repositories/support-repository';
import { Knex } from 'knex';

export const supportList = async (
    req: any,
    context: PerRequestContext
    ): Promise<ICreateNewsRequest | undefined> => {
    const transaction = context.transaction as Knex.Transaction;
    const supportRepo = new SupportRepository(transaction);

    const result = await supportRepo.fetch(req)
    return result;
}

export const supportUserList = async (
    context: PerRequestContext
    ): Promise<ICreateNewsRequest | undefined> => {
    const transaction = context.transaction as Knex.Transaction;
    const supportRepo = new SupportRepository(transaction);
    const result = await supportRepo.fetchUserList(context.user?.id)
    return result;
}