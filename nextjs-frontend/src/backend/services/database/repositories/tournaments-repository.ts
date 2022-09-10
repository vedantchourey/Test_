// import { Settings } from 'react-slick';
import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { ITournament } from "../models/i-tournaments";
import moment from "moment";
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
  "sponsor",
  "templateCode",
  "joinCode",
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
      amount?: string;
      sortType?: string;
      settings?: {
        tournamentFormat: string;
      };
    } | null = null;
    params.game
      ? (options = {
          game: params.game,
        })
      : (options = null);
    const limit = params.limit || 5;
    const query = this.entities()
      .select(...keys)
      .where({ isDeleted: false })
      .where(options ? options : {});

    if (params?.format) {
      query.whereRaw("cast(settings->>? as varchar) = ?", [
        "tournamentFormat",
        params?.format ? params?.format : "$tournamentFormat",
      ]);
    }

    if (params?.status) {
      query.where({
        status: params.status.toLowerCase() as "draft" | "published",
      });
    }

    result = await query;

    if (params?.sortType) {
      result = result.filter((_doc: any) => {
        const startDateTime =
          moment(_doc.startDate).format("D MMM YYYY ") +
          moment(_doc.startTime, "HH:mm:ss").format("LT");

        if (params?.sortType === "home") {
          if (moment(startDateTime).isAfter(moment())) {
            return _doc;
          }
        }

        if (moment(_doc.startDate).isBefore(moment())) {
          const isOnGoing = moment(startDateTime).isBetween(
            moment().hour(0),
            moment().hour(23).minute(59)
          );
          if (params?.sortType === "complete") {
            if (!isOnGoing) return _doc;
          }
          if (params?.sortType === "ongoing") {
            const isCompleted: boolean =
              _doc?.brackets?.match?.filter(
                (i: any) => !i.opponent1.result && !i.opponent2.result
              ).length === 0;

            if (isOnGoing && !isCompleted) return _doc;
          }
        } else if (moment(_doc.startDate).isSame(moment(), "day")) {
          if (
            moment(
              moment(_doc.startDate).format("YYYY-MM-DD").toString() +
                " " +
                _doc.startTime
            ).isBefore(moment())
          ) {
            if (params?.sortType === "complete") {
              return _doc;
            }
          } else if (params?.sortType === "ongoing") {
            if (moment(_doc).isBetween(moment().hour(0), moment().hour(23)))
              return _doc;
          }
        } else if (params?.sortType === "upcomming") {
          return _doc;
        }
      });
    }

    if (params?.amount) {
      result = result.filter((_doc: any) => {
        if (params.amount === "Free") {
          if (_doc?.settings?.entryFeeAmount < 1) {
            return _doc;
          }
        } else if (params.amount === "1-5") {
          if (
            _doc?.settings?.entryFeeAmount >= 1 &&
            _doc?.settings?.entryFeeAmount <= 5
          ) {
            return _doc;
          }
        } else if (params.amount === "6-10") {
          if (
            _doc?.settings?.entryFeeAmount >= 6 &&
            _doc?.settings?.entryFeeAmount <= 10
          ) {
            return _doc;
          }
        } else if (params.amount === "11-15") {
          if (
            _doc?.settings?.entryFeeAmount >= 11 &&
            _doc?.settings?.entryFeeAmount <= 15
          ) {
            return _doc;
          }
        } else if (params.amount === "16-20") {
          if (
            _doc?.settings?.entryFeeAmount >= 16 &&
            _doc?.settings?.entryFeeAmount <= 20
          ) {
            return _doc;
          }
        } else if (params.amount === "20+") {
          if (_doc?.settings?.entryFeeAmount > 20) {
            return _doc;
          }
        }
      });
    }

    const counts = [...result];

    if (params?.page) {
      result = result.slice((params.page - 1) * limit, params.page * limit);
    } else {
      result = result.slice((1 - 1) * limit, Number(limit));
    }

    return {
      total: counts.length,
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
