import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IBracket } from "../models/i-brackets";

export class BracketsRepository extends BaseRepository<IBracket> {
  constructor(transaction: Knex.Transaction | Knex) {
    super(transaction, "brackets");
  }

  async create(bracket: IBracket): Promise<IBracket> {
    const createdItems = await this.entities().insert(bracket, ["id"]);
    return createdItems[0];
  }

  async upadte(bracket: IBracket): Promise<IBracket> {
    const updatedItems = await this.entities()
      .where("id", bracket.id)
      .update(bracket, ["id"]);
    return updatedItems[0];
  }

  async findById(tournament_id: string): Promise<any> {
    const items = await this.entities().where("tournament_id", tournament_id);
    return items[0];
  }
}
