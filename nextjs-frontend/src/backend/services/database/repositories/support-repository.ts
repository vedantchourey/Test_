import { Knex } from 'knex';
import { BaseRepository } from './base-repository';
import { ISupport } from '../models/i-support';
const keys = ["id", 
    "message",
    "type",
    "user_id",
    "subject",
    "created_at",
    "status"
];
export class SupportRepository extends BaseRepository<ISupport> {
  constructor(transaction: Knex.Transaction) {
    super(transaction, 'support');
  }  

  async createTicket(news: any): Promise<string> {
    const ids = await this.entities()
                          .insert(news)
                          .returning('id');
    return ids[0] as string;
  }

  async lastId(): Promise<string> {
    const count = await this.entities().count()
    if(parseInt(count[0]?.count || 0)){
      const ids = await this.entities()
      // .order('created_at', { ascending: false })
      .offset(parseInt(count[0]?.count || 0) - 1)
      .limit(1)
      .select("id")
      return ids[0] as string;
    } 
      return null as any
    
  }

  async getNewsUsingId(id: string): Promise<ISupport | any> {
    return await this.entities()
               .select('*')
               .where({id: id})
               .first()
  }

  async fetch(req: any): Promise<any> {

    const list = await this.entities()
    .offset((parseInt(req.page || 0) - 1) * parseInt(req.limit || 0))
    .limit(parseInt(req.limit || 0))
    // .join("profiles", "profiles.id", "support.user_id")
    .select(...keys)

    const count = await this.entities().count()

    return { list: list, count: parseInt(count[0]?.count) || 0}
  }

  async fetchUserList(user_id: string | undefined): Promise<ISupport[]> {
    return await this.entities()
    .where({user_id: user_id})
               .select(...keys);
  }

  async update(support: ISupport): Promise<ISupport> {
    const updatedItems = await this.entities()
        .where("id", support.id)
        .update(support, keys);
    return updatedItems[0];
  }

  async delete(id: string): Promise<ISupport | undefined> {
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
