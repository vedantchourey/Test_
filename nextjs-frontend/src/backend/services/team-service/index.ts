import knex, { Knex } from "knex";
import { TABLE_NAMES } from "../../../models/constants";
import { IError, ISuccess } from "../../utils/common/Interfaces";
import { randomString } from "../common/helper/utils.service";
import { IGame } from "../database/models/i-game";
import { IPlatform } from "../database/models/i-platform";
import { IPrivateProfile } from "../database/models/i-private-profile";
import { ITeams } from "../database/models/i-teams";
import { ITeamInvitation } from "../database/models/i-teams-invitation";
import { CrudRepository } from "../database/repositories/crud-repository";
import { ITeamCreateRequest, ITeamDiscardRequest, ITeamInviteRequest } from "./i-team-request";
import { validateSendInvite, validateTeamCreation, validateTeamDiscard } from "./i-team-validator";
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

export const sendInvites = async (req: ITeamInviteRequest, connection: Knex.Transaction, user: any): Promise<ISuccess | IError> => {
    try {
        const errors = await validateSendInvite(req);
        if (errors) return { errors };

        // validating all the users
        if (!(await validateUsers(req.users, connection))) return getErrorObject("Invalid user ids")


        const teams = new CrudRepository<ITeams>(connection, TABLE_NAMES.TEAMS);
        const team_info = await teams.findById(req.team_id);

        // validation team id and whether the requested user is the owner of the team
        if (!team_info) return getErrorObject("Team id does not exisits");
        if (team_info.created_by !== user.id) return getErrorObject("Not authorises to send invitation");

        const team_invitation = new CrudRepository<ITeamInvitation>(connection, TABLE_NAMES.TEAM_INVITATION);
        // todo 
        // check if user already part of the team. once invitation acceptance api is done

        const pending_inivitation = await team_invitation.knexObj().whereIn("user_id", req.users).where("status", "PENDING")

        if (pending_inivitation.length) return getErrorObject("Some users already have invitation in pending state");
        const data = req.users.map(user => ({
            teams_id: team_info.id,
            user_id: user,
            type: "INVITE",
            secret: randomString(15)
        }))
        await team_invitation.create(data)
        return { message: "Invite send successfully" } as any

    } catch (ex) {
        return getErrorObject("Something went wrong")
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

export const validateUsers = async (users: string[], connection: Knex.Transaction): Promise<boolean> => {
    const user_list = new CrudRepository<IPrivateProfile>(connection, TABLE_NAMES.PRIVATE_PROFILE);
    let data = await user_list.knexObj().whereIn("id", users)
    if (data.length != users.length) return false
    return true
}

function getErrorObject(msg: string) {
    return { errors: [msg] }
}