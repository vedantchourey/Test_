import { Knex } from "knex";
import { TABLE_NAMES } from "../../../models/constants";
import { IError, ISuccess } from "../../utils/common/Interfaces";
import { IGame } from "../database/models/i-game";
import { IPlatform } from "../database/models/i-platform";
import { ITeams } from "../database/models/i-teams";
import { CrudRepository } from "../database/repositories/crud-repository";
import { ITeamCreateRequest, ITeamDiscardRequest } from "./i-team-request";
import { validateTeamCreation, validateTeamDiscard } from "./i-team-validator";
const fields = ["id", "game_id", "name", "platform_id"]
export const createTeams = async (req: ITeamCreateRequest,
    connection: Knex.Transaction,
    user: any): Promise<ITeams | IError> => {
    try {
        const errors = await validateTeamCreation(req);
        if (errors) return { errors };

        const data_errors = await validateCreationData(req, connection);
        if (data_errors) return { errors: data_errors }
        const teams = new CrudRepository<ITeams>(connection, TABLE_NAMES.TEAMS);
        const existing_team = await teams.find({
            created_by: user.id,
            platform_id: req.platform_id,
            game_id: req.game_id,
        }, fields)
        if (!existing_team.length) {
            const data = await teams.create({
                created_by: user.id,
                ...req
            }, fields)
            return data
        }
        return { errors: ["Team for platform and game combination already exists"] }


    } catch (ex) {
        return { errors: ["Something went wrong"] }
    }
}

export const discardTeams = async (req: ITeamDiscardRequest,
    connection: Knex.Transaction,
    user: any): Promise<ISuccess | IError> => {
    try {
        const errors = await validateTeamDiscard(req);
        if (errors) return { errors };
        const teams = new CrudRepository<ITeams>(connection, TABLE_NAMES.TEAMS);
        const existing_team = await teams.findById(req.id)
        if (existing_team) {
            await teams.delete({ id: req.id, created_by: user.id })
            return { message: "Teams discard successfull" }
        } else
            return { errors: ["Team for platform and game combination already exists"] }
    } catch (ex) {
        return { errors: ["Something went wrong"] }
    }
}

export const validateCreationData = async (req: ITeamCreateRequest, connection: Knex.Transaction,) => {
    try {
        const platforms = new CrudRepository<IPlatform>(connection, TABLE_NAMES.PLATFORMS)
        const games = new CrudRepository<IGame>(connection, TABLE_NAMES.PLATFORMS)
        const platform_games = await Promise.all([
            platforms.findById(req.platform_id),
            games.findById(req.game_id)
        ])
        if (platform_games[0] && platform_games[1]) {
            return ["Platform or game does not exists"]
        }
    } catch (ex) {
        return ["Something went wrong"]
    }

}
