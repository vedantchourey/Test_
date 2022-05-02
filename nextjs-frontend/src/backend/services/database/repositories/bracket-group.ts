import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IBGroup } from "../models/i-b-group";
const keys = ["id", "stage_id", "number"];
export class BGroup extends BaseRepository<IBGroup> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, "b_group");
  }

  async create(group: IBGroup): Promise<IBGroup> {
    return await this.entities().insert(group, keys).first();
  }
}
