import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { IPostComments } from '../models/i-post-comments';

export class PostCommentsRepository extends BaseRepository<IPostComments>{
    constructor(transaction: Knex.Transaction) {
        super(transaction, 'post_comments');
    }

    async createComment(comment: IPostComments) {
        return await this.entities().insert(comment);
    }

}