import { Knex } from "knex";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import { UsersRepository } from "../database/repositories/users-repository";
import { matchDisputeRepository } from "../database/repositories/match-dispute-repository";
import { IMatchDisputeResponse } from "./i-matchDispute-response";
import { getErrorObject } from "../common/helper/utils.service";

export interface IAddToMatchDisputeRequest {
    tournamentId: string;
    matchId: string;
    status: string;
    reportedBy: string;
}

export const addToMatchDisputeList = async (
    req: IAddToMatchDisputeRequest,
    context: PerRequestContext
): Promise<IMatchDisputeResponse | undefined> => {
    const transaction = context.transaction as Knex.Transaction;
    const matchDisputeRepo = new matchDisputeRepository(transaction);

    const result = await matchDisputeRepo.create({
        tournamentId: req.tournamentId,
        matchId: req.matchId,
        status: req.status,
        reportedBy: context.user?.id || "",
    });
    return result;
};

const findUserWithFAM = async (
    userId: string,
    details: any,
    connection: Knex.Transaction
): Promise<any> => {
    const userRepo = new UsersRepository(connection);
    const userDetails = await userRepo.findById(userId);
    return {
        ...details,
        reportedBy: {
            ...userDetails.raw_user_meta_data
        }
    };
};

export interface IListMatchDisputeRequest {
    tournamentId: number;
}

export const listMatchDispute = async (
    tournamentId: string,
    context: PerRequestContext
): Promise<IMatchDisputeResponse | undefined> => {
    const transaction = context.transaction as Knex.Transaction;
    const matchDisputeRepo = new matchDisputeRepository(transaction);
    const disputeList = await matchDisputeRepo.find({ tournamentId });
    let result = [];

    if (disputeList?.length){
        const batch = disputeList.map((item) => findUserWithFAM(item.reportedBy, item, transaction))
        result = await Promise.all(batch)
    }

    return result;
};

export interface IUpdateToMatchDisputeRequest {
    id: string;
    status: string;
}

export const updateToMatchDisputeList = async (
    req: IUpdateToMatchDisputeRequest,
    context: PerRequestContext
): Promise<IMatchDisputeResponse | undefined> => {
    const transaction = context.transaction as Knex.Transaction;
    const matchDisputeRepo = new matchDisputeRepository(transaction);

    const result = await matchDisputeRepo.update(req.id, {status: req.status});
    return result;
};