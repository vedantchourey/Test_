import { BaseRepository } from './base-repository';
import { Knex } from 'knex';
import { ITournament } from '../models/i-tournaments';

export class TournamentsRepository extends BaseRepository<ITournament> {

  constructor(transaction: Knex.Transaction) {
    super(transaction, 'tournamentsData');
  }

  async create(tournament: ITournament): Promise<ITournament> {
    const createdItems = await this.entities()
      .insert(tournament, [
        'id',
        'basic',
        'info',
        'settings',
        'bracketsMetadata',
        'streams',
        'status',
        'joinStatus',
        'createTemplateCode',
      ]);
    return createdItems[0];
  }

  async upadte(tournament: ITournament): Promise<ITournament> {
    const id = tournament.id;
    let data = {...tournament};
    delete data.id;
    const updatedItems = await this.entities()
      .update(data, [
        'basic',
        'info',
        'settings',
        'bracketsMetadata',
        'streams',
        'status',
        'joinStatus',
        'createTemplateCode',
      ]).where({id});
    return updatedItems[0];
  }

}
