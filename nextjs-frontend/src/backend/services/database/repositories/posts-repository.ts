import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { IPost } from '../models/i-post';

interface IUpdatePost {
  postImgUrl?: string;
  postContent?: string;
  updatedAt: string
}

export class PostsRepository extends BaseRepository<IPost>{
  constructor(transaction: Knex.Transaction) {
    super(transaction, 'posts');
  }

  async createPost(post: IPost) {
    return await this.entities().insert(post);
  }

  async getPostById(id: string | undefined) {
    return await this.entities().select('*')
      .first()
      .where('id', id)
  }

  async countPostById(id: string): Promise<number> {
    const result = await this.entities().whereRaw("id = ?", [id])
      .count('id');
    return parseInt(result[0].count, 10);
  }

  async deletePost(id: string): Promise<object> {
    return await this.entities().where("id", id)
      .del();
  }

  async updatePost(id: string, update: IUpdatePost): Promise<object> {
    return await this.entities().where('id', id)
      .update(update);
  }

}