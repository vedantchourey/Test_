import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { INewsLike } from '../models/i-news-like';

export class NewsLikesRepository extends BaseRepository<INewsLike> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, 'news_likes');
  }

  async createLike(like: INewsLike): Promise<string> {    
    const ids = await this.entities()
                          .insert(like)
                          .returning('id');
    return ids[0] as string;
  }

  getById(id: string): Promise<INewsLike | undefined> {
    return this.entities()
               .select('*')
               .where({ id: id })
               .first();
  }

  deleteLike(like: INewsLike): Promise<number> {
    return this.entities()
      .where({
        newsId: like.newsId,
        likedBy: like.likedBy
      })
      .del();
  }

}
