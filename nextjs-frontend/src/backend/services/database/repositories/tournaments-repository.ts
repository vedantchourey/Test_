import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { ITournament } from "../models/i-tournaments";

export class TournamentsRepository extends BaseRepository<ITournament> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, "tournamentsData");
  }

  async create(tournament: ITournament): Promise<ITournament> {
    const createdItems = await this.entities().insert(tournament, [
      "id",
      "name",
      "game",
      "startDate",
      "startTime",
      "about",
      "banner",
      "info",
      "settings",
      "bracketsMetadata",
      "streams",
      "status",
      "joinStatus",
      "createTemplateCode",
    ]);
    return createdItems[0];
  }

  async upadte(tournament: ITournament): Promise<ITournament> {
    const updatedItems = await this.entities().update(tournament, [
      "id",
      "name",
      "game",
      "startDate",
      "startTime",
      "about",
      "banner",
      "info",
      "settings",
      "bracketsMetadata",
      "streams",
      "status",
      "joinStatus",
      "createTemplateCode",
    ]);
    return updatedItems[0];
  }
}
