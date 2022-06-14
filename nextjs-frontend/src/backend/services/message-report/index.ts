import { Knex } from "knex";
import { IError } from "../../utils/common/Interfaces";
import { getErrorObject } from "../common/helper/utils.service";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IMessages } from "../database/models/i-messages-report";


type IMessagesReportRequest = any;

export const createMessagesReport = async (
  connection: Knex.Transaction,
  user: any,
  req: IMessagesReportRequest
): Promise<IMessagesReportRequest | IError> => {
  try {

    const messageReportRepo = new CrudRepository<IMessages>(
      connection,
      "message_report"
    );

    const result = await messageReportRepo.create(req);

    return result;
  } catch (ex: any) {
    return getErrorObject("Something went wrong" + ex.message);
  }
};

export const getMessagesReport = async (
  connection: Knex.Transaction,
): Promise<IMessagesReportRequest | IError> => {
  const message_report = new CrudRepository<IMessages>(connection, 'message_report');
  const data = await message_report.knexObj().join("channel", "message_report.id", "channel.id");
  return data;
};
