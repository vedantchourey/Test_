import { Knex } from "knex";
import { IProfile } from "../../database/models/i-profile";
import { ProfilesRepository } from "../../database/repositories/profiles-repository";

export const fetchUserById = async (
  id: string,
  connection: Knex | Knex.Transaction
): Promise<IProfile | undefined> => {
  let data: IProfile | undefined = undefined;
  try {
    const repository = new ProfilesRepository(connection);
    data = await repository.getProfileById(id);
  } catch (ex) {
    return undefined;
  }
  return data;
};


export const randomString = (length: number): string => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

export function getErrorObject(msg: string = "Something went wrong") {
  return { errors: [msg] }
}