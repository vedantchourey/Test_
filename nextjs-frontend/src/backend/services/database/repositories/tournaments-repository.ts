import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { ITournament } from "../models/i-tournaments";
import { ListTournamentType } from "../../tournament-service/list-tournaments-request";
import { IListTournamentResponse } from "../../tournament-service/i-tournament-response";
const keys = [
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
  "sponsor"
];
export class TournamentsRepository extends BaseRepository<ITournament> {
  constructor(transaction: Knex.Transaction | Knex) {
    super(transaction, "tournamentsData");
  }

  async create(tournament: ITournament): Promise<ITournament> {
    const createdItems = await this.entities().insert(tournament, keys);
    return createdItems[0];
  }

  async update(tournament: ITournament): Promise<ITournament> {
    const id = tournament.id;
    const data = { ...tournament };
    delete data.id;
    const updatedItems = await this.entities()
      .update(tournament, keys)
      .where({ id });
    return updatedItems[0];
  }

  async getTournaments(
    params: ListTournamentType
  ): Promise<IListTournamentResponse> {
    let result;
    let options: {
      game?: string;
      status?: string;
      settings?: {
        tournamentFormat: string;
      };
    } | null = null;
    params.game
      ? (options = {
          game: params.game,
        })
      : (options = null);

    params.status ? (options = { ...options, status: params.status }) : null;

    const limit = params.limit || 5;
    const query = this.entities()
      .select(...keys)
      .where(options ? options : {});

    if (params?.format) {
      query.whereRaw("cast(settings->>? as varchar) = ?", [
        "tournamentFormat",
        params?.format ? params?.format : "$tournamentFormat",
      ]);
    }

    if (params.page) {
      result = await query.offset((params.page - 1) * limit).limit(limit);
    }
    result = await query.limit(limit);
    const count = await this.entities().count();
    return {
      total: count[0].count,
      tournaments: result,
    };
  }
  async select(query: any): Promise<ITournament | any> {
    const result: ITournament | any = await this.entities()
      .where(query)
      .select("*")
      .first();
    return result;
  }
  async getTournament(tournamentId: string): Promise<ITournament> {
    const result: ITournament = await this.entities()
      .first(...keys)
      .where({ id: tournamentId });
    return result;
  }
}
