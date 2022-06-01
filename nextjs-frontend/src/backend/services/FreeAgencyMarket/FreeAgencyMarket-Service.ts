import { Knex } from "knex";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { UsersRepository } from "../database/repositories/users-repository";
import { watchlistRepository } from "../database/repositories/watchlist.respository";
import { freeAgencyMarketRepository } from "../database/repositories/free-agency-market.respository";
import { IFreeAgencyMarketResponse } from "./i-FreeAgencyMarket-response";
import { getErrorObject } from "../common/helper/utils.service";

const findUserWithFAM = async (
  userId: string,
  details: any,
  connection: Knex.Transaction
) => {
  const userRepo = new UsersRepository(connection);
  const userDetails = await userRepo.findById(userId);
  return {
    ...userDetails.raw_user_meta_data,
    ...details,
  };
};

export const listFreeAgencyMarket = async (
  context: PerRequestContext
): Promise<IFreeAgencyMarketResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const freeAgencyMarketRepo = new freeAgencyMarketRepository(transaction);
  const userList = await freeAgencyMarketRepo.fetch();
  const batch = userList.map(item => findUserWithFAM(item.user_id, item, transaction))
  const result = await Promise.all(batch)
  return result;
};

export interface IEnterFAMRequest {
  game_id: string;
  platform_id: string;
}

export const enterToFreeAgencyMarket = async (
  req: IEnterFAMRequest,
  context: PerRequestContext
): Promise<IFreeAgencyMarketResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const freeAgencyMarketRepo = new freeAgencyMarketRepository(transaction);
  const result = await freeAgencyMarketRepo.create({...req, user_id: context.user?.id || ""});
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
  const checkExisting = await watchListRepo.find({
    playerId: req.playerId,
    userId: context.user?.id || "",
  });
  if(checkExisting?.length)  return getErrorObject("Already added in watchlist");
  
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
  const watchlist = await watchListRepo.find({
    userId: context.user?.id || "",
  });
  const resultBatch = watchlist?.map(item => findUserWithFAM(item.playerId, item,transaction))
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
