import { BaseRepository } from "./base-repository";
import { Knex } from "knex";
import { IWallet } from "../models/i-wallet";

export class WalletRepository extends BaseRepository<IWallet> {
  constructor(transaction: Knex.Transaction | Knex) {
    super(transaction, "wallet");
  }

  async create(wallet: IWallet): Promise<IWallet> {
    const createdItems = await this.entities().insert(wallet, ["id"]);
    return createdItems[0];
  }
  async findByUserId(id: string): Promise<IWallet | undefined> {
    return this.entities()
      .select("id")
      .select("userId")
      .select("balance")
      .select("updatedAt")
      .select("last_transaction_id")
      .where({ userId: id })
      .first();
  }

  async upadte(wallet: IWallet, where: IWallet): Promise<IWallet> {
    const updatedItems = await this.entities()
      .where(where)
      .update(wallet, ["id","balance"]);
    return updatedItems[0];
  }
}
