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
    return this.entities()
               .select('*')
               .leftJoin('profiles', 'posts.postedBy', 'profiles.id')
               .where("posts.id", "=", id)
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

}
