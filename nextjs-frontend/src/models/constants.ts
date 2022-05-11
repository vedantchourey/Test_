export type AllowedBuckets = 'public-files';
export type AllowedExtensions = '.jpeg' | '.jpg' | '.png' | '.gif';
export const allowedImageExtensions: AllowedExtensions[] = ['.jpeg', '.jpg', '.png', '.gif'];
export const TABLE_NAMES = {
    TEAMS: "teams",
    PLATFORMS: "platforms",
    GAMES: "games",
    PRIVATE_PROFILE: "private_profiles",
    TEAM_INVITATION: "teams_invitation"
}

