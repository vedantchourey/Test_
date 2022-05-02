import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IBParticipants } from "../models/i-b-participant";
const keys = ["id", "tournament_id", "name"];
export class BParticipants extends BaseRepository<IBParticipants> {
  constructor(context: Knex.Transaction | Knex) {
    super(context, "b_participant");
  }

  async create(participants: IBParticipants): Promise<IBParticipants> {
    return await this.entities().insert(participants, keys)
.first();
  }

  async select(data: any): Promise<IBParticipants> {
    const result = await this.entities().select(data, keys)
.first();
    return result ? result : [];
  }

  async insert(data: any | any[]): Promise<IBParticipants | IBParticipants[]> {
    return await this.entities().insert(data, keys);
  }
}
