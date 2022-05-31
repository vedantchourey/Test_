import { Knex } from "knex";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { UsersRepository } from "../database/repositories/users-repository";
import { IFreeAgencyMarketRequest } from "./i-FreeAgencyMarket-request";
import { IFreeAgencyMarketResponse } from "./i-FreeAgencyMarket-response";

export const listFreeAgencyMarket = async (
  context: PerRequestContext
): Promise<IFreeAgencyMarketResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const userRepo = new UsersRepository(transaction);
  const userList = await userRepo.list();
  const result = userList.map((item: any) => item.raw_user_meta_data);
  return result;
};
