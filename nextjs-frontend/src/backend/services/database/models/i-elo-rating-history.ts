export interface IEloRatingHistory {
    id: number;
    elo_rating: number;
    game_id: string;
    tournament_id: string;
    user_id: string;
    team_id: string;
    match_id: number;
}