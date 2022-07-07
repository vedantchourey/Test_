import { Knex } from "knex";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { reportRepository } from "../database/repositories/report-post";
import { IReport } from "../database/models/i-report";

export const getAllRepost = async (
  context: PerRequestContext,
): Promise<any | undefined> => {
  const transaction = context.transaction as Knex.Transaction;  
  const reportRepo = new reportRepository(transaction);
  const result = await reportRepo.fetch();
  
  return result;
};

// export const getProductById = async (
//   context: PerRequestContext,
//   req: any,
// ): Promise<any | undefined> => {
//   const transaction = context.transaction as Knex.Transaction;
//   const productsRepo = new productsRepository(transaction);
//   const result = await productsRepo.findById(req.id);
//   return result;
// };


export const createReport = async (
  req: IReport,
  context: PerRequestContext
): Promise<any | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const repostRepo = new reportRepository(transaction);
  
  req.reported_by = context.user?.id as string
  const result = await repostRepo.create(req);
  return result;
};
