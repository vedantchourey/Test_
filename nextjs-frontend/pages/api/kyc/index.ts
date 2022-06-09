import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import {
    beginTransactionMiddleWare,
    commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { NextApiRequest, NextApiResponse } from "next";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import { fetchTeams } from "../../../src/backend/services/team-service";
import { Knex } from "knex";
import { IError, ISuccess } from "../../../src/backend/utils/common/Interfaces";
import { authenticatedUserMiddleware } from "../../../src/backend/utils/api-middle-ware/auth-middle-ware";
import { aadharVarification, bankAccountVarification } from "../../../src/backend/utils/KYC/KYCUtils";

export default createNextJsRouteHandler({
    post: {
        handler: async (
            req: NextApiRequest,
            res: NextApiResponse<ServiceResponse<any, ISuccess | IError>>,
            context: PerRequestContext
        ) => {
            // const result = await aadharVarification("882441951970")
            const result = await bankAccountVarification({mobile: "9825866927", accNo: "77770101466296", ifsc: "FDRL0007777", name: "Patel Neel"})
            res
              .status(result.error ? 500 : 200)
              .json({ data: { errors: result.error, result: [result], message: "" } });
            // const result: any = await fetchTeams(context.transaction as Knex.Transaction, context.user as any, req.query as any);
            // res.status(result?.errors?.length ? 500 : 200).json(result)
        },
        preHooks: [beginTransactionMiddleWare],
        postHooks: [commitOrRollBackTransactionMiddleWare],
    },
});
