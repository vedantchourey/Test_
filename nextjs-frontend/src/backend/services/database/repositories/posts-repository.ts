import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { IPost } from '../models/i-post';

export class PostsRepository extends BaseRepository<IPost>{
    constructor(transaction: Knex.Transaction) {
        super(transaction, 'posts');
    }

    async createPost(post: IPost) {
        return await this.entities().insert(post);
    }
}