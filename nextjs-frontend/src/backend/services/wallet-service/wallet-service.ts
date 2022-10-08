import { Knex } from "knex";
import { SendMailOptions } from "nodemailer";
import { fetchUserById } from "../common/helper/utils.service";
import { ITransaction } from "../database/models/i-transaction";
import { TransactionRepository } from "../database/repositories/transaction-repository";
import { WalletRepository } from "../database/repositories/wallet.respository";
// import { PrivateProfilesRepository } from "../database/repositories/private-profiles-repository";
import { sendEmail } from "../email-service";
import { createTransaction } from "../transaction-service.ts/transaction-service";
import { IWalletRequest } from "./i-wallet-request";
import { IWalletResponse } from "./i-wallet-response";
import { validateWallet } from "./i-wallet-validator";
import handlebars from "handlebars";
import path from "path";
import fs from "fs";
import moment from "moment";
import backendConfig from "../../utils/config/backend-config";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IUser } from "../database/models/i-user";
import { TABLE_NAMES } from "../../../models/constants";

export const creditBalance = async (
  req: IWalletRequest,
  connection: Knex.Transaction,
  data: any = {}
): Promise<IWalletResponse | undefined> => {
  try {
    const errors = await validateWallet(req);
    if (errors) return { errors };
    const usersRepo = new CrudRepository<IUser>(
      connection,
      TABLE_NAMES.USERS
    );

    const user = await fetchUserById(req.userId, connection as any);
    if (!user) {
      return { errors: ["Invalid User Id"] };
    }
    const walletRepo = new WalletRepository(connection as Knex.Transaction);
    const userDetails = await usersRepo.findById(req.userId);

    const wallet = await walletRepo.findByUserId(user.id);
    if (!wallet) {
      return { errors: ["Wallet not found"] };
    }
    const trans_resp = await createTransaction(
      { ...req, wallet_id: wallet.id, data } as any,
      connection,
      "credit"
    );
    wallet.last_transaction_id = trans_resp?.id;
    wallet.balance = wallet.balance
      ? Number(wallet.balance) + Number(req.amount)
      : req.amount;
      
    const updated_data = await walletRepo.update(wallet, { id: wallet.id });
    

    const templatesDirectory = path.join(process.cwd(), "emailTemplates");

    const filePath = path.join(templatesDirectory, "/invoice.html");
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);

    const total = backendConfig.credit_config.price_per_credit * Number(req.amount);
    const serviceCharge = (total * backendConfig.credit_config.credit_service_percentage) / 100;
    const subTotal = total + serviceCharge;
    const gst = (subTotal * backendConfig.credit_config.credit_gst_percentage) / 100;
    const totalAmount = subTotal + gst;

    const replacements = {
      appUrl: backendConfig.client.appUrl+"/assets/",
      invoiceNo: moment().format("YYYYDDMMHHMMSS"),
      date: moment().format("DD/MM/YYYY"),
      name: user.firstName + " " + user.lastName,
      qty: req.amount,
      amount: backendConfig.credit_config.price_per_credit,
      total,
      totalAmount,
      gst,
      subTotal,
      serviceCharge
    };
    const htmlToSend = template(replacements);

    const mailOptions: SendMailOptions = {
      from: "dev@noobstorm.gg",
      to: userDetails.email,
      subject: "Invoice",
      html: htmlToSend,
    };

    const response = await sendEmail(mailOptions);

    return {
      ...updated_data,
      data: response,
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
    const walletRepo = new WalletRepository(knexConnection as Knex.Transaction);
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
      "debit"
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
): Promise<
  { wallet?: IWalletResponse; transaction?: ITransaction[] } | undefined | any
> => {
  try {
    const user = await fetchUserById(user_data.id, connection as any);
    if (!user) {
      return { errors: ["Invalid User Id"] };
    }
    const walletRepo = new WalletRepository(connection as Knex.Transaction);
    const wallet = await walletRepo.findByUserId(user.id);
    if (!wallet) {
      return { errors: ["Wallet not found"] };
    }
    const transactionRepo = new TransactionRepository(
      connection as Knex.Transaction
    );
    const transaction: ITransaction[] | undefined = await transactionRepo.find({
      walletId: wallet.id,
    });
    return { wallet, transaction, user };
  } catch (ex) {
    if (connection?.rollback) connection?.rollback();
    return { errors: ["Something went wrong"] };
  }
};
