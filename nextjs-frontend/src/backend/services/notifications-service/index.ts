import { Knex } from "knex";
import { TABLE_NAMES } from "../../../models/constants";
import { INotifications } from "../database/models/i-notifications";
import { CrudRepository } from "../database/repositories/crud-repository";

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