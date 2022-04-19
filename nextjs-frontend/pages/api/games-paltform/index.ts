import { createNextJsRouteHandler } from "../../../src/backend/utils/api-middle-ware/api-handler-factory";
import { authenticatedAdminUserMiddleware } from "../../../src/backend/utils/api-middle-ware/auth-middle-ware";
import {
  beginTransactionMiddleWare,
  commitOrRollBackTransactionMiddleWare,
} from "../../../src/backend/utils/api-middle-ware/transaction-middle-ware";
import { NextApiRequest, NextApiResponse } from "next";
import { ServiceResponse } from "../../../src/backend/services/common/contracts/service-response";
import { PerRequestContext } from "../../../src/backend/utils/api-middle-ware/api-middleware-typings";
import { fetchGames } from "../../../src/backend/services/games-service/games-service";
import _ from "lodash";
import { IGamePaltform } from "./interfaces";
export default createNextJsRouteHandler({
  get: {
    handler: async (
      req: NextApiRequest,
      res: NextApiResponse<ServiceResponse<any, IGamePaltform>>,
      context: PerRequestContext
    ) => {
      try {
        const result = await fetchGames(req, context);
        const groupByGame = _.groupBy(result, "gameName") as any;
        const formatResult: IGamePaltform[] = Object.keys(groupByGame).map(
          (x): IGamePaltform => ({
            gameName: x,
            id: groupByGame[x][0].gameId,
            platforms: groupByGame[x].map((game: any) => ({
              platformName: game.platformName,
              id: game.platformId,
            })),
          })
        );
        res.status(200).json({ data: formatResult as any });
      } catch (ex) {
        res.status(500);
      }
    },
    preHooks: [beginTransactionMiddleWare, authenticatedAdminUserMiddleware],
    postHooks: [commitOrRollBackTransactionMiddleWare],
  },
});
