import { Knex } from "knex";
import { STATUS, TABLE_NAMES } from "../../../models/constants";
import { IError, ISuccess } from "../../utils/common/Interfaces";
import { getErrorObject } from "../common/helper/utils.service";
import { INotifications } from "../database/models/i-notifications";
import { CrudRepository } from "../database/repositories/crud-repository";
import { acceptInvite } from "../team-service";
import { updateTournamentInvites } from "../tournament-service/tournament-service";
import { INotificationRequest } from "./i-notification-request";
import { validateNotificationResponse } from "./i-notification-validator";

const getNotificationObj = (knexConnection: Knex): CrudRepository<INotifications> => {
    return new CrudRepository<INotifications>(knexConnection, TABLE_NAMES.NOTIFICATIONS);
}
export const addNotifications = async (data: INotifications | INotifications[], knexConnection: Knex): Promise<void> => {
    const notifications = getNotificationObj(knexConnection);
    await notifications.create(data)
}

export const fetchNotifications = async (knexConnection: Knex, user: any): Promise<any> => {
    const notifications = getNotificationObj(knexConnection);
    const data = await notifications.find({
        user_id: user.id,
        status: "PENDING"
    })
    return { data }
}

export const submitNotifications = async (req: INotificationRequest, knexConnection: Knex, user: any): Promise<IError | ISuccess> => {
    try {
        const errors = await validateNotificationResponse(req);
        if (errors) return { errors };
        const notifications = getNotificationObj(knexConnection);
        const [notification]: INotifications[] = await notifications.find({
            id: req.id, user_id: user.id, status: STATUS.PENDING, is_action_required: true
        })
        if (!notification) return getErrorObject("Invalid notification id or notification response already submitted")

        const resp = await handleNotifiction(notification, req, user, knexConnection);
        if (resp.errors) return resp;

        await notifications.update({ status: req.response }, { id: req.id, user_id: user.id })

        return { message: "Notification response updated" }
    } catch (ex) {
        return getErrorObject()
    }
}

export const handleNotifiction = async (notification: INotifications, req: INotificationRequest, user: any, knexConnection: Knex): Promise<any> => {
    if (notification.type === "TOURNAMENT_INVITE") {
        const updated = await updateTournamentInvites({ status: req.response } as any, {
            team_id: notification?.data?.team_id, tournament_id: notification?.data?.tournament_id, user_id: user.id,
        }, knexConnection)
        if (!updated) return getErrorObject("Tournament Invite not found")
        return updated
    }
    if (notification.type === "TEAM_INVITATION") {
        return await acceptInvite(notification?.data?.secret, knexConnection as Knex.Transaction)
    }
    return getErrorObject("Tournament Invite not found")
}