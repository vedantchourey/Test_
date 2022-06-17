import { Knex } from "knex";
import { TABLE_NAMES } from "../../../models/constants";
import { IError, ISuccess } from "../../utils/common/Interfaces";
import { getErrorObject } from "../common/helper/utils.service";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IChannel } from "../database/models/i-channel";
import { v4 } from "uuid";
import { IChatUsers } from "../database/models/i-chat-users";
import { ITeams } from "../database/models/i-teams";
import { IUser } from "../database/models/i-user";

const messageTableFields = ["id", "owner", "type"];
const chatUserTableFields = [
  "id",
  "channel_id",
  "user_id",
  "channel_name",
  "other_user",
];

interface ICreateChannel {
  channel_id: string | null;
  type: string;
  users: Array<string>;
}

export const createChannel = async (
  connection: Knex.Transaction,
  user: any,
  req: ICreateChannel
): Promise<ISuccess | IError> => {
  try {
    const { channel_id, type, users } = req;
    const teams = new CrudRepository<ITeams>(connection, TABLE_NAMES.TEAMS);

    const channelRepo = new CrudRepository<IChannel>(connection, "channel");

    const chatUserRepo = new CrudRepository<IChatUsers>(
      connection,
      "chat_users"
    );

    const obj_id = channel_id || v4();

    const data = await channelRepo.create(
      {
        id: obj_id,
        owner: user?.id,
        type,
      },
      messageTableFields
    );

    const usersData: Array<any> = [];

    if (type === "team") {
      const teamObj = await teams.knexObj().where("id", channel_id);

      const channel_name = teamObj[0].name;
      const userData = await fetchUserDetails(user?.id, connection);
      const userObj = await chatUserRepo.create(
        {
          channel_id: obj_id,
          user_id: user?.id,
          user_name: userData.raw_user_meta_data.username,
          other_user: channel_id,
          channel_name,
        },
        chatUserTableFields
      );
      usersData.push(userObj);
      return { result: [{ channel: data, users: usersData }] };
    }
    const ownerUser = await fetchUserDetails(users[0], connection);
    const secondUser = await fetchUserDetails(users[1], connection);
    const ownerUserObj = await chatUserRepo.create(
      {
        channel_id: obj_id,
        user_id: users[0],
        user_name: ownerUser.raw_user_meta_data.username,
        other_user: users[1],
        channel_name: secondUser.raw_user_meta_data.username,
      },
      chatUserTableFields
    );
    usersData.push(ownerUserObj);
    const secondUserObj = await chatUserRepo.create(
      {
        channel_id: obj_id,
        user_id: users[1],
        user_name: secondUser.raw_user_meta_data.username,
        other_user: users[0],
        channel_name: ownerUser.raw_user_meta_data.username,
      },
      chatUserTableFields
    );
    usersData.push(secondUserObj);
    return { result: { channel: data, users: usersData } };

  } catch (ex: any) {
    return getErrorObject("Something went wrong" + ex.message);
  }
};

export const getChannel = async (
  connection: Knex.Transaction
): Promise<any | IError> => {
  const channel = new CrudRepository<IChannel>(connection, 'channel');
  const data = await channel
    .knexObj()
    .join("channel", "channel.owner", "private_profiles.id")
  return data;
};

async function fetchUserDetails(id: string,
  connection: Knex.Transaction): Promise<any> {
  const user_list = new CrudRepository<IUser>(connection, TABLE_NAMES.USERS);
  const data = await user_list.knexObj().where("id", id)
    .first();
  return data;
}
