import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IWatchList } from "../models/i-watchlist";
const keys = ["id", "userId", "playerId", "platformId"];
export class watchlistRepository extends BaseRepository<IWatchList> {
  constructor(transaction: Knex.Transaction | Knex) {
    super(transaction, "watchlist");
  }

  async create(transaction: IWatchList): Promise<IWatchList> {
    const createdItems = await this.entities().insert(transaction, ["id"]);
    return createdItems[0];
  }

  async find(query: any): Promise<IWatchList[] | undefined> {
    return this.entities()
      .select(...keys)
      .where(query);
  }
  async delete(id: string): Promise<IWatchList[] | undefined> {
    return this.entities()
      .where({ id })
      .delete();
  }
}
