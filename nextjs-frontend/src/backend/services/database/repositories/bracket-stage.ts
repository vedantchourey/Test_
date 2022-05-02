import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IBStage } from "../models/i-b-stage";

const keys = ["id", "tournament_id", "name", "type", "number", "settings"];

export class BStage extends BaseRepository<IBStage> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, "b_stage");
  }

  async create(participants: IBStage): Promise<IBStage> {
    return await this.entities().insert(participants, keys).first();
  }
}
