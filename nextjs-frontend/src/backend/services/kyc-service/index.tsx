import { Knex } from "knex";
import { TABLE_NAMES } from "../../../models/constants";
import { aadharVarification, bankAccountVarification, IBankAccountVarification } from "../../utils/KYC/KYCUtils";
import { getErrorObject } from "../common/helper/utils.service";
import { IKYC } from "../database/models/i-kyc";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IVerifyKYC } from "./i-kyc-interfaces";
import { validateKYCReq } from "./i-kyc-validator";

export const verifyKYC = async (connection: Knex, user: any, req: IVerifyKYC): Promise<any> => {
  const errors = await validateKYCReq(req);
  if (errors) return { errors };
  const disableSandBox = true;
  const [addhar_resp, bank_resp] = await Promise.all([aadharVarification(req.aadhar_no), bankAccountVarification(req as IBankAccountVarification)]);

  if (disableSandBox || (addhar_resp?.isVerified && bank_resp?.isVerified)) {
    const kycRepo = new CrudRepository<IKYC>(connection, TABLE_NAMES.KYC_DETAILS);
    return await kycRepo.create({
      user_id: user?.id,
      mobile: req.mobile,
      account_no: req.accNo,
      ifsc: req.ifsc,
      name: req.name,
      aadhar_no: req.aadhar_no,
      acc_type: req.acc_type,
      bank_name: req.bank_name,
      aadhar_transaction_id: addhar_resp?.transaction_id,
      bank_transaction_id: bank_resp?.transaction_id,
      bank_verification_data: bank_resp?.data,
      aadhar_verification_data: addhar_resp?.data,
    });
  } 
    return getErrorObject("Aadhar and bank verification failed");
  
};

export const fetchKYC = async (connection: Knex, user: any): Promise<any> => {
  const kycRepo = new CrudRepository<IKYC>(connection, TABLE_NAMES.KYC_DETAILS);
  return await kycRepo.findBy("user_id", user?.id);
};
