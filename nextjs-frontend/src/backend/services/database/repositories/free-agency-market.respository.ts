import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IFreeAgencyMarket } from "../models/i-free-agency-market";
const keys = ["id", "user_id", "platform_id", "created_at", "game_id"];
export class freeAgencyMarketRepository extends BaseRepository<IFreeAgencyMarket> {
  constructor(transaction: Knex.Transaction | Knex) {
    super(transaction, "free_agency_market");
  }

  async create(transaction: IFreeAgencyMarket): Promise<IFreeAgencyMarket> {
    const createdItems = await this.entities().insert(transaction, ["id"]);
    return createdItems[0];
  }

  async fetch(): Promise<IFreeAgencyMarket[]> {
    return this.entities()
      .select(...keys);
  }

  async find(query: any): Promise<IFreeAgencyMarket[] | undefined> {
    return this.entities()
      .select(...keys)
      .where(query);
  }

  async findById(id: any): Promise<IFreeAgencyMarket | undefined> {
    const fetchItem: IFreeAgencyMarket[] = await this.entities().select(...keys).where({ id });
    return fetchItem[0]
  }

  async delete(id: string): Promise<IFreeAgencyMarket[] | undefined> {
    return this.entities()
      .where({ id })
      .delete();
  }
}
