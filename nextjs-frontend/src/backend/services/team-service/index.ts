import { Knex } from "knex";
import { STATUS, TABLE_NAMES } from "../../../models/constants";
import { IError, ISuccess } from "../../utils/common/Interfaces";
import { getErrorObject, randomString } from "../common/helper/utils.service";
import { IGame } from "../database/models/i-game";
import { IPlatform } from "../database/models/i-platform";
import { ITeams } from "../database/models/i-teams";
import { ITeamPlayers } from "../database/models/i-teams-players";
import { ITeamInvitation } from "../database/models/i-teams-invitation";
import { CrudRepository } from "../database/repositories/crud-repository";
import { ITeamCreateRequest, ITeamDiscardRequest, ITeamInviteRequest, ITeamLeaveRequest } from "./i-team-request";
import { validateLeaveTeam, validateSendInvite, validateTeamCreation, validateTeamDiscard } from "./i-team-validator";
import _ from "lodash";
import { IUser } from "../database/models/i-user";
import { ITournament } from "../database/models/i-tournaments";
import { addNotifications } from "../notifications-service";
import { INotifications } from "../database/models/i-notifications";
import { UsersRepository } from "../database/repositories/users-repository";
import { IEloRatingHistory } from "../database/models/i-elo-rating-history";
const fields = ["id", "game_id", "name", "platform_id"]

export const fetchTeams = async (connection: Knex.Transaction, user: any, query: any): Promise<ISuccess | IError> => {
    try {
        const teams = new CrudRepository<ITeams>(connection, TABLE_NAMES.TEAMS);
        const teamsPlayers = new CrudRepository<ITeamPlayers>(connection, TABLE_NAMES.TEAM_PLAYERS);
        const teamPlayersQuery = teamsPlayers.knexObj().select("team_id")
            .where({ user_id: user.id });

        const dataa = await teamPlayersQuery;
        const array = dataa.map((item: any) => { return item.team_id });

        const eloRatingHistory = new CrudRepository<IEloRatingHistory>(connection, TABLE_NAMES.ELO_RATING_HISTORY);
        let eloHistory: any = null;
        const teamQuery = teams.knexObj()
            .join(TABLE_NAMES.TEAM_PLAYERS, "team_players.team_id", "teams.id")
            .join(TABLE_NAMES.PRIVATE_PROFILE, "private_profiles.id", "team_players.user_id")
            .join(TABLE_NAMES.WALLET, "wallet.userId", "private_profiles.id")
            .leftJoin(TABLE_NAMES.ELO_RATING, {
                "elo_ratings.user_id": "private_profiles.id",
                "elo_ratings.game_id": "teams.game_id"
            })
            .select(["teams.name", "teams.id", "teams.created_by", "private_profiles.firstName", "private_profiles.lastName", "private_profiles.id as user_id", "wallet.balance", "elo_ratings.elo_rating"])
            .whereIn("teams.id", array)

        if (query.id) {
            teamQuery.where("teams.id", query.id)
            eloHistory = await eloRatingHistory.knexObj().select("*")
                .where("user_id", user.id)
        }
        if (query.tournament_id) {
            const tour_repo = new CrudRepository<ITournament>(connection, TABLE_NAMES.TOURNAMENTS);
            const { game, settings } = await tour_repo.findById(query.tournament_id, ["game", "settings"]);
            if (game && settings) {
                teamQuery.where("teams.game_id", game)
                teamQuery.where("teams.platform_id", settings.platform)
            }
        }
        const data = await teamQuery
        if (!data.length) return getErrorObject("No Teams found")
        return {
            result: _(data).groupBy("name")
                .map(function (items, name) {
                    return {
                        id: items[0].id,
                        created_by: items[0].created_by,
                        name,
                        eloHistory,
                        players: _.map(items, (data) => {
                            return {
                                user_id: data.user_id,
                                lastName: data.lastName,
                                firstName: data.firstName,
                                balance: data.balance,
                                elo_rating: data.elo_rating,
                            }
                        })
                    };
                })
                .value()
        };


    } catch (ex: any) {
        if (ex?.code === 23505) return getErrorObject("Team with same name already exists")
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

        const existing_team = await teams.find({ game_id: req.game_id, platform_id: req.platform_id, })
        if (existing_team?.length) return getErrorObject("Team with same Game and Platform exists")

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

    } catch (ex: any) {
        if (ex?.code === '23505') return getErrorObject("Team with same name already exists")
        return getErrorObject("Something went wrong" + ex)
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
        } return getErrorObject("Team for platform and game combination already exists")
    } catch (ex) {
        return getErrorObject("Something went wrong")
    }
}

