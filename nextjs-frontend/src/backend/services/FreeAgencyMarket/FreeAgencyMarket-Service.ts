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
import { ITeams } from "../database/models/i-teams";


export const listFreeAgencyMarket = async (
  context: PerRequestContext,
  param: any
): Promise<IFreeAgencyMarketResponse | undefined> => {
  const famRepo = new CrudRepository<IFreeAgencyMarket>(context.knexConnection as Knex, TABLE_NAMES.FREE_AGENCY_MARKET);
  const query = famRepo.knexObj()
    .join("private_profiles", "free_agency_market.user_id", "private_profiles.id")
    .join("profiles", "profiles.id", "private_profiles.id")
    .whereNot({ "free_agency_market.user_id": context.user?.id })
  if (param.gameId) query.where("game_id", param.gameId)
  if (param.platformId) query.where("platform_id", param.platformId)

  const users = await query;
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
  const existing_entry = await freeAgencyMarketRepo.find({ user_id: context.user?.id, ...req })

  if (existing_entry?.length) return getErrorObject("User entry for game id and platform id already exists");

  const teamsQ = new CrudRepository<ITeams>(context.knexConnection as Knex, TABLE_NAMES.TEAMS);
  const existingTeam = await teamsQ.knexObj().join("team_players", "team_players.team_id", "teams.id")
    .where({ "team_players.user_id": context.user?.id, "teams.game_id": req.game_id, "teams.platform_id": req.platform_id })

  if (existingTeam?.length) return getErrorObject("User already part of a team with same game id and platform id")

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
    .join("profiles", "profiles.id", "watchlist.playerId")
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

export const deleteFAMEntry = async (req: any, connection: Knex): Promise<any> => {
  const famQuery = new CrudRepository<IFreeAgencyMarket>(connection, TABLE_NAMES.FREE_AGENCY_MARKET);
  await famQuery.delete({ ...req })
}