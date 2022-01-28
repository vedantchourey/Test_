import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { IPost } from '../models/i-post';

interface IUpdatePost {
    postImgUrl?: string;
    postContent?: string;
}

export class PostsRepository extends BaseRepository<IPost>{
    constructor(transaction: Knex.Transaction) {
        super(transaction, 'posts');
    }

    async createPost(post: IPost) {
        return await this.entities().insert(post);
    }

    async getPostById(id: string) {
        return await this.entities().select('*').first().where('id', id)
    }

    async updatePost(id: string, update: IUpdatePost): Promise<any> {
        return await this.entities().where('id', id).update(update);
    }

}