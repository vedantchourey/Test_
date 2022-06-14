import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IProduct } from "../models/i-product";

const keys = ["id", "created_at",
    "name",
    "image",
    "description",
    "amount",
    "product_code"
];
export class productsRepository extends BaseRepository<IProduct> {
    constructor(transaction: Knex.Transaction | Knex) {
        super(transaction, "products");
    }

    async create(transaction: IProduct): Promise<IProduct> {
        const createdItems = await this.entities().insert(transaction, ["id"]);
        return createdItems[0];
    }

    async fetch(): Promise<IProduct[]> {
        return this.entities()
            .select(...keys);
    }


    async find(query: any): Promise<IProduct[] | undefined> {
        return this.entities()
            .select(...keys)
            .where(query);
    }

    async findById(id: any): Promise<IProduct | undefined> {
        const fetchItem: IProduct[] = await this.entities().select(...keys)
            .where({ id });
        return fetchItem[0]
    }

    async delete(id: string): Promise<IProduct[] | undefined> {
        return this.entities()
            .where({ id })
            .delete();
    }

}
