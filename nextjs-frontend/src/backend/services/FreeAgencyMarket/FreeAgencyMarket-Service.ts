import { Knex } from "knex";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { UsersRepository } from "../database/repositories/users-repository";
import { watchlistRepository } from "../database/repositories/watchlist.respository";
import { IFreeAgencyMarketRequest } from "./i-FreeAgencyMarket-request";
import { IFreeAgencyMarketResponse } from "./i-FreeAgencyMarket-response";

export const listFreeAgencyMarket = async (
  context: PerRequestContext
): Promise<IFreeAgencyMarketResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const userRepo = new UsersRepository(transaction);
  const userList = await userRepo.list();
  const result = userList.map((item: any) => ({
    ...item.raw_user_meta_data,
    id: item.id,
  }));
  return result;
};

export interface IAddToWatchListRequest {
  playerId: string;
}

export const addToWatchList = async (
  req: IAddToWatchListRequest,
  context: PerRequestContext
): Promise<IFreeAgencyMarketResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const watchListRepo = new watchlistRepository(transaction);
  const result = await watchListRepo.create({
    playerId: req.playerId,
    userId: context.user?.id || "",
  });
  return result;
};

export const getWatchList = async (
  context: PerRequestContext
): Promise<IFreeAgencyMarketResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const watchListRepo = new watchlistRepository(transaction);
  const userRepo = new UsersRepository(transaction);
  const watchlist = await watchListRepo.find({
    userId: context.user?.id || "",
  });
  const resultBatch = watchlist?.map(item => userRepo.findById(item.playerId))
  const result = await Promise.all(resultBatch || []);
  return result;
};

export interface IDeleteWatchListRequest {
  id: string;
}

export const deletePlayerFromWatchList = async (
  req: IDeleteWatchListRequest,
  context: PerRequestContext
): Promise<IFreeAgencyMarketResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const watchListRepo = new watchlistRepository(transaction);
  const result = await watchListRepo.delete(req.id);

  return result;
};
