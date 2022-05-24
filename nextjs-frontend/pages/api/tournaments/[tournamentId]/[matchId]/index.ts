import type { NextApiRequest, NextApiResponse } from "next";
import { createNextJsRouteHandler } from "../../../../../src/backend/utils/api-middle-ware/api-handler-factory";
import { PerRequestContext } from "../../../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import {
    beginTransactionMiddleWare,
    commitOrRollBackTransactionMiddleWare,
} from "../../../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { fetchMatchDetails } from "../../../../../src/backend/services/tournament-service/tournament-service";
import { createQueryParamsMiddleWare } from "../../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/query-validator-middle-ware";
import { uuidType } from "../../../../../src/backend/utils/api-middle-ware/query-param-middle-ware/types/uuid-type";
import { Knex } from "knex";
import { CrudRepository } from "../../../../../src/backend/services/database/repositories/crud-repository";
import { IBMatch } from "../../../../../src/backend/services/database/models/i-b-match";
import { TABLE_NAMES } from "../../../../../src/models/constants";
import { TournamentsRepository } from "../../../../../src/backend/services/database/repositories/tournaments-repository";

const paramsConfig = {
    tournamentId: {
        type: uuidType,
    },
};

const basicQueryParams = createQueryParamsMiddleWare({
    params: paramsConfig,
    async validate(
        params: { [p: string]: string | string[] },
        context: PerRequestContext
    ): Promise<string | undefined> {
        const { knexConnection } = context
        {
            const repository = new CrudRepository<IBMatch>(knexConnection as Knex, TABLE_NAMES.B_MATCH);

            const matchId = params["matchId"];
            const match: IBMatch = await repository.findById(matchId as string);
            if (match == null)
                return `Could not find match with matchId: ${matchId}`;
            context.match = match
        }
        {
            const repository = new TournamentsRepository(knexConnection as Knex);
            const tournamentId = params["tournamentId"];
            const tournament = await repository.getTournament(tournamentId as string);
            if (tournament == null)
                return `Could not find tournament with tournamentId: ${tournamentId}`;
            else
                context.tournament = tournament
        }
    },
});

export default createNextJsRouteHandler({
    get: {
        handler: async (
            req: NextApiRequest,
            res: NextApiResponse,
            context: PerRequestContext
        ) => {
            const result = await fetchMatchDetails(context);
            res.status(result.errors ? 400 : 200).json(result);
        },
        preHooks: [beginTransactionMiddleWare, basicQueryParams],
        postHooks: [commitOrRollBackTransactionMiddleWare],
    },
});
