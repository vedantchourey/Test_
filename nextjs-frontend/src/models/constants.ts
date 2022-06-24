export type AllowedBuckets = 'public-files';
export type AllowedExtensions = '.jpeg' | '.jpg' | '.png' | '.gif';
export const allowedImageExtensions: AllowedExtensions[] = ['.jpeg', '.jpg', '.png', '.gif'];
export const TABLE_NAMES = {
  TEAMS: "teams",
  PLATFORMS: "platforms",
  GAMES: "games",
  PRIVATE_PROFILE: "private_profiles",
  TEAM_INVITATION: "teams_invitation",
  TEAM_PLAYERS: "team_players",
  B_PARTICIPANT: "b_participant",
  B_TOURNAMENT: "b_tournament",
  B_MATCH: "b_match",
  USERS: "auth.users",
  WALLET: "wallet",
  NOTIFICATIONS: "notifications",
  TOURNAMENT_INIVTES: "tournament_invites",
  TOURNAMENTS: "tournamentsData",
  MATCH_RESULT_REQUEST: "match_result_request",
  FREE_AGENCY_MARKET: "free_agency_market",
  WATCHLIST: "watchlist",
  ELO_RATING: "elo_ratings",
  ELO_RATING_HISTORY: "elo_ratings_history",
  KYC_DETAILS: "kyc_details",
  PRODUCTS: "products",
  EMAIL_TEAM_INVITATION: "email_team_invitation",
};

export const STATUS = {
    PENDING: "PENDING",
    REJECTED: "REJECTED",
    ACCEPTED: "ACCEPTED"
}

export const TOURNAMENT_TYPE_NUMBER: { [key: string]: number } = {
    "1v1": 1,
    "2v2": 2,
    "3v3": 3,
    "4v4": 4,
    "5v5": 5,
    "6v6": 6,
    "7v7": 7,
    "8v8": 8,
    "9v9": 9,
    "10v10": 10,
    "11v11": 10,
}

export const USER_FEILDS = ["private_profiles.id as user_id", "private_profiles.firstName", "private_profiles.lastName"]