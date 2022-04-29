import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { ITournament } from "../models/i-tournaments";
import { ListTournamentType } from "../../tournament-service/list-tournaments-request";
import { IListTournamentResponse } from "../../tournament-service/i-tournament-response";

export class TournamentsRepository extends BaseRepository<ITournament> {
  constructor(transaction: Knex.Transaction | Knex) {
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

  async update(tournament: ITournament): Promise<ITournament> {
    const id = tournament.id;
    const data = { ...tournament };
    delete data.id;
    const updatedItems = await this.entities()
      .update(tournament, [
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
      ])
      .where({ id });
    return updatedItems[0];
  }

  async getTournaments(
    params: ListTournamentType
  ): Promise<IListTournamentResponse> {
    let result;
    let options: { game?: string; status?: string } | null = null;
    params.game
      ? (options = {
          game: params.game,
        })
      : (options = null);

    params.status ? (options = { ...options, status: params.status }) : null;

    const limit = params.limit || 5;
    if (params.page) {
      result = await this.entities()
        .select(
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
          "createTemplateCode"
        )
        .where(options ? options : {})
        .offset((params.page - 1) * limit)
        .limit(limit);
    }

    result = await this.entities()
      .select(
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
        "createTemplateCode"
      )
      .where(options ? options : {})
      .limit(limit);

    const count = await this.entities().count();

    return {
      total: count[0].count,
      tournaments: result,
    };
  }

  async getTournament(tournamentId: string): Promise<ITournament> {
    const result: ITournament = await this.entities()
      .first(
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
        "createTemplateCode"
      )
      .where({ id: tournamentId });
    return result;
  }

  async getTournamentWithBrackets(tournamentId: string): Promise<ITournament> {
    const result: ITournament = await this.entities()
      .first(
        "tournamentsData.id",
        "tournamentsData.name",
        "tournamentsData.game",
        "tournamentsData.startDate",
        "tournamentsData.startTime",
        "tournamentsData.about",
        "tournamentsData.banner",
        "tournamentsData.info",
        "tournamentsData.settings",
        "tournamentsData.bracketsMetadata",
        "tournamentsData.streams",
        "tournamentsData.status",
        "tournamentsData.joinStatus",
        "tournamentsData.createTemplateCode",
        "brackets.brackets",
        "brackets.rounds"
      )
      .join("brackets", "brackets.tournament_id", "tournamentsData.id")
      .where({ "tournamentsData.id": tournamentId });
    return result;
  }
}
