import { Knex } from "knex";
import { TABLE_NAMES } from "../../../models/constants";
import { getErrorObject } from "../common/helper/utils.service";
import { IKYC } from "../database/models/i-kyc";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IVerifyKYC } from "./i-kyc-interfaces";
import { validateKYCReq } from "./i-kyc-validator";
import axios from "axios";
import frontendConfig from "../../../frontend/utils/config/front-end-config";

export const verifyKYC = async (
  connection: Knex,
  user: any,
  req: IVerifyKYC
): Promise<any> => {
  try {
    const errors = await validateKYCReq(req);
    if (errors) return { errors };

    const kycRepo = new CrudRepository<IKYC>(
      connection,
      TABLE_NAMES.KYC_DETAILS
    );
    
    return await kycRepo.create({
      user_id: user?.id,
      mobile: req.mobile,
      account_no: req.accNo,
      ifsc: req.ifsc,
      name: req.name,
      aadhar_no: req.aadhar_no,
      acc_type: req.acc_type,
      bank_name: req.bank_name,
    });
  } catch (e) {
    return getErrorObject("Aadhar and bank verification failed");
  }
};

export const fetchKycData = async (connection: Knex, user: any, req: any): Promise<any> => {
  return axios({
    method: 'post',
    url: `${frontendConfig.VERIFY_AADHAAR_KYC_URL}/api/1.0/fetchKYCInfo`,
    headers: { 
      'Content-Type': 'application/json', 
      'Cookie': 'Path=/',
      "access-control-allow-origin" : "*",
    },
    data : req
  })
  .then(async function (response) {
    const aadharKycRaw = response.data.response_data.kyc_info
    const aadharData = JSON.parse(Buffer.from(aadharKycRaw, "base64").toString());
    const kycRepo = new CrudRepository<IKYC>(connection, TABLE_NAMES.KYC_DETAILS);
    return await kycRepo.create({
      user_id: user?.id,
      name: aadharData.original_kyc_info.name,
      aadhar_no: aadharData.original_kyc_info.document_id,
      aadhar_transaction_id: aadharData.original_kyc_info.document_id,
      aadhar_verification_data: aadharData,
    });
  })
  .catch(function () {
    return getErrorObject("Aadhar and bank verification failed");
  });
};

export const fetchKYC = async (connection: Knex, user: any): Promise<any> => {
  const kycRepo = new CrudRepository<IKYC>(connection, TABLE_NAMES.KYC_DETAILS);
  return await kycRepo.findBy("user_id", user?.id);
};
