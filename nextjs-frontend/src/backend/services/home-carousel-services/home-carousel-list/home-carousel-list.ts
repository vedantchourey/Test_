import { ICreateHomeCarouselRequest } from "./i-home-carousel-list";
import { PerRequestContext } from '../../../utils/api-middle-ware/api-middleware-typings';
import { HomeCarouselRepository } from "../../database/repositories/home-carousel-repository"
import { Knex } from 'knex';

export const HomeCarouselList = async (
    context: PerRequestContext
    ): Promise<ICreateHomeCarouselRequest | undefined> => {
    const transaction = context.transaction as Knex.Transaction;
    const homeCarouselRepo = new HomeCarouselRepository(transaction);
    const data = homeCarouselRepo.fetch();
    return data;
}