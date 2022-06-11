import { Knex } from "knex";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { productsRepository } from "../database/repositories/products-repository";
import { IProductResponse } from "./i-Product-response";
import { IProduct } from "../database/models/i-product";

export const getAllProducts = async (
  context: PerRequestContext,
): Promise<IProductResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const productsRepo = new productsRepository(transaction);
  const result = await productsRepo.fetch();
  return result;
};

export const createProduct = async (
  req: IProduct,
  context: PerRequestContext
): Promise<IProductResponse | undefined> => {
  const transaction = context.transaction as Knex.Transaction;
  const productRepo = new productsRepository(transaction);
  const result = await productRepo.create(req);
  return result;
};
