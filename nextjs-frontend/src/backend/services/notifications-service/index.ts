import { Knex } from "knex";
import { TABLE_NAMES } from "../../../models/constants";
import { getErrorObject } from "../common/helper/utils.service";
import { INotifications } from "../database/models/i-notifications";
import { CrudRepository } from "../database/repositories/crud-repository";
import { updateTournamentInvites } from "../tournament-service/tournament-service";
import { INotificationRequest } from "./i-notification-request";
import { validateNotificationResponse } from "./i-notification-validator";

const getNotificationObj = (knexConnection: Knex) => {
    return new CrudRepository<INotifications>(knexConnection, TABLE_NAMES.NOTIFICATIONS);
}
export const addNotifications = async (data: INotifications | INotifications[], knexConnection: Knex) => {
    const notifications = getNotificationObj(knexConnection);
    await notifications.create(data)
}

export const fetchNotifications = async (knexConnection: Knex, user: any) => {
    const notifications = getNotificationObj(knexConnection);
    let data = await notifications.find({
        user_id: user.id,
        status: "PENDING"
    })
    return { data }
}

export const submitNotifications = async (req: INotificationRequest, knexConnection: Knex, user: any) => {
    try {
        const errors = await validateNotificationResponse(req);
        if (errors) return { errors };
        const notifications = getNotificationObj(knexConnection);
        let [notification]: INotifications[] = await notifications.find({
            id: req.id, user_id: user.id, "status": "PENDING", is_action_required: true
        })

        if (!notification) return getErrorObject("Invalid notification id or notification response already submitted")

        let updated = await updateTournamentInvites({ status: req.response }, {
            team_id: notification.data.team_id, tournament_id: notification.data.tournament_id, user_id: user.id,
        }, knexConnection)

        if (!updated) return getErrorObject("Tournament Invite not found")
        await notifications.update({ status: req.response }, { id: req.id, user_id: user.id })

        return { message: "Notification response updated" }
    } catch (ex) {
        return getErrorObject("Something went wrong")
    }
}