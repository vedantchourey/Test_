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
import { IEloRating } from "../database/models/i-elo-rating";

const fetchEloRating = async (
  context: PerRequestContext,
  data: any
): Promise<any> => {
  const famRepo = new CrudRepository<IEloRating>(
    context.knexConnection as Knex,
    TABLE_NAMES.ELO_RATING
  );
  const eloRatingHistoryRepo = new CrudRepository<IEloRating>(
    context.knexConnection as Knex,
    TABLE_NAMES.ELO_RATING_HISTORY
  );
  const history = await eloRatingHistoryRepo
    .knexObj()
    .where("user_id", data.user_id)
    .where("game_id", data.game_id);
  const result: any = await famRepo
    .knexObj()
    .where("user_id", data.user_id)
    .where("game_id", data.game_id);
  return {
    ...data,
    lost: (history || []).filter((i: any) => parseInt(i.elo_rating) < 0).length,
    won: (history || []).filter((i: any) => parseInt(i.elo_rating) > 0).length,
    elo_rating: result[0].elo_rating,
  };
};


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
  const resultBatch = await Promise.all(
    users.map((i: any) => fetchEloRating(context, i))
  );
  return resultBatch;
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
  gameId: string;
  platformId: string;
}

export const addToWatchList = async (
  req: IAddToWatchListRequest,
  context: PerRequestContext
): Promise<IFreeAgencyMarketResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const watchListRepo = new watchlistRepository(transaction);
  const checkExisting = await watchListRepo.find({
    playerId: req.playerId,
    gameId: req.gameId,
    userId: context.user?.id || "",
  });
  if (checkExisting?.length) return getErrorObject("Already added in watchlist");

  const result = await watchListRepo.create({
    playerId: req.playerId,
    userId: context.user?.id || "",
    gameId: req.gameId,
    platformId: req.platformId,
  });
  return result;
};

export const getWatchList = async (
  context: PerRequestContext
): Promise<IFreeAgencyMarketResponse | undefined> => {
  const watchListRepo = new CrudRepository<IWatchList>(context.knexConnection as Knex, TABLE_NAMES.WATCHLIST);
  const users = await watchListRepo
    .knexObj()
    .join("private_profiles", "watchlist.playerId", "private_profiles.id")
    .join("profiles", "profiles.id", "watchlist.playerId")
    .select("*")
    .select("watchlist.id as id");
    
    const resultBatch = await Promise.all(
      users.map((i: any) =>
        fetchEloRating(context, { ...i, user_id: i.playerId, game_id: i.gameId }))
    );
    return resultBatch;
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