import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IMatchDispute } from "../models/i-match-dispute";
const keys = ["id", "tournamentId", "matchId", "status", "reportedBy", "createdAt", "reason"];

export class matchDisputeRepository extends BaseRepository<IMatchDispute> {
    constructor(transaction: Knex.Transaction | Knex) {
        super(transaction, "match_dispute");
    }

    async create(transaction: IMatchDispute): Promise<IMatchDispute> {
        const createdItems = await this.entities().insert(transaction, ["id"]);
        return createdItems[0];
    }

    async update(id: any, data: any): Promise<number> {
        const updatedItems = await this.entities()
            .where("id", id)
            .update(data);
        return updatedItems;
    }

    async fetch(): Promise<IMatchDispute[]> {
        return this.entities()
            .select(...keys);
    }

    async find(query: any): Promise<IMatchDispute[] | undefined> {
        return this.entities()
            .select(...keys)
            .where(query);
    }

    async findById(id: any): Promise<IMatchDispute | undefined> {
        const fetchItem: IMatchDispute[] = await this.entities().select(...keys)
            .where({ id });
        return fetchItem[0]
    }
}
