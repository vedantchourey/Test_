import { Knex } from "knex";
import { TABLE_NAMES } from "../../../models/constants";
import { getErrorObject } from "../common/helper/utils.service";
import { IEloRating } from "../database/models/i-elo-rating";
import { CrudRepository } from "../database/repositories/crud-repository";
import { UsersRepository } from "../database/repositories/users-repository";
import { validateQuery } from "./leaderboard-validator";

const findUserWithLeaderboard = async (
  userId: string,
  details: any,
  connection: Knex.Transaction
): Promise<any> => {
  const userRepo = new UsersRepository(connection);
  const userDetails = await userRepo.findById(userId);
  return {
      ...details,
      userDetails: {
          ...userDetails.raw_user_meta_data
      }
  };
};

async function fetchLeaderBoard(req: any, knexConnection: Knex.Transaction): Promise<any> {
  try {
    const errors = await validateQuery(req);
    if (errors) return { errors };
    const eloRepo = new CrudRepository<IEloRating>(
      knexConnection as Knex,
      TABLE_NAMES.ELO_RATING
    );
    const data = await eloRepo
      .knexObj()
      .where("game_id", req.game_id)
      .orderBy("elo_rating", "desc")
      .limit(10);
      const dataBatch = data.map((i: any) => findUserWithLeaderboard(i.user_id, i, knexConnection))
      const response = await Promise.all(dataBatch)
    return response;
  } catch {
    return getErrorObject();
  }
}

export default fetchLeaderBoard;
