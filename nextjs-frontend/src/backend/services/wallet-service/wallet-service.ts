import { Knex } from "knex";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { fetchUserById } from "../common/helper/utils.service";
import { WalletRepository } from "../database/repositories/wallet.respository";
import { createTransaction } from "../transaction-service.ts/transaction-service";
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
    let data = await createTransaction(
      { ...req, wallet_id: wallet.id },
      context
    );
    wallet.last_transaction_id = data?.id;
    wallet.balance = wallet.balance
      ? Number(wallet.balance) + Number(req.amount)
      : req.amount;
    let updated_data = await walletRepo.update(wallet, { id: wallet.id });
    return {
      ...updated_data,
      transaction_id: data?.id,
    };
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
    let data = await createTransaction(
      { ...req, wallet_id: wallet.id },
      context
    );
    wallet.last_transaction_id = data?.id;
    wallet.balance = wallet.balance
      ? Number(wallet.balance) - Number(req.amount)
      : req.amount;
    let updated_data = await walletRepo.update(wallet, { id: wallet.id });
    return {
      ...updated_data,
      transaction_id: data?.id,
    };
  } catch (ex) {
    if (context?.transaction) context?.transaction.rollback();
    return { errors: ["Something went wrong"] };
  }
};
