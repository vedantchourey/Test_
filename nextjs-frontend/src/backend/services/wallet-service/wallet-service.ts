import { Knex } from "knex";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { fetchUserById } from "../common/helper/utils.service";
import { TransactionRepository } from "../database/repositories/transaction-repository";
import { WalletRepository } from "../database/repositories/wallet.respository";
import { IWalletRequest } from "./i-wallet-request";
import { IWalletResponse } from "./i-wallet-response";
import { validateWallet } from "./i-wallet-validator";

export const creditBalance = async (
  req: IWalletRequest,
  context: PerRequestContext
): Promise<IWalletResponse | undefined> => {
  try {
    const errors = await validateWallet(req);
    if (errors) return { errors };
    const user = await fetchUserById(req.userId, context.knexConnection as any);
    if (!user) {
      return { errors: ["Invalid User Id"] };
    }
    const walletRepo = new WalletRepository(
      context.transaction as Knex.Transaction
    );
    const wallet = await walletRepo.findByUserId(user.id);
    if (!wallet) {
      return { errors: ["Wallet not found"] };
    }
    const transactionRepo = new TransactionRepository(
      context.transaction as Knex.Transaction
    );
    const data = await transactionRepo.create({
      userId: wallet?.userId,
      walletId: wallet?.id,
      credit: req.amount,
      debit: 0,
      type: req.type,
    });
    wallet.last_transaction_id = data.id;
    wallet.balance = wallet.balance
      ? Number(wallet.balance) + Number(req.amount)
      : req.amount;
    return await walletRepo.upadte(wallet, { id: wallet.id });
  } catch (ex) {
    if (context?.transaction) context?.transaction.rollback();
    return { errors: ["Something went wrong"] };
  }
};

export const debitBalance = async (
  req: IWalletRequest,
  context: PerRequestContext
): Promise<IWalletResponse | undefined> => {
  try {
    const errors = await validateWallet(req);
    if (errors) return { errors };
    const user = await fetchUserById(req.userId, context.knexConnection as any);
    if (!user) {
      return { errors: ["Invalid User Id"] };
    }
    const walletRepo = new WalletRepository(
      context.transaction as Knex.Transaction
    );
    const wallet = await walletRepo.findByUserId(user.id);
    if (!wallet) {
      return { errors: ["Wallet not found"] };
    }
    if (wallet?.balance && wallet.balance < req.amount) {
      return {
        errors: ["Insufficient balance"],
      };
    }
    const transactionRepo = new TransactionRepository(
      context.transaction as Knex.Transaction
    );
    const data = await transactionRepo.create({
      userId: wallet?.userId,
      walletId: wallet?.id,
      debit: req.amount,
      credit: 0,
      type: req.type,
    });
    wallet.last_transaction_id = data.id;
    wallet.balance = wallet.balance
      ? Number(wallet.balance) - Number(req.amount)
      : req.amount;
    return await walletRepo.upadte(wallet, { id: wallet.id });
  } catch (ex) {
    if (context?.transaction) context?.transaction.rollback();
    return { errors: ["Something went wrong"] };
  }
};