export const sendInvites = async (req: ITeamInviteRequest, connection: Knex.Transaction, user: any): Promise<ISuccess | IError> => {
    try {
        const errors = await validateSendInvite(req);
        if (errors) return { errors };

        const playerId = req.player_id;
        let player_data: IUser | undefined;

        // validating all the users
        if (req?.email) {
            player_data = await fetchUserDetails(req?.email, connection)
            if (!player_data) return getErrorObject("Invalid email address.")
        }

        const teams = new CrudRepository<ITeams>(connection, TABLE_NAMES.TEAMS);
        const team_info = await teams.findById(req.team_id);

        // validation team id and whether the requested user is the owner of the team
        if (!team_info) return getErrorObject("Team id does not exisits");
        if (team_info.created_by !== user.id) return getErrorObject("Not authorises to send invitation");

        // checking if users already in the team 
        const team_players = new CrudRepository<ITeamPlayers>(connection, TABLE_NAMES.TEAM_PLAYERS);
        const existing_players = await team_players.knexObj().where("user_id", playerId || player_data?.id)
            .where("team_id", req.team_id);
        if (existing_players.length) return getErrorObject("Players already exists in the team.");

        //validating if any pending invitation
        const team_invitation = new CrudRepository<ITeamInvitation>(connection, TABLE_NAMES.TEAM_INVITATION);
        const pending_inivitation = await team_invitation.knexObj().where("user_id", playerId || player_data?.id)
            .where("status", STATUS.PENDING)
            .where("team_id", req.team_id)

        if (pending_inivitation.length) return getErrorObject("Users have invitation pending");
        const secret = randomString(15);
        const data = {
            team_id: team_info.id,
            invite_by: user.id,
            user_id: playerId || player_data?.id,
            type: "INVITE",
            secret
        }
        const notification: INotifications = {
            type: "TEAM_INVITATION",
            user_id: playerId || player_data?.id || "",
            is_action_required: true,
            status: STATUS.PENDING,
            data: { secret }
        }
        await Promise.all([
            team_invitation.create(data),
            addNotifications(notification, connection)
        ])

        return { message: "Invite send successfully" } as any

    } catch (ex) {
        return getErrorObject("Something went wrong")
    }
}

export const acceptInvite = async (secret: string, connection: Knex.Transaction): Promise<ISuccess | IError> => {
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
export const rejectInvite = async (secret: string, connection: Knex.Transaction): Promise<ISuccess | IError> => {
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
        if (existing_player.is_owner) {
            const new_owner = await teams_player.knexObj().whereNot({ user_id: user.id })
                .where({ "team_id": req.team_id })
                .orderBy("created_at")
                .first();
            await teams_player.update({ is_owner: true }, { "team_id": req.team_id, user_id: new_owner.user_id })
        }

        await teams_player.delete({
            "team_id": req.team_id, user_id: user.id
        })
        return { message: "Team left" } as any
    } catch (ex) {
        return getErrorObject("Something went wrong")
    }
}
export const validateCreationData = async (req: ITeamCreateRequest, connection: Knex.Transaction): Promise<string[] | undefined> => {
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

const findUserWithInvitationDeatils = async (
    userId: string,
    details: any,
    connection: Knex.Transaction
): Promise<any> => {
    const userRepo = new UsersRepository(connection);
    const userDetails = await userRepo.findById(userId);
    return {
        player: { ...userDetails.raw_user_meta_data, id: userDetails.id },
        ...details,
    };
};

export const getListOfSendInvitations = async (
    connection: Knex.Transaction,
    user: any
): Promise<ISuccess | IError> => {
    try {
        const user_id = user.id;
        const team_invitation = new CrudRepository<ITeamInvitation>(
            connection,
            TABLE_NAMES.TEAM_INVITATION
        );
        const sent_invitations: any[] = await team_invitation
            .knexObj()
            .where("invite_by", user_id)
            .where("status", "PENDING");
        const batch = sent_invitations.map((item: any) =>
            findUserWithInvitationDeatils(item.user_id, item, connection));
        const result = await Promise.all(batch);
        return { result };
    } catch (ex) {
        return getErrorObject("Something went wrong");
    }
};

const findTemsWithInvitationDeatils = async (
    teamId: string,
    details: any,
    connection: Knex.Transaction
): Promise<any> => {
    const teamRepo = new CrudRepository<ITeamPlayers>(connection, TABLE_NAMES.TEAMS);
    const teamDetails = await teamRepo.findById(teamId);
    const userRepo = new UsersRepository(connection);
    const invite_by = await userRepo.findById(details.invite_by);
    return {
        ...details,
        team: { ...teamDetails },
        invite_by: { ...invite_by.raw_user_meta_data, id: invite_by.id }
    };
};

export const getListOfInvitations = async (
    connection: Knex.Transaction,
    user: any
): Promise<ISuccess | IError> => {
    try {
        const user_id = user.id;
        const team_invitation = new CrudRepository<ITeamInvitation>(
            connection,
            TABLE_NAMES.TEAM_INVITATION
        );
        const sent_invitations: any[] = await team_invitation
            .knexObj()
            .where("user_id", user_id)
            .where("status", STATUS.PENDING);

        const batch = sent_invitations.map((item: any) =>
            findTemsWithInvitationDeatils(item.team_id, item, connection));
        const result = await Promise.all(batch);
        return { result };
    } catch (ex) {
        return getErrorObject("Something went wrong");
    }
};

export const fetchUserDetails = async (email: string, connection: Knex.Transaction): Promise<IUser> => {
    const user_list = new CrudRepository<IUser>(connection, TABLE_NAMES.USERS);
    const data = await user_list.knexObj().where("email", email)
        .first()
    return data
}

