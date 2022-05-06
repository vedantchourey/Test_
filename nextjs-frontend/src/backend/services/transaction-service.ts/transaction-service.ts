import { Knex } from "knex";
import { TransactionRepository } from "../database/repositories/transaction-repository";
import { ITransactionRequest } from "./i-transaction-request";
import { ITransactionResponse } from "./i-transaction-response";

export const createTransaction = async (
  req: ITransactionRequest,
  context: Knex | Knex.Transaction,
  data: any = {}
): Promise<ITransactionResponse | undefined> => {
  const transactionRepo = new TransactionRepository(
    context as Knex.Transaction
  );
  const result = await transactionRepo.create({
    userId: req?.userId,
    walletId: req.wallet_id,
    credit: req.amount,
    debit: 0,
    type: req.type,
    data: data ? data : {}
  });

  return result;
};
