import { ICreateNewsRequest } from "./i-list-news";
import { PerRequestContext } from "../../../utils/api-middle-ware/api-middleware-typings";
import { SupportRepository } from "../../database/repositories/support-repository";
import { Knex } from "knex";
import { CrudRepository } from "../../database/repositories/crud-repository";
import { ISupport } from "../../database/models/i-support";

export const supportList = async (
  req: any,
  context: PerRequestContext
): Promise<ICreateNewsRequest | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const repository = new CrudRepository<ISupport>(transaction, "support");
  const result = await repository
    .knexObj()
    .join("profiles", "profiles.id", "support.user_id")
    .select("*")
    .select("support.id as id");

  return { list: result };
};

export const supportUserList = async (
  context: PerRequestContext
): Promise<ICreateNewsRequest | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const supportRepo = new SupportRepository(transaction);
  const result = await supportRepo.fetchUserList(context.user?.id);
  return result;
};
