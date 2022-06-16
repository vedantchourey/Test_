import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IOrder } from "../models/i-order";

const keys = ["id", "created_at",
    "order_id",
    "products",
    "amount",
    "payment_status",
    "status",
    "paymentInfo"
];
export class orderRepository extends BaseRepository<IOrder> {
    constructor(transaction: Knex.Transaction | Knex) {
        super(transaction, "orders");
    }

    async create(order: IOrder): Promise<IOrder> {
        const createdItems = await this.entities().insert(order, ["id"]);
        return createdItems[0];
    }

    async update(order: IOrder): Promise<IOrder> {
        const updatedItems = await this.entities()
            .where("id", order.id)
            .update(order, ["id"]);
        return updatedItems[0];
    }


    async fetch(): Promise<IOrder[]> {
        return this.entities()
            .select(...keys);
    }


    async find(query: any): Promise<IOrder[] | undefined> {
        return this.entities()
            .select(...keys)
            .where(query);
    }

    async findById(id: any): Promise<IOrder | undefined> {
        const fetchItem: IOrder[] = await this.entities().select(...keys)
            .where({ id });
        return fetchItem[0]
    }

    async delete(id: string): Promise<IOrder[] | undefined> {
        return this.entities()
            .where({ id })
            .delete();
    }

}
