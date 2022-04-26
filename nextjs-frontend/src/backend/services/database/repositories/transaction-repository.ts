import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { ITransaction } from "../models/i-transaction";

export class TransactionRepository extends BaseRepository<ITransaction> {
  constructor(transaction: Knex.Transaction | Knex) {
    super(transaction, "transaction");
  }

  async create(transaction: ITransaction): Promise<ITransaction> {
    const createdItems = await this.entities().insert(transaction, ["id"]);
    return createdItems[0];
  }

  async upadte(
    transaction: ITransaction,
    where: ITransaction
  ): Promise<ITransaction> {
    const updatedItems = await this.entities()
      .where(where)
      .update(transaction, ["id"]);
    return updatedItems[0];
  }
}
