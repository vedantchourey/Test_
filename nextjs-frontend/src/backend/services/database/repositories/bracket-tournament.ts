import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IBTournament } from "../models/i-b-tournament";

const keys = ["id", "tournament_id", "tournament_uuid"];

export class BTournament extends BaseRepository<IBTournament> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, "b_tournament");
  }

  async create(participants: IBTournament): Promise<IBTournament> {
    return await this.entities().insert(participants, keys)
.first();
  }
  async select(data: any): Promise<IBTournament> {
    const result = await this.entities().where(data, keys)
.first();
    return result ? result : [];
  }
}
