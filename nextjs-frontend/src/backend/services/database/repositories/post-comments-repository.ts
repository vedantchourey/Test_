import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { IPostComments } from '../models/i-post-comments';

interface IUpdateComment {
    comment?: string;
    postId?: string;
}

export class PostCommentsRepository extends BaseRepository<IPostComments>{
    constructor(transaction: Knex.Transaction) {
        super(transaction, 'post_comments');
    }

    async createComment(comment: IPostComments) {
        return await this.entities().insert(comment);
    }

    async getCommentById(id: string) {
        return await this.entities().select('*').first().where('id', id)
    }

    async countCommentById(id: string): Promise<number> {
        const result = await this.entities().whereRaw("id = ?", [id])
                                 .count('id');
        return parseInt(result[0].count, 10);
      }

    async updateComment(id: string, update: IUpdateComment): Promise<any> {
        return await this.entities().where('id', id).update(update);
    }
}