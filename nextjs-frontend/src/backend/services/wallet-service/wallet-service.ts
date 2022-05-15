import { Knex } from "knex";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { fetchUserById } from "../common/helper/utils.service";
import { ITransaction } from "../database/models/i-transaction";
import { TransactionRepository } from "../database/repositories/transaction-repository";
import { WalletRepository } from "../database/repositories/wallet.respository";
import { createTransaction } from "../transaction-service.ts/transaction-service";
import { IWalletRequest } from "./i-wallet-request";
import { IWalletResponse } from "./i-wallet-response";
import { validateWallet } from "./i-wallet-validator";

export const creditBalance = async (
  req: IWalletRequest,
  connection: Knex.Transaction,
  data: any = {}
): Promise<IWalletResponse | undefined> => {
  try {
    const errors = await validateWallet(req);
    if (errors) return { errors };

    const user = await fetchUserById(req.userId, connection as any);
    if (!user) {
      return { errors: ["Invalid User Id"] };
    }
    const walletRepo = new WalletRepository(
      connection as Knex.Transaction
    );
    const wallet = await walletRepo.findByUserId(user.id);
    if (!wallet) {
      return { errors: ["Wallet not found"] };
    }
    const trans_resp = await createTransaction(
      { ...req, wallet_id: wallet.id, data } as any,
      connection,
      "credit",
    );
    wallet.last_transaction_id = trans_resp?.id;
    wallet.balance = wallet.balance
      ? Number(wallet.balance) + Number(req.amount)
      : req.amount;
    const updated_data = await walletRepo.update(wallet, { id: wallet.id });
    return {
      ...updated_data,
      transaction_id: trans_resp?.id,
    };
  } catch (ex) {
    if (connection?.rollback) connection?.rollback();
    return { errors: ["Something went wrong"] };
  }
};

export const debitBalance = async (
  req: IWalletRequest,
  knexConnection: Knex.Transaction,
  data: any = {}
): Promise<IWalletResponse | undefined> => {
  try {
    const errors = await validateWallet(req);
    if (errors) return { errors };
    const user = await fetchUserById(req.userId, knexConnection as any);
    if (!user) {
      return { errors: ["Invalid User Id"] };
    }
    const walletRepo = new WalletRepository(
      knexConnection as Knex.Transaction
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
    const trans_resp = await createTransaction(
      { ...req, wallet_id: wallet.id, data },
      knexConnection as Knex.Transaction,
      "debit",
    );
    wallet.last_transaction_id = trans_resp?.id;
    wallet.balance = wallet.balance
      ? Number(wallet.balance) - Number(req.amount)
      : req.amount;
    const updated_data = await walletRepo.update(wallet, { id: wallet.id });
    return {
      ...updated_data,
      transaction_id: trans_resp?.id,
    };
  } catch (ex) {
    if (knexConnection.rollback) knexConnection.rollback();
    return { errors: ["Something went wrong"] };
  }
};

export const walletDetails = async (
  connection: Knex.Transaction,
  user_data: any
): Promise<{ wallet?: IWalletResponse, transaction?: ITransaction[] } | undefined | any> => {
  try {
    const user = await fetchUserById(user_data.id, connection as any);
    if (!user) {
      return { errors: ["Invalid User Id"] };
    }
    const walletRepo = new WalletRepository(
      connection as Knex.Transaction
    );
    const wallet = await walletRepo.findByUserId(user.id);
    if (!wallet) {
      return { errors: ["Wallet not found"] };
    }
    const transactionRepo = new TransactionRepository(
      connection as Knex.Transaction
    );
    const transaction: ITransaction[] | undefined = await transactionRepo.find({
      walletId: wallet.id
    })
    return { wallet, transaction }
  } catch (ex) {
    if (connection?.rollback) connection?.rollback();
    return { errors: ["Something went wrong"] };
  }
};
