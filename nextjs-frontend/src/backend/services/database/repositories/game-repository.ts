import { BaseRepository } from "./base-repository";
import { IGame } from "../models/i-game";
import { Knex } from "knex";

export class GameRepository extends BaseRepository<IGame> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, "games");
  }

  getGameById(id: string): Promise<IGame> {
    return this.entities()
      .select("id")
      .select("code")
      .select("displayName")
      .where({ id: id })
      .first();
  }
  getGamesPlatform(): Promise<any> {
    return this.entities()
      .select("games.displayName as gameName")
      .select("games.id as gameId")
      .select("platforms.displayName as platformName")
      .select("platforms.id as platformId")
      .leftJoin("game_platforms", "games.id", "game_platforms.gameId")
      .leftJoin("platforms", "platforms.id", "game_platforms.platformId");
  }
}
