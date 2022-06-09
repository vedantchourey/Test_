import { Knex } from "knex";
import { TABLE_NAMES } from "../../../models/constants";
import { getErrorObject } from "../common/helper/utils.service";
import { IEloRating } from "../database/models/i-elo-rating";
import { CrudRepository } from "../database/repositories/crud-repository";
import { validateQuery } from "./leaderboard-validator";

async function fetchLeaderBoard(req: any, knexConnection: Knex): Promise<any> {
    try {
        const errors = await validateQuery(req);
        if (errors) return { errors };
        const eloRepo = new CrudRepository<IEloRating>(knexConnection as Knex, TABLE_NAMES.ELO_RATING);
        const data = await eloRepo.knexObj().where("game_id", req.game_id)
.orderBy('elo_rating', 'desc')
.limit(10)
        return data
    } catch {
        return getErrorObject()
    }
}

export default fetchLeaderBoard