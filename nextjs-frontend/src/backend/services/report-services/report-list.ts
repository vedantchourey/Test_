import { Knex } from "knex";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { reportRepository } from "../database/repositories/report-post";
import { IReport } from "../database/models/i-report";
import { CrudRepository } from "../database/repositories/crud-repository";
import { TABLE_NAMES } from "../../../models/constants";

export const getAllRepost = async (
  connection: Knex.Transaction
): Promise<any | undefined> => {
  // const transaction = context.transaction as Knex.Transaction;
  // const reportRepo = new reportRepository(transaction);
  const reportRepo = new CrudRepository<IReport>(
    connection,
    TABLE_NAMES.REPORTED_POST
  );
  const result = await reportRepo
    .knexObj()
    .join("profiles", "profiles.id", "reported_post.reported_by")
    // .join("posts", "posts.id", "reported_post.post_id")
    // .join("profiles", "profiles.id", "reported_post.postedBy")
    .select("*");

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
