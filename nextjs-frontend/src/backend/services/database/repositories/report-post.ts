import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IReport } from "../models/i-report";

const keys = [
    "id", 
    "created_at",
    "post_id",
    "reported_by"
];
export class reportRepository extends BaseRepository<IReport> {
    constructor(transaction: Knex.Transaction | Knex) {
        super(transaction, "reported_post");
    }

    async create(transaction: IReport): Promise<IReport> {
        const createdItems = await this.entities().insert(transaction, ["id"]);
        return createdItems[0];
    }

    async fetch(): Promise<IReport[]> {
        return this.entities()
             .select(...keys)
            // .select( "created_at","post_id","reported_by")
            // .select('reported_post.reported_by as id')
            // .leftJoin('profiles', 'reported_post.reported_by', 'profiles.id')
    }


    async find(query: any): Promise<IReport[] | undefined> {
        return this.entities()
            .select(...keys)
    }

    async findById(id: any): Promise<IReport | undefined> {
        const fetchItem: IReport[] = await this.entities().select(...keys)
            .where({ id });
        return fetchItem[0]
    }

    async delete(id: string): Promise<IReport[] | undefined> {
        return this.entities()
            .where({ id })
            .delete();
    }

}
