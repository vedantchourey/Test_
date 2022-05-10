export interface ITeamCreateRequest {
    name: string;
    platform_id: string;
    game_id: string;
}

export interface ITeamDiscardRequest {
    id: string;
}