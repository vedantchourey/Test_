import { Knex } from "knex";
import { IRegisterTournament } from "../database/models/i-register-tournament";
import { ITournament } from "../database/models/i-tournaments";
import { TournamentsRepository } from "../database/repositories/tournaments-repository";
import BracketsCrud from "./brackets-crud";
import { BracketsManager } from "brackets-manager";
import { createKnexConnection } from "../database/knex";
import {
  STATUS,
  TABLE_NAMES,
  TOURNAMENT_TYPE_NUMBER,
} from "../../../models/constants";
import { CrudRepository } from "../database/repositories/crud-repository";
import { IBParticipants } from "../database/models/i-b-participant";
import {
  validateMatchResult,
  validateRegisterSingle,
  validateRegisterTeam,
} from "./i-brackets-validator";
import { IPrivateProfile } from "../database/models/i-private-profile";
import { addNotifications } from "../notifications-service";
import {
  fetchTournamentById,
  getEloRating,
  getErrorObject,
} from "../common/helper/utils.service";
import {
  addTournamentInvites,
  tournamentDetails,
} from "../tournament-service/tournament-service";
import { ITournamentInvites } from "../database/models/i-tournament-invites";
import { debitBalance } from "../wallet-service/wallet-service";
import _ from "lodash";
import { IError, ISuccess } from "../../utils/common/Interfaces";
import { IMatchResultRequest } from "./i-brackets-request";
import { IBMatch } from "../database/models/i-b-match";
import { ITeams } from "../database/models/i-teams";
import { IEloRatingHistory } from "../database/models/i-elo-rating-history";
import { IEloRating } from "../database/models/i-elo-rating";
import { PerRequestContext } from "../../utils/api-middle-ware/api-middleware-typings";
import backendConfig from "../../utils/config/backend-config";
import { INotifications } from "../database/models/i-notifications";
import { getRoundName } from "../../../frontend/services/get-round-name";

export const persistBrackets = async (req: ITournament): Promise<any> => {
  const connection = createKnexConnection();
  try {
    let tournament: any = await connection("b_tournament")
      .join("b_stage", "b_stage.tournament_id", "b_tournament.id")
      .where({ tournament_uuid: req.id })
      .select("b_stage.id as stage_id")
      .select("b_tournament.id as id");

    const manager = new BracketsManager(
      new BracketsCrud(connection as any) as any
    );
    let playerCount = Number(req?.bracketsMetadata?.playersLimit);
    playerCount = nextPowerOf2(playerCount);

    const grandFinal =
      req?.bracketsMetadata?.type !== "SINGLE" ? { grandFinal: "double" } : {};

    if (tournament && tournament.length) {
      await deleteBracket(connection, tournament[0].id, tournament[0].stage_id);
    } else {
      tournament = await connection("b_tournament")
        .insert({
          tournament_uuid: req.id,
        })
        .returning("*");
    }
    const data = {
      name:
        req?.bracketsMetadata?.type === "DOUBLE"
          ? "DOUBLE ELIMINATION"
          : "SINGLE ELIMINATION",
      tournamentId: Number(tournament[0].id),
      type:
        req?.bracketsMetadata?.type === "SINGLE"
          ? "single_elimination"
          : "double_elimination",
      seeding: new Array(playerCount).fill(0)
.map((x, i) => `${i}`),
      settings: { seedOrdering: ["natural"], ...grandFinal },
    };
    if (
      req?.bracketsMetadata?.type === "SINGLE" &&
      req?.bracketsMetadata.thirdPlace
    ) {
      data.settings = { ...data.settings, consolationFinal: true } as any;
    }
    await manager.create(data as any);
  } catch (ex) {
    console.error(ex);
  } finally {
    await connection.destroy();
  }
};

export const registerTournament = async (
  req: IRegisterTournament,
  knexConnection: Knex,
  user: any
): Promise<any> => {
  try {
    const tournamet: ITournament | null = await validateTournament(
      req.tournamentId,
      knexConnection
    );
    if (!tournamet) return { errors: ["Invalid Tournament id"] };

    if (tournamet?.settings?.tournamentFormat === "1v1") {
      const errors = await validateRegisterSingle(req);
      if (errors) return { errors };
    } else {
      const errors = await validateRegisterTeam(req);
      if (errors) return { errors };
    }

    if (req.is_team_registration) {
      return await sendTeamTournamentInvites(req, tournamet, knexConnection);
    }

    return await registerIndividualTournament(req, knexConnection, user);
  } catch (ex: any) {
    return getErrorObject(ex.message);
  }
};

export const sendTeamTournamentInvites = async (
  req: IRegisterTournament,
  tournament: ITournament,
  knexConnection: Knex
): Promise<any> => {
  if (!(await validateUser(req.user_list, knexConnection))) {
    return getErrorObject("Invalid user ids");
  }
  const playercount =
    TOURNAMENT_TYPE_NUMBER[tournament?.settings?.tournamentFormat || "1v1"];
  if (req.user_list.length !== playercount) {
    return getErrorObject(
      `Team registration should have ${playercount} players only`
    );
  }
  const participant = new CrudRepository<IBParticipants>(
    knexConnection,
    TABLE_NAMES.B_PARTICIPANT
  );

  // identify if there is empty slot for registration
  const slots = await participant
    .knexObj()
    .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
    .where({ "b_tournament.tournament_uuid": req.tournamentId })
    .whereNull("b_participant.team_id")
    .select("b_participant.id")
    .first();

  if (!slots) getErrorObject("Tournament is full");

  const existing_user = await participant
    .knexObj()
    .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
    .where({
      "b_tournament.tournament_uuid": req.tournamentId,
      "b_participant.team_id": req.team_id,
    });

  if (existing_user.length)
    return getErrorObject("Team already register for tournament");

  const invites = new CrudRepository<ITournamentInvites>(
    knexConnection,
    TABLE_NAMES.TOURNAMENT_INIVTES
  );
  const data = await invites
    .knexObj()
    .where({
      tournament_id: req.tournamentId,
      team_id: req.team_id,
      gameUniqueId: req.gameUniqueId,
    })
    .whereIn("status", ["PENDING", "ACCEPTED"])
    .whereIn("user_id", req.user_list);

  if (data.length === playercount) {
    return getErrorObject(
      `Tournament registration for per team reached. Cannot add more players`
    );
  }

  // handle when peviously invite send and one of them got rejected.
  if (data.length) {
    data.forEach((x: ITournamentInvites): void => {
      if (x.status === STATUS.ACCEPTED) {
        req.user_list = _.remove(req.user_list, (id) => id !== x.user_id);
      }
    });
  }

  // handle when some users have invites pending.
  const existing_invite = data.find((x: ITournamentInvites): boolean => {
    return x.status === "PENDING" && req.user_list.includes(x.user_id);
  });
  if (existing_invite) {
    return getErrorObject("Some users have invites pending");
  }

  const notifications: INotifications[] = [];
  const new_invites: any = [];

  req.user_list.forEach((id) => {
    notifications.push({
      type: "TOURNAMENT_INVITE",
      user_id: id,
      sent_by: req.userId,
      message: `You have new invitation for ${tournament.name}`,
      is_action_required: true,
      data: {
        tournament_id: req.tournamentId,
        request_by: req.userId,
        team_id: req.team_id,
      },
    });
    new_invites.push({
      user_id: id,
      tournament_id: req.tournamentId,
      team_id: req.team_id,
    });
  });
  await Promise.all([
    addNotifications(notifications, knexConnection),
    addTournamentInvites(new_invites, knexConnection),
  ]);
  return { message: "Team Registration successfull" };
};

export const registerIndividualTournament = async (
  req: IRegisterTournament,
  knexConnection: Knex,
  user: any
): Promise<IError | ISuccess> => {
  try {
    const participant = new CrudRepository<IBParticipants>(
      knexConnection,
      TABLE_NAMES.B_PARTICIPANT
    );
    const existing_user = await participant
      .knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({
        "b_tournament.tournament_uuid": req.tournamentId,
        "b_participant.user_id": user.id,
      });

    if (existing_user.length) return { errors: ["User already register"] };

    const data = await participant
      .knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({ "b_tournament.tournament_uuid": req.tournamentId })
      .whereNull("b_participant.user_id")
      .select("b_participant.id")
      .first();

    if (!data) getErrorObject("Tournament is full");

    const tournament: ITournament | undefined = await fetchTournamentById(
      req.tournamentId,
      knexConnection
    );

    if (!tournament) return getErrorObject("Invalid tournament Id");

    // Deducting amount from user if entry type as credit
    if (tournament?.settings?.entryType === "credit") {
      const wallet_result = await debitBalance(
        {
          userId: user.id,
          amount: Number(tournament?.settings?.entryFeeAmount),
          type: "TOURNAMENT REGISTRATION",
        },
        knexConnection as Knex.Transaction,
        { tournament_id: tournament?.id }
      );
      // handle wallet related errors

      if (wallet_result?.errors) {
        return wallet_result;
      }
    }

    await participant.update(
      { user_id: user.id, gameUniqueId: req.gameUniqueId },
      { id: data.id }
    );

    return { message: "User register in successfull" };
  } catch (ex) {
    return { errors: ["Invalid tournament id"] };
  }
};

export const registerTeamTournament = async (
  req: IRegisterTournament,
  knexConnection: Knex
): Promise<ISuccess | IError> => {
  try {
    const participant = new CrudRepository<IBParticipants>(
      knexConnection,
      TABLE_NAMES.B_PARTICIPANT
    );
    const existing_user = await participant
      .knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({
        "b_tournament.tournament_uuid": req.tournamentId,
        "b_participant.team_id": req.team_id,
      });

    if (existing_user.length) return { errors: ["Team already register"] };

    const data = await participant
      .knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({ "b_tournament.tournament_uuid": req.tournamentId })
      .whereNull("b_participant.team_id")
      .select("b_participant.id")
      .first();

    if (!data) getErrorObject("Tournament is full");

    await participant.update(
      { team_id: req.team_id, gameUniqueId: req.gameUniqueId },
      { id: data.id }
    );

    return { message: "Team register in successfull" };
  } catch (ex) {
    return { errors: ["Invalid tournament id"] };
  }
};
export const checkInTournament = async (
  req: IRegisterTournament,
  knexConnection: Knex,
  user: any
): Promise<any> => {
  try {
    const tournamet: ITournament | null = await validateTournament(
      req.tournamentId,
      knexConnection
    );
    if (!tournamet) return { errors: ["Invalid Tournament id"] };

    if (tournamet?.settings?.tournamentFormat === "1v1") {
      return await checkInIndividualTournament(req, knexConnection, user);
    }
    return await checkInTeamTournament(req, knexConnection, user);
  } catch (ex: any) {
    return getErrorObject(ex.message);
  }
};
export const checkInIndividualTournament = async (
  req: IRegisterTournament,
  knexConnection: Knex,
  user: any
): Promise<any> => {
  try {
    const participant = new CrudRepository<IBParticipants>(
      knexConnection,
      TABLE_NAMES.B_PARTICIPANT
    );
    const existing_user = await participant
      .knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({
        "b_tournament.tournament_uuid": req.tournamentId,
        "b_participant.user_id": user.id,
      })
      .select("b_participant.id")
      .select("b_participant.is_checked_in")
      .first();

    if (!existing_user) return { errors: ["User not register"] };

    if (existing_user.is_checked_in)
      return { errors: ["User already checked in"] };

    await participant.update({ is_checked_in: true }, { id: existing_user.id });

    return { message: "User check in successfull" };
  } catch (ex) {
    return { message: "Something went wrong" };
  }
};

export const checkInTeamTournament = async (
  req: IRegisterTournament,
  knexConnection: Knex,
  user: any
): Promise<any> => {
  try {
    const repo = new CrudRepository<IBParticipants>(
      knexConnection,
      TABLE_NAMES.TOURNAMENT_INIVTES
    );

    const [invite] = await repo.find({
      tournament_id: req.tournamentId,
      user_id: user.id,
    });
    if (!invite) return getErrorObject("User not part of the tournament team");

    const participant = new CrudRepository<IBParticipants>(
      knexConnection,
      TABLE_NAMES.B_PARTICIPANT
    );
    const existing_user = await participant
      .knexObj()
      .join("b_tournament", "b_participant.tournament_id", "b_tournament.id")
      .where({
        "b_tournament.tournament_uuid": req.tournamentId,
        "b_participant.team_id": invite.team_id,
      })
      .select("b_participant.id")
      .select("b_participant.is_checked_in")
      .first();

    if (!existing_user) return { errors: ["Team not register"] };

    if (existing_user.is_checked_in)
      return { errors: ["Team already checked in"] };

    await participant.update({ is_checked_in: true }, { id: existing_user.id });

    return { message: "Team check in successfull" };
  } catch (ex) {
    return { message: "Something went wrong" };
  }
};

export const submitMatchResultRequest = async (
  req: IMatchResultRequest,
  knexConnection: Knex,
  user: any
): Promise<any> => {
  try {
    const errors = await validateMatchResult({
      id: req.id,
      match_id: req.match_id,
      opponent1: req.opponent1,
      opponent2: req.opponent2,
      screenshot: req.screenshot,
      tournament_id: req.tournament_id,
    });
    if (errors) return { errors };
    const repo = new CrudRepository<IMatchResultRequest>(
      knexConnection,
      TABLE_NAMES.MATCH_RESULT_REQUEST
    );
    const result = await repo.create({
      id: req.id,
      match_id: req.match_id,
      opponent1: req.opponent1,
      opponent2: req.opponent2,
      screenshot: req.screenshot,
      tournament_id: req.tournament_id,
    });
    const tournamentRepo = new CrudRepository<ITournament>(
      knexConnection,
      TABLE_NAMES.TOURNAMENTS
    );

    const tournament: ITournament = await tournamentRepo.findById(
      req.tournament_id
    );

    if (tournament.settings?.ScoreReporting === "ADMIN_PLAYER") {
      const notifications = req.notification_user_ids.filter((i) => i !== null).map((uid) => ({
        type: "MATCH_RESULT",
        user_id: uid,
        sent_by: user.id,
        message: `${user?.user_metadata?.username} reported the match score for ${tournament.name}.`,
        is_action_required: true,
        data: {
          id: result.id,
          status: "RESOLVED",
          tournament_id: result.tournament_id,
          opponent1Id: result.opponent1.id,
          opponent2Id: result.opponent2.id,
          screenshot: result.screenshot,
        },
      }));
      if(req.notification_user_ids.filter((i) => i !== null).length){
        await addNotifications(notifications, knexConnection);
      }
    }

    return result;
  } catch (ex) {
    return getErrorObject();
  }
};

export const submitMatchResult = async (
  req: any,
  knexConnection: Knex,
  context: PerRequestContext
): Promise<any> => {
  try {
    const repos = new CrudRepository<IMatchResultRequest>(
      knexConnection,
      TABLE_NAMES.MATCH_RESULT_REQUEST
    );

    const tournamentData: any = await tournamentDetails(
      context,
      req.tournament_id
    );

    const pricePool = tournamentData?.data?.pricingDetails?.currentPricePool;
    const price_per_credit = backendConfig.credit_config.price_per_credit;
    const playersLimit =
      tournamentData?.data?.bracketsMetadata?.playersLimit || 2;
    const threrPrize =
      (tournamentData?.data?.bracketsMetadata?.type === "SINGLE" &&
        tournamentData?.data?.bracketsMetadata?.thirdPlace) ||
      (tournamentData?.data?.bracketsMetadata?.type !== "SINGLE" &&
        playersLimit > 2);

    const firstWinerPrice = (
      (tournamentData?.data?.settings?.entryType === "credit"
        ? pricePool * (threrPrize ? 0.6 : 0.65) * price_per_credit
        : threrPrize
        ? 600
        : 700) *
      parseInt(tournamentData?.data?.settings?.tournamentFormat[0] || "1")
    ).toFixed();

    const secondWinerPrice = (
      (tournamentData?.data?.settings?.entryType === "credit"
        ? pricePool * (threrPrize ? 0.3 : 0.35) * price_per_credit
        : 300) *
      parseInt(tournamentData?.data?.settings?.tournamentFormat[0] || "1")
    ).toFixed();

    const thirdWinerPrice = (
      (tournamentData?.data?.settings?.entryType === "credit"
        ? pricePool * 0.1 * price_per_credit
        : 100) *
      parseInt(tournamentData?.data?.settings?.tournamentFormat[0] || "1")
    ).toFixed();

    let data: any;
    if (!req.forceUpdate) {
      data = await repos.findById(req.id);
      if (!data) return getErrorObject("Invalid match Id");
      data = {
        ...data,
        opponent1: { ...data.opponent1, user_id: req.opponent1Id },
        opponent2: { ...data.opponent2, user_id: req.opponent2Id },
      };
    } else {
      data = {
        match_id: req.id,
        opponent1: req.opponent1,
        opponent2: req.opponent2,
        screenshot: "",
        tournament_id: req.tournament_id,
      };
    }

    const repo = new CrudRepository<IBMatch>(
      knexConnection,
      TABLE_NAMES.B_MATCH
    );
    const match: IBMatch = await repo.findById(data?.match_id);

    const manager = new BracketsManager(
      new BracketsCrud(knexConnection as any) as any
    );

    await manager.update.match({
      id: Number(match.id),
      opponent1: match.opponent1.id
        ? {
            id: Number(match.opponent1.id),
            score: data.opponent1.score,
            result: data.opponent1.result as any,
            forfeit: req?.opponent1?.forfeit,
          }
        : {
            id: match.opponent1.id ? Number(match.opponent1.id) : null,
            forfeit: true,
          },
      opponent2: match.opponent2.id
        ? {
            id: Number(match.opponent2.id),
            score: data.opponent2.score,
            result: data.opponent2.result as any,
            forfeit: req?.opponent2?.forfeit,
          }
        : {
            id: match.opponent2.id ? Number(match.opponent2.id) : null,
            forfeit: true,
          },
    });

    let winningPrice: any;
    let losserPrice: any;

    const winnerPlayer =
      data.opponent1.result === "lose"
        ? data.opponent2.user_id
        : data.opponent1.user_id;

    const losserPlayer =
      data.opponent1.result !== "lose"
        ? data.opponent2.user_id
        : data.opponent1.user_id;

    const matchDetials: any = getRoundName(
      tournamentData?.data?.brackets?.group,
      tournamentData?.data?.brackets?.match,
      tournamentData?.data?.brackets?.round,
      match.id,
      tournamentData?.data?.brackets.stage[0].type,
      true
    );

    if (matchDetials.type === "final") {
      winningPrice = firstWinerPrice;
      losserPrice = secondWinerPrice;
    }
    if (matchDetials.type === "semi-final") {
      losserPrice = thirdWinerPrice;
    }
    if (matchDetials.type === "third-place") {
      winningPrice = thirdWinerPrice;
    }

    if (winningPrice > 0) {
      if (tournamentData?.data?.settings?.tournamentFormat === "1v1") {
        const users = new CrudRepository<IPrivateProfile>(
          knexConnection,
          TABLE_NAMES.PRIVATE_PROFILE
        );
        const data = await users.knexObj().where("id", winnerPlayer);
        await users.update(
          {
            withdrawAmount:
              parseInt(data[0]?.withdrawAmount || 0) + parseInt(winningPrice),
          },
          { id: winnerPlayer }
        );
      } else {
        const participantRepo = new CrudRepository<IBParticipants>(
          knexConnection,
          TABLE_NAMES.B_PARTICIPANT
        );
        const data = await participantRepo.findById(winnerPlayer);
        const playersByTeam = _.groupBy(
          tournamentData?.data?.playerList,
          "team_id"
        );
        const players = Object.keys(
          _.groupBy(playersByTeam[data.team_id][0].players, "id")
        );
        const teamWinningAmount = winningPrice / players.length;

        Promise.all(
          players.map(async (u_id) => {
            const users = new CrudRepository<IPrivateProfile>(
              knexConnection,
              TABLE_NAMES.PRIVATE_PROFILE
            );
            const data = await users.knexObj().where("id", u_id);
            await users.update(
              {
                withdrawAmount:
                  parseInt(data[0]?.withdrawAmount || 0) + teamWinningAmount,
              },
              { id: u_id }
            );
          })
        )
          .catch((e) => console.error("Error -> ", e));
      }
    }

    if (losserPrice > 0) {
      if (tournamentData?.data?.settings?.tournamentFormat === "1v1") {
        const users = new CrudRepository<IPrivateProfile>(
          knexConnection,
          TABLE_NAMES.PRIVATE_PROFILE
        );
        const data = await users.knexObj().where("id", losserPlayer);
        
        await users.update(
          {
            withdrawAmount:
              parseInt(data[0]?.withdrawAmount || 0) + parseInt(losserPrice),
          },
          { id: losserPlayer }
        );
      } else {
        const participantRepo = new CrudRepository<IBParticipants>(
          knexConnection,
          TABLE_NAMES.B_PARTICIPANT
        );
        const data = await participantRepo.findById(losserPlayer);
        if(data.team_id){
          const playersByTeam = _.groupBy(
            tournamentData?.data?.playerList,
            "team_id"
          );
          const players = Object.keys(
            _.groupBy(playersByTeam[data.team_id][0].players, "id")
          );
          const teamWinningAmount = losserPrice / players.length;
  
          Promise.all(
            players.map(async (u_id) => {
              const users = new CrudRepository<IPrivateProfile>(
                knexConnection,
                TABLE_NAMES.PRIVATE_PROFILE
              );
              const data = await users.knexObj().where("id", u_id);
              await users.update(
                {
                  withdrawAmount:
                    parseInt(data[0]?.withdrawAmount || 0) + teamWinningAmount,
                },
                { id: u_id }
              );
            })
          );
        }
      }
    }

    await Promise.all([
      updateELORating(match, data, knexConnection),
      repo.update({ screenshot: data.screenshot }, { id: Number(match.id) }),
      !req.forceUpdate ? closeMatchResultRequest(data, knexConnection) : {},
    ]);

    return match;
  } catch (ex) {
    console.error("ex => ", ex);
    
    return getErrorObject("Something went wrong");
  }
};

export const fetchMatchResultsReq = async (
  req: any,
  knexConnection: Knex
): Promise<any> => {
  try {
    if (!req.tournament_id)
      return getErrorObject("Please provide tournament Id");
    const repo = new CrudRepository<IMatchResultRequest>(
      knexConnection,
      TABLE_NAMES.MATCH_RESULT_REQUEST
    );
    const participantRepo = new CrudRepository<IBParticipants>(
      knexConnection,
      TABLE_NAMES.B_PARTICIPANT
    );
    const profileRepo = new CrudRepository<IPrivateProfile>(
      knexConnection,
      "profiles"
    );
    const teamRepo = new CrudRepository<IPrivateProfile>(
      knexConnection,
      "teams"
    );

    const result = await repo
      .knexObj()
      .join("b_match", "b_match.id", "match_result_request.match_id")
      .where({ tournament_id: req.tournament_id })
      .select("*")
      .select("match_result_request.status as result_status")
      .select("match_result_request.id as id")
      .select("match_result_request.opponent1 as opponent1")
      .select("match_result_request.opponent2 as opponent2")
      .select("b_match.opponent1 as m_opponent1")
      .select("b_match.opponent2 as m_opponent2")
      .select("match_result_request.screenshot as screenshot");

    const resultFinal = await Promise.all(
      result.map(async (r: any) => {
        const player1 = await participantRepo
          .knexObj()
          .where({ id: r.m_opponent1.id })
          .select();

        let player1Data = [{}];
        let player2Data = [{}];

        const player2 = await participantRepo
          .knexObj()
          .where({ id: r.m_opponent2.id })
          .select();

        if (player1?.[0]?.team_id || player2?.[0]?.team_id) {
          player1Data = player1[0].team_id
            ? await teamRepo
                .knexObj()
                .where("id", player1[0].team_id)
                .select("name")
            : [{}];

          player2Data = player2[0].team_id
            ? await teamRepo
                .knexObj()
                .where("id", player2[0].team_id)
                .select("name")
            : [{}];
        } else {
          player1Data = player1[0].user_id
            ? await profileRepo
                .knexObj()
                .where("id", player1[0].user_id)
                .select()
            : [{}];
          player2Data = player1[0].user_id
            ? await profileRepo
                .knexObj()
                .where("id", player2[0].user_id)
                .select()
            : [{}];
        }

        const opponent1 = {
          ...r.opponent1,
          player: { ...player1[0], ...player1Data[0] },
        };
        const opponent2 = {
          ...r.opponent2,
          player: { ...player2[0], ...player2Data[0] },
        };

        return { ...r, opponent1, opponent2 };
      })
    );

    return resultFinal;
  } catch (ex) {
    return getErrorObject();
  }
};

