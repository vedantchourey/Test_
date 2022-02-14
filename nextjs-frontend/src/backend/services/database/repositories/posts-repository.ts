import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { IPost } from '../models/i-post';
import { nowAsJsDate } from '../../../../common/utils/date-time-utils';

interface IUpdatePost {
  postImgUrl: string;
  postContent: string;
}

<<<<<<< HEAD
export class PostsRepository extends BaseRepository<IPost>{
=======
export class PostsRepository extends BaseRepository<IPost> {
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
  constructor(transaction: Knex.Transaction) {
    super(transaction, 'posts');
  }

<<<<<<< HEAD
  async createPost(post: IPost) {
    return await this.entities().insert(post);
  }

  async getPostById(id: string) {
    return await this.entities().select('*')
.first()
.where('id', id)
  }

  async countPostById(id: string): Promise<number> {
    const result = await this.entities().whereRaw("id = ?", [id])
            .count('id');
    return parseInt(result[0].count, 10);
  }

  async deletePost(id: string): Promise<any> {
    return await this.entities().where("id", id)
.del();
  }

  async updatePost(id: string, update: IUpdatePost): Promise<any> {
    return await this.entities().where('id', id)
.update(update);
  }

}
=======
  async createPost(post: IPost): Promise<string> {
    const ids = await this.entities()
                          .insert(post)
                          .returning('id');
    return ids[0] as string;
  }

  async getPostById(id: string): Promise<IPost | undefined> {
    return this.entities()
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

}
>>>>>>> 7e085c995fb3ba8e50714d58ad4a01415272908d
