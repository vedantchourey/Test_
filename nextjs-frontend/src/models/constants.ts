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
    USERS: "auth.users",
    WALLET: "wallet",
    NOTIFICATIONS: "notifications",
    TOURNAMENT_INIVTES: "tournament_invites",
}