export const closeMatchResultRequest = (
  data: any,
  knexConnection: Knex
): Promise<any> => {
  const repos = new CrudRepository<IMatchResultRequest>(
    knexConnection,
    TABLE_NAMES.MATCH_RESULT_REQUEST
  );
  return Promise.all([
    repos.update({ status: STATUS.ACCEPTED }, { id: data.id }),
    repos
      .knexObj()
      .update({ status: STATUS.REJECTED })
      .whereNot({ id: data.id })
      .where({
        tournament_id: data.tournament_id,
      }),
  ]);
};

export const updateELORating = async (
  match: IBMatch,
  req: IMatchResultRequest,
  knexConnection: Knex
): Promise<any> => {
  const partRepo = new CrudRepository<IBParticipants>(
    knexConnection,
    TABLE_NAMES.B_PARTICIPANT
  );
  const players: IBParticipants[] = await partRepo
    .knexObj()
    .whereIn("id", [match.opponent1.id, match.opponent2.id]);
  const player1: IBParticipants =
    players.find((x) => x.id === match.opponent1.id) || players[0];
  const player2: IBParticipants =
    players.find((x) => x.id === match.opponent2.id) || players[1];
  const game_id = await getGameId(req, knexConnection);
  const eloHistoryRepo = new CrudRepository<IEloRatingHistory>(
    knexConnection,
    TABLE_NAMES.ELO_RATING_HISTORY
  );

  if (players[0].user_id) {
    const eloRepo = new CrudRepository<IEloRating>(
      knexConnection,
      TABLE_NAMES.ELO_RATING
    );
    const users: IEloRating[] = await eloRepo
      .knexObj()
      .whereIn("user_id", [player1.user_id, player2.user_id])
      .where("game_id", game_id);
    let user1: IEloRating =
      users.find((x) => x.id === player1.user_id) || users[0];
    let user2: IEloRating =
      users.find((x) => x.id === player2.user_id) || users[1];
    if (!user1) {
      user1 = await eloRepo.create({
        user_id: player1.user_id,
        game_id,
      });
    }
    if (!user2) {
      user2 = await eloRepo.create({
        user_id: player2.user_id,
        game_id,
      });
    }
    let elo_rating = { winnerRating: 0, loserRating: 0 };
    const ratings = { user1: 0, user2: 0 };
    if (req.opponent1.result === "win") {
      elo_rating = getEloRating(
        Number(user1?.elo_rating),
        Number(user2?.elo_rating)
      );
      ratings.user1 = elo_rating.winnerRating;
      ratings.user2 = elo_rating.loserRating;
    } else {
      elo_rating = getEloRating(
        Number(user2?.elo_rating),
        Number(user1?.elo_rating)
      );
      ratings.user1 = elo_rating.loserRating;
      ratings.user2 = elo_rating.winnerRating;
    }

    return await Promise.all([
      eloRepo.update({ elo_rating: ratings.user1 }, { id: user1.id, game_id }),
      eloHistoryRepo.create({
        user_id: user1.user_id,
        tournament_id: req.tournament_id,
        match_id: req.match_id,
        game_id,
        elo_rating: isNaN(user1.elo_rating) ? 760 : user1.elo_rating,
      }),
      eloRepo.update({ elo_rating: ratings.user2 }, { id: user2.id, game_id }),
      eloHistoryRepo.create({
        user_id: user2.user_id,
        tournament_id: req.tournament_id,
        match_id: req.match_id,
        game_id,
        elo_rating: isNaN(user2.elo_rating) ? 760 : user2.elo_rating,
      }),
    ]);
  }

  const teamRepo = new CrudRepository<ITeams>(
    knexConnection,
    TABLE_NAMES.TEAMS
  );

  const teams: ITeams[] = await teamRepo
    .knexObj()
    .whereIn("id", [player1.team_id, player2.team_id]);

  const team1: ITeams = teams.find((x) => x.id === player1.team_id) || teams[0];
  const team2: ITeams = teams.find((x) => x.id === player2.team_id) || teams[1];

  let elo_rating = { winnerRating: 0, loserRating: 0 };
  const ratings = { team1: 0, team2: 0 };

  if (req.opponent1.result === "win") {
    elo_rating = getEloRating(
      Number(team1?.elo_rating || 750),
      Number(team2?.elo_rating || 750)
    );
    ratings.team1 = isNaN(elo_rating.winnerRating) ? 760 : elo_rating.winnerRating;
    ratings.team2 = isNaN(elo_rating.loserRating) ? 760 : elo_rating.loserRating;
  } else {
    elo_rating = getEloRating(
      Number(team2?.elo_rating),
      Number(team1?.elo_rating)
    );
    ratings.team1 = isNaN(elo_rating.loserRating) ? 760 : elo_rating.loserRating;
    ratings.team2 = isNaN(elo_rating.winnerRating) ? 760 : elo_rating.winnerRating;
  }

  return await Promise.all([
    teamRepo.update({ elo_rating: ratings.team1 }, { id: team1.id }),
    eloHistoryRepo.create({
      team_id: team1.id,
      tournament_id: req.tournament_id,
      match_id: req.match_id,
      game_id,
      elo_rating: isNaN(team1.elo_rating) ? 760 : team1.elo_rating,
    }),
    teamRepo.update({ elo_rating: ratings.team2 }, { id: team2.id }),
    eloHistoryRepo.create({
      team_id: team2.id,
      tournament_id: req.tournament_id,
      match_id: req.match_id,
      game_id,
      elo_rating: isNaN(team2.elo_rating) ? 760 : team2.elo_rating,
    }),
  ]);
};

