import { Knex } from "knex";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { watchlistRepository } from "../database/repositories/watchlist.respository";
import { freeAgencyMarketRepository } from "../database/repositories/free-agency-market.respository";
import { IFreeAgencyMarketResponse } from "./i-FreeAgencyMarket-response";
import { getErrorObject } from "../common/helper/utils.service";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IFreeAgencyMarket } from "../database/models/i-free-agency-market";
import { TABLE_NAMES } from "../../../models/constants";
import { IWatchList } from "../database/models/i-watchlist";


export const listFreeAgencyMarket = async (
  context: PerRequestContext
): Promise<IFreeAgencyMarketResponse | undefined> => {
  const famRepo = new CrudRepository<IFreeAgencyMarket>(context.knexConnection as Knex, TABLE_NAMES.FREE_AGENCY_MARKET);
  const users = await famRepo.knexObj()
    .join("private_profiles", "free_agency_market.user_id", "private_profiles.id")
  return users;
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
  const result = await freeAgencyMarketRepo.create({ ...req, user_id: context.user?.id || "" });
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
  if (checkExisting?.length) return getErrorObject("Already added in watchlist");

  const result = await watchListRepo.create({
    playerId: req.playerId,
    userId: context.user?.id || "",
  });
  return result;
};

export const getWatchList = async (
  context: PerRequestContext
): Promise<IFreeAgencyMarketResponse | undefined> => {
  const watchListRepo = new CrudRepository<IWatchList>(context.knexConnection as Knex, TABLE_NAMES.WATCHLIST);
  const users = await watchListRepo.knexObj()
    .join("private_profiles", "watchlist.playerId", "private_profiles.id")
  return users  
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
