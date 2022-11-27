import { Knex } from "knex";
import _ from "lodash";
import moment from "moment";
import { TABLE_NAMES } from "../../../models/constants";
import { getErrorObject } from "../common/helper/utils.service";
import { IEloRating } from "../database/models/i-elo-rating";
import { IEloRatingHistory } from "../database/models/i-elo-rating-history";
import { ITeams } from "../database/models/i-teams";
import { CrudRepository } from "../database/repositories/crud-repository";
import { UsersRepository } from "../database/repositories/users-repository";
import { validateQuery } from "./leaderboard-validator";

export const fetchEloRating = async (
  connection: Knex,
  data: any
): Promise<any> => {
  try {
    const famRepo = new CrudRepository<IEloRating>(
      connection as Knex,
      TABLE_NAMES.ELO_RATING
    );
    const eloRatingHistoryRepo = new CrudRepository<IEloRating>(
      connection as Knex,
      TABLE_NAMES.ELO_RATING_HISTORY
    );
    const history = await eloRatingHistoryRepo
      .knexObj()
      .where("user_id", data.user_id)
      .where("game_id", data.game_id);

    // console.log("history -> ", history);

    const result: any = await famRepo
      .knexObj()
      .where("user_id", data.user_id)
      .where("game_id", data.game_id);

    // console.log("result -> ", result);
    return {
      ...data,
      lost: (history || []).filter((i: any) => i.status === "loss").length,
      won: (history || []).filter((i: any) => i.status === "win").length,
      elo_rating: result[0].elo_rating,
    };
  } catch (e) {
    return { ...data, lost: 0, won: 0, elo_rating: 0 };
  }
  
};

const findUserWithLeaderboard = async (
  userId: string,
  details: any,
  connection: Knex.Transaction
): Promise<any> => {
  const userRepo = new UsersRepository(connection);
  const userDetails = await userRepo.findById(userId);
  const data = await fetchEloRating(connection, details);

  return {
    ...data,
    userDetails: {
      ...userDetails.raw_user_meta_data,
    },
  };
};

const fetchEloRatingForTeam = async (
  connection: Knex.Transaction,
  data: any
): Promise<any> => {
  try {
    const eloRatingHistoryRepo = new CrudRepository<IEloRatingHistory>(
      connection as Knex,
      TABLE_NAMES.ELO_RATING_HISTORY
    );
    
    const history = await eloRatingHistoryRepo
      .knexObj()
      .where("team_id", data.id);
      
    return {
      ...data,
      loss: (history || []).filter((i: any) => parseInt(i.elo_rating) < 0)
        .length,
      won: (history || []).filter((i: any) => parseInt(i.elo_rating) > 0)
        .length,
      elo_rating: data.elo_rating || history?.[0]?.elo_rating || "0",
    };
  } catch (err) {
    return {
      ...data,
      lost: "0",
      won: "0",
      elo_rating: data.elo_rating || "0",
    };
  }
};

async function fetchLeaderBoard(
  req: any,
  knexConnection: Knex.Transaction,
  isTeam: boolean
): Promise<any> {
  try {
    if (isTeam) {
      const teamRepo = new CrudRepository<ITeams>(
        knexConnection as Knex,
        TABLE_NAMES.TEAMS
      );
      const data = await teamRepo
        .knexObj()
        .where("game_id", req.game_id)
        .orderBy("elo_rating", "desc")
        .limit(100);

      const resultWithElo: any[] = await Promise.all(
        data.map((i: any) => fetchEloRatingForTeam(knexConnection, i))
      );

      return resultWithElo;
    }
    const errors = await validateQuery(req);
    if (errors) return { errors };
    
    const eloRepo = new CrudRepository<IEloRating>(
      knexConnection as Knex,
      TABLE_NAMES.ELO_RATING
    );

    const data = await eloRepo
      .knexObj()
      .join(
        TABLE_NAMES.PRIVATE_PROFILE,
        "private_profiles.id",
        "elo_ratings.user_id"
      )
      .join(
        "profiles",
        "profiles.id",
        "elo_ratings.user_id"
      )
      .where("game_id", req.game_id)
      .orderBy("elo_ratings.elo_rating", "desc")
      .limit(100);

    const dataBatch = data.map((i: any) =>
      findUserWithLeaderboard(i.user_id, i, knexConnection));
    const response = await Promise.all(dataBatch);

    return Object.values(_.groupBy(response, "id")).map(
      (i) =>
        i.sort((a: any, b: any) => {
          const aTime: any = moment(a.createdAt).format("x");
          const bTime: any = moment(b.createdAt).format("x");
          return bTime - aTime;
        })[0]
    );
  } catch (err) {
    return getErrorObject();
  }
}

export default fetchLeaderBoard;