export const createEloHistory = async (
  data: any,
  knexConnection: Knex
): Promise<any> => {
  const repo = new CrudRepository<IEloRatingHistory>(
    knexConnection,
    TABLE_NAMES.ELO_RATING_HISTORY
  );
  return repo;
};
export const getGameId = async (
  req: IMatchResultRequest,
  knexConnection: Knex
): Promise<any> => {
  const repo = new CrudRepository<ITournament>(
    knexConnection,
    TABLE_NAMES.TOURNAMENTS
  );
  const [tournament]: ITournament[] = await repo.findBy(
    "id",
    req?.tournament_id
  );
  return tournament.game;
};

export const validateUser = async (
  ids: string[],
  knexConnection: Knex | Knex.Transaction
): Promise<boolean> => {
  try {
    const users = new CrudRepository<IPrivateProfile>(
      knexConnection,
      TABLE_NAMES.PRIVATE_PROFILE
    );
    const data = await users.knexObj().whereIn("id", ids);
    return data.length === ids.length;
  } catch (ex) {
    return false;
  }
};

export const validateTournament = async (
  id: string,
  knexConnection: Knex
): Promise<ITournament | null> => {
  try {
    const repository = new TournamentsRepository(knexConnection);
    return await repository.getTournament(id);
  } catch (ex) {
    return null;
  }
};

const deleteBracket = (
  connection: Knex,
  tournament_id: any,
  stage_id: any
): Promise<any> => {
  const all = [
    connection("b_stage").delete()
.where({ tournament_id }),
    connection("b_participant").delete()
.where({ tournament_id }),
    connection("b_round").delete()
.where({ stage_id }),
    connection("b_match").delete()
.where({ stage_id }),
    connection("b_group").delete()
.where({ stage_id }),
  ];
  return Promise.all(all);
};

function nextPowerOf2(n: number): number {
  let count = 0;
  if (n && !(n & (n - 1))) return n;
  while (n !== 0) {
    n >>= 1;
    count += 1;
  }
  return 1 << count;
}
