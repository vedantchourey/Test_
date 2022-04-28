import { Knex } from "knex";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { TransactionRepository } from "../database/repositories/transaction-repository";
import { ITransactionRequest } from "./i-transaction-request";
import { ITransactionResponse } from "./i-transaction-response";

export const createTransaction = async (
  req: ITransactionRequest,
  context: PerRequestContext
): Promise<ITransactionResponse | undefined> => {
  const transactionRepo = new TransactionRepository(
    context.transaction as Knex.Transaction
  );
  const data = await transactionRepo.create({
    userId: req?.userId,
    walletId: req.wallet_id,
    credit: req.amount,
    debit: 0,
    type: req.type,
  });

  return data;
};
