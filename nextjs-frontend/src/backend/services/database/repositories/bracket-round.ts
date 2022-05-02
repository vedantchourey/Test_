import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IBRound } from "../models/i-b-round";
const keys = ["id", "stage_id", "number", "group_id"];
export class BRound extends BaseRepository<IBRound> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, "b_round");
  }

  async create(group: IBRound): Promise<IBRound> {
    return await this.entities().insert(group, keys)
.first();
  }
}
