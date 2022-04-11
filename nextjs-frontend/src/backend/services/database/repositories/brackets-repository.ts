import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IBracket } from "../models/i-brackets";

export class BracketsRepository extends BaseRepository<IBracket> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, "brackets");
  }

  async create(tournament: IBracket): Promise<IBracket> {
    const createdItems = await this.entities().insert(tournament, ["id"]);
    return createdItems[0];
  }

  async upadte(tournament: IBracket): Promise<IBracket> {
    const updatedItems = await this.entities().update(tournament, ["id"]);
    return updatedItems[0];
  }
}
