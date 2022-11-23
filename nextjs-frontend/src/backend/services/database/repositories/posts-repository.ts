import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { IPost, IPostResponse } from '../models/i-post';
import { nowAsJsDate } from '../../../../common/utils/date-time-utils';

interface IUpdatePost {
  postImgUrl: string;
  postContent: string;
}

export class PostsRepository extends BaseRepository<IPost> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, 'posts');
  }

  async createPost(post: IPost): Promise<string> {
    const ids = await this.entities()
                          .insert(post)
                          .returning('id');
    return ids[0] as string;
  }

  async getPostById(id: string): Promise<IPostResponse | undefined> {
    return await this.entities()
               .select('posts.*')
               .select('user.username', 'user.avatarUrl', 'user.id as userId')
               .leftJoin('profiles as user', 'posts.postedBy', 'user.id')
               .where("posts.id", "=", id)
               .first()
  }

  async getPostUsingId(id: string): Promise<IPost | undefined> {
    return await this.entities()
               .select('*')
               .where({id: id})
               .first()
  }

  async countPostById(id: string): Promise<number> {
    const result = await this.entities()
                             .where({id: id})
                             .count('id');
    return parseInt(result[0].count, 10);
  }

  async deletePost(id: string): Promise<number> {
    return this.entities()
               .where({id: id})
               .del();
  }

  updatePost(id: string, update: IUpdatePost): Promise<number> {
    return this.entities()
               .update({
                 postImgUrl: update.postImgUrl,
                 postContent: update.postContent,
                 updatedAt: nowAsJsDate()
               })
               .where({id: id});
  }

  updatePostImg(id: string, postImgUrl: string): Promise<number> {
    return this.entities()
               .update({
                 postImgUrl: postImgUrl
               })
               .where({id: id})
  }

  async delete(id: string): Promise<number> {
    return this.entities()
               .where({postedBy: id})
               .del();
  }

}
