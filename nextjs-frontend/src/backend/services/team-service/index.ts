import knex, { Knex } from "knex";
import { TABLE_NAMES } from "../../../models/constants";
import { IError, ISuccess } from "../../utils/common/Interfaces";
import { randomString } from "../common/helper/utils.service";
import { IGame } from "../database/models/i-game";
import { IPlatform } from "../database/models/i-platform";
import { IPrivateProfile } from "../database/models/i-private-profile";
import { ITeams } from "../database/models/i-teams";
import { ITeamInvitation } from "../database/models/i-teams-invitation";
import { ITeamPlayers } from "../database/models/i-teams-players";
import { CrudRepository } from "../database/repositories/crud-repository";
import { ITeamCreateRequest, ITeamDiscardRequest, ITeamInviteRequest, ITeamLeaveRequest } from "./i-team-request";
import { validateLeaveTeam, validateSendInvite, validateTeamCreation, validateTeamDiscard } from "./i-team-validator";
import _ from "lodash";
import { IUser } from "../database/models/i-user";
const fields = ["id", "game_id", "name", "platform_id"]

export const fetchTeams = async (
    connection: Knex.Transaction,
    user: any): Promise<ISuccess | IError> => {
    try {
        const teams = new CrudRepository<ITeams>(connection, TABLE_NAMES.TEAMS);
        const data = await teams.knexObj()
            .join(TABLE_NAMES.TEAM_PLAYERS, "team_players.team_id", "teams.id")
            .join(TABLE_NAMES.PRIVATE_PROFILE, "private_profiles.id", "team_players.user_id")
            .select(["teams.name", "teams.id", "private_profiles.firstName", "private_profiles.lastName", "private_profiles.id as user_id"])
        if (!data.length) return getErrorObject("No Teams found")

        return {
            result: _(data).groupBy("name").map(function (items, name) {
                return {
                    name,
                    players: _.map(items, (data) => {
                        return {
                            user_id: data.user_id,
                            lastName: data.lastName,
                            firstName: data.firstName,
                        }
                    })
                };
            }).value()
        };


    } catch (ex: any) {
        if (ex?.code == 23505) return getErrorObject("Team with same name already exists")
        return getErrorObject("Something went wrong" + ex.message)
    }
}

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
            const team_players = new CrudRepository<ITeamPlayers>(connection, TABLE_NAMES.TEAM_PLAYERS);
            await team_players.create({
                team_id: data.id,
                user_id: user.id,
                is_owner: true,
            })
            return data
        }
        return getErrorObject("Team for platform and game combination already exists")


    } catch (ex: any) {
        if (ex?.code == 23505) return getErrorObject("Team with same name already exists")
        return getErrorObject("Something went wrong")
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
            return getErrorObject("Team for platform and game combination already exists")
    } catch (ex) {
        return getErrorObject("Something went wrong")
    }
}

export const sendInvites = async (req: ITeamInviteRequest, connection: Knex.Transaction, user: any): Promise<ISuccess | IError> => {
    try {
        const errors = await validateSendInvite(req);
        if (errors) return { errors };

        // validating all the users
        let player_data: IUser = await fetchUserDetails(req.email, connection)
        if (!player_data) return getErrorObject("Invalid email address.")

        const teams = new CrudRepository<ITeams>(connection, TABLE_NAMES.TEAMS);
        const team_info = await teams.findById(req.team_id);

        // validation team id and whether the requested user is the owner of the team
        if (!team_info) return getErrorObject("Team id does not exisits");
        if (team_info.created_by !== user.id) return getErrorObject("Not authorises to send invitation");

        // checking if users already in the team 
        const team_players = new CrudRepository<ITeamPlayers>(connection, TABLE_NAMES.TEAM_PLAYERS);
        const existing_players = await team_players.knexObj().where("user_id", player_data.id).where("team_id", req.team_id);
        if (existing_players.length) return getErrorObject("Players already exists in the team.");

        //validating if any pending invitation
        const team_invitation = new CrudRepository<ITeamInvitation>(connection, TABLE_NAMES.TEAM_INVITATION);
        const pending_inivitation = await team_invitation.knexObj().where("user_id", player_data.id).where("status", "PENDING")

        if (pending_inivitation.length) return getErrorObject("Some users already have invitation in pending state");
        const data = {
            team_id: team_info.id,
            user_id: player_data.id,
            type: "INVITE",
            secret: randomString(15)
        }
        await team_invitation.create(data)
        return { message: "Invite send successfully" } as any

    } catch (ex) {
        return getErrorObject("Something went wrong")
    }

}
export const acceptInvite = async (secret: string, connection: Knex.Transaction, user: any): Promise<ISuccess | IError> => {
    try {
        const team_invitation = new CrudRepository<ITeamInvitation>(connection, TABLE_NAMES.TEAM_INVITATION);
        const [invite] = await team_invitation.find({
            secret
        })
        if (invite.status === "ACCEPTED") {
            return getErrorObject("Invitation already accepted")
        }
        if (invite.status === "REJECTED") {
            return getErrorObject("Invitation rejected. Ask team owner to send new invitation")
        }
        if (invite.status === "PENDING") {
            const team_players = new CrudRepository<ITeamPlayers>(connection, TABLE_NAMES.TEAM_PLAYERS);
            await Promise.all([
                team_invitation.update({
                    status: "ACCEPTED"
                }, {
                    secret
                }),
                team_players.create({
                    team_id: invite.team_id,
                    user_id: invite.user_id
                })
            ])
        }
        return { message: "Invitation accepted" } as any

    } catch (ex) {
        return getErrorObject("Something went wrong")
    }

}
export const rejectInvite = async (secret: string, connection: Knex.Transaction, user: any): Promise<ISuccess | IError> => {
    try {
        const team_invitation = new CrudRepository<ITeamInvitation>(connection, TABLE_NAMES.TEAM_INVITATION);
        const [invite] = await team_invitation.find({
            secret
        })
        if (!invite) return getErrorObject("Invalid secret")

        if (invite.status === "ACCEPTED") return getErrorObject("Invitation already accepted")

        if (invite.status === "REJECTED") return getErrorObject("Invitation already rejected")

        if (invite.status === "PENDING") {
            await team_invitation.update({
                status: "REJECTED"
            }, {
                secret
            })
        }
        return { message: "Invitation rejected" } as any

    } catch (ex) {
        return getErrorObject("Something went wrong")
    }

}

export const leaveTeam = async (req: ITeamLeaveRequest,
    connection: Knex.Transaction,
    user: any): Promise<ISuccess | IError> => {
    try {
        const errors = await validateLeaveTeam(req);
        if (errors) return { errors };
        const teams_player = new CrudRepository<ITeamPlayers>(connection, TABLE_NAMES.TEAM_PLAYERS);
        const [existing_player] = await teams_player.find({ "team_id": req.team_id, user_id: user.id })

        // validating team id and if the leaving user is owner.
        if (!existing_player) return getErrorObject("You are not part of the team.");
        if (existing_player.is_owner) return getErrorObject("You are the owner of the team so cannot leave it");

        await teams_player.delete({
            "team_id": req.team_id, user_id: user.id
        })
        return { message: "Team left" } as any
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

export const fetchUserDetails = async (email: string, connection: Knex.Transaction): Promise<IUser> => {
    const user_list = new CrudRepository<IUser>(connection, TABLE_NAMES.USERS);
    let data = await user_list.knexObj().where("email", email).first()
    return data
}

function getErrorObject(msg: string) {
    return { errors: [msg] }
}