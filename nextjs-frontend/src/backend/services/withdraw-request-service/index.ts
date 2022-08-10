import { Knex } from "knex";
import { STATUS, TABLE_NAMES } from "../../../models/constants";
import { IError, ISuccess } from "../../utils/common/Interfaces";
import { getErrorObject } from "../common/helper/utils.service";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IWithdrawRequest } from "../database/models/i-withdraw-request";
import { IPrivateProfile } from "../database/models/i-private-profile";


export const fetchWithdrawRequest = async (connection: Knex.Transaction): Promise<ISuccess | IError> => {
    try {
        const withdrawRequest = new CrudRepository<IWithdrawRequest>(connection, TABLE_NAMES.WITHDRAWREQUEST);
        const result = await withdrawRequest
          .knexObj()
          .join(
            TABLE_NAMES.PRIVATE_PROFILE,
            "withdraw_request.userId",
            "private_profiles.id"
          )
          .select("withdraw_request.id")
          .select("withdraw_request.status")
          .select("withdraw_request.created_at")
          .select("private_profiles.id as user_id")
          .select("private_profiles.withdrawAmount")
          .select("private_profiles.firstName")
          .select("private_profiles.lastName")
          .where("withdraw_request.status",STATUS.PENDING);
        return { result };
    } catch (ex: any) {
        return getErrorObject("Something went wrong" + ex.message)
    }
}

export const addWithdrawRequest = async (req: any, connection: Knex.Transaction): Promise<ISuccess | IError> => {
    try {
        const withdrawRequest = new CrudRepository<IWithdrawRequest>(connection, TABLE_NAMES.WITHDRAWREQUEST);
        const findExistingRequest: any[] = await withdrawRequest.find({
          userId: req.userId,
          status: "PENDING",
        });
        if (findExistingRequest.length) {
          return getErrorObject("Withdraw Request is already submitted.");
        }
        const result = withdrawRequest.create(req);

        return { result };
    } catch (ex: any) {
        return getErrorObject("Something went wrong" + ex.message)
    }
}

export const resolveWithdrawRequest = async (req: any, connection: Knex.Transaction): Promise<ISuccess | IError> => {
    try {
        const withdrawRequest = new CrudRepository<IWithdrawRequest>(
          connection,
          TABLE_NAMES.WITHDRAWREQUEST
        );
        const result = await withdrawRequest.update(
          { status: STATUS.ACCEPTED },
          { id: req.id }
        );
        const users = new CrudRepository<IPrivateProfile>(
          connection,
          TABLE_NAMES.PRIVATE_PROFILE
        );
        await users.update({ withdrawAmount: 0 }, { id: result.userId });
        return { result };
    } catch (ex: any) {
        return getErrorObject("Something went wrong" + ex.message)
    }
}

