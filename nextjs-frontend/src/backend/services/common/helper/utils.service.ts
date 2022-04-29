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
