import { BaseRepository } from "./base-repository";
import { Knex } from "knex";

export class CrudRepository<T> extends BaseRepository<T> {
    constructor(protected transaction: Knex.Transaction | Knex,
        protected tableName: string) {
        super(transaction, tableName);
    }

    async create(data: any, fields: string[] = ["*"]): Promise<T> {
        const createdItems = await this.entities().insert(data, fields);
        return createdItems[0];
    }

    async update(data: any, query: any, fields: string[] = ["*"]): Promise<T> {
        const updatedItems = await this.entities()
            .where(query)
            .update(data, fields);
        return updatedItems[0];
    }

    async findById(id: string, fields: string[] = ["*"]): Promise<any> {
        const item = await this.entities().where("id", id).select(fields)
            .first();
        return item;
    }

    async find(query: any, fields: string[] = ["*"]): Promise<any> {
        const items = await this.entities().where(query).select(fields)
        return items;
    }
    async findBy(key: string, value: string, fields: string[] = ["*"]): Promise<any> {
        const items = await this.entities().where(key, value).select(fields)
        return items;
    }
}
