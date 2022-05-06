import { Knex } from "knex";
import { IPrivateProfile } from "../../database/models/i-private-profile";
import { PrivateProfilesRepository } from "../../database/repositories/private-profiles-repository";

export const fetchUserById = async (
  id: string,
  connection: Knex | Knex.Transaction
): Promise<IPrivateProfile | undefined> => {
  let data: IPrivateProfile | undefined = undefined;
  try {
    const repository = new PrivateProfilesRepository(connection as Knex);
    data = await repository.getProfileById(id);
  } catch (ex) {
    return undefined;
  }
  return data;
};
