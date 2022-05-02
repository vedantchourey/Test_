import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IBMatch } from "../models/i-b-match";

const keys = [
  "id",
  "number",
  "stage_id",
  "group_id",
  "round_id",
  "child_count",
  "status",
  "opponent1",
  "opponent2",
];

export class b_match extends BaseRepository<IBMatch> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, "b_match");
  }

  async create(participants: IBMatch): Promise<IBMatch> {
    return await this.entities().insert(participants, keys)
.first();
  }
}
