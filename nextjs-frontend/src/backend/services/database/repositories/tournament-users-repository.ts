import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { ITournamentUsers } from "../models/i-tournament-users";

export class TournamentUsersRepository extends BaseRepository<ITournamentUsers> {
  constructor(transaction: Knex.Transaction | Knex) {
    super(transaction, "tournament_users");
  }

  async create(tournamentUsers: ITournamentUsers): Promise<ITournamentUsers> {
    const createdItems = await this.entities().insert(tournamentUsers, [
      "id",
      "userId",
      "tournamentId",
      "checkedIn",
    ]);
    return createdItems[0];
  }

  async update(
    tournametUsers: ITournamentUsers,
    where: ITournamentUsers
  ): Promise<ITournamentUsers> {
    const updatedItems = await this.entities()
      .where(where)
      .update(tournametUsers, ["id"]);
    return updatedItems[0];
  }

  async findAll(params: any): Promise<ITournamentUsers[]> {
    let data = [];
    data = await this.entities().where(params);
    return data;
  }

  async getUsersDetails(params: any): Promise<ITournamentUsers[]> {
    let data = [];    
    data = await this.entities()
      .join("profiles", "profiles.id", "tournament_users.userId")
      .select("profiles.username")
      .select("profiles.id")
      .where(params);
    return data;
  }
}
