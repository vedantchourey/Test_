import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { ILike } from '../models/i-like';

export class PostLikesRepository extends BaseRepository<object>{
    constructor(transaction: Knex.Transaction) {
        super(transaction, 'post_likes');
    }

    async createLike(like: ILike) {
        return await this.entities().insert(like);
    }

    async deleteLike(like: ILike) {
        return await this.entities().where({ postId: like.postId, likedBy: like.likedBy }).del();
    }

    async isLiked(postId: string, userId: string) {
        return await this.entities().select('id').where({ postId: postId, likedBy: userId }).first();
    }

}