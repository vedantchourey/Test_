import { Knex } from "knex";
import { TABLE_NAMES } from "../../../../models/constants";
import { IPrivateProfile } from "../../database/models/i-private-profile";
import { ITournamentInvites } from "../../database/models/i-tournament-invites";
import { ITournament } from "../../database/models/i-tournaments";
import { CrudRepository } from "../../database/repositories/crud-repository";
import EloRank from 'elo-rank';

export const fetchUserById = async (
  id: string,
  connection: Knex | Knex.Transaction
): Promise<IPrivateProfile | undefined> => {
  let data: IPrivateProfile | undefined = undefined;
  try {
    const repository = new CrudRepository<ITournamentInvites>(connection, TABLE_NAMES.PRIVATE_PROFILE)
    data = await repository.findById(id);
  } catch (ex) {
    return undefined;
  }
  return data;
};

export const fetchTournamentById = async (
  id: string,
  connection: Knex | Knex.Transaction
): Promise<ITournament | undefined> => {
  let data: ITournament | undefined = undefined;
  try {
    const repository = new CrudRepository<ITournament>(connection, TABLE_NAMES.TOURNAMENTS)
    data = await repository.findById(id);
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

export function getErrorObject(msg = "Something went wrong"): { errors: string[] } {
  return { errors: [msg] }
}

export function getEloRating(winnerRating: number, loserRating: number): {
  winnerRating: number,
  loserRating: number,
} {
  const elo = new EloRank(32);
  //Gets expected score for first parameter
  const expectedScoreA = elo.getExpected(winnerRating, loserRating);
  const expectedScoreB = elo.getExpected(loserRating, winnerRating);

  //update score, 1 if won 0 if lost
  winnerRating = elo.updateRating(expectedScoreA, 1, winnerRating);
  loserRating = elo.updateRating(expectedScoreB, 0, loserRating);
  return {
    winnerRating,
    loserRating
  }
}