import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { INews } from '../models/i-news';

const keys = ["id", 
    "title",
    "subtitle",
    "author",
    "image",
    "description",
    "created_at",
    "label"
];
export class NewsRepository extends BaseRepository<INews> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, 'news');
  }  

  async createNews(news: INews): Promise<string> {
    const ids = await this.entities()
                          .insert(news)
                          .returning('id');
    return ids[0] as string;
  }

  async getNewsUsingId(id: string): Promise<INews | any> {
    return await this.entities()
               .select('*')
               .where({id: id})
               .first()
  }

  async fetch(params?: any): Promise<INews[]> {
    return await this.entities()
      .select(...keys)
      .limit(params.limit || 1000);
  }

  async update(news: INews): Promise<INews> {
    const updatedItems = await this.entities()
        .where("id", news.id)
        .update(news, keys);
    return updatedItems[0];
  }

  async delete(id: string): Promise<INews | undefined> {
    return this.entities()
        .where({ id })
        .delete();
  }

}

// export class NewsRepositoryLess<T> {
//   constructor(
//     protected tableName: string
//   ) {}

//   async fetch(): Promise<INews[]> {
//     return await this.entities()
//                .select(...keys);
//   }
// }
