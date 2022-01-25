import { BaseRepository } from './base-repository';
import { Knex } from 'knex';
import { ITournament } from '../models/i-tournament';

export class TournamentRepository extends BaseRepository<ITournament> {

  constructor(transaction: Knex.Transaction) {
    super(transaction, 'tournaments');
  }

  async create(tournament: ITournament): Promise<ITournament> {
    const createdItems = await this.entities()
      .insert(tournament, [
        'id',
        'tournamentName',
        'gameId',
        'platformId',
        'bestOfId',
        'mapId',
        'formatId',
        'scheduleDate',
        'rules',
        'isTeamParticipating',
        'numberOfParticipants',
        'tournamentType',
        'isOpenToPublic',
      ]);
    return createdItems[0];
  }

}
