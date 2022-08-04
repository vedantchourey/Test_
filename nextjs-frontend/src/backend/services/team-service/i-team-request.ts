export interface ITeamCreateRequest {
    name: string;
    platform_id: string;
    game_id: string;
}

export interface ITeamDiscardRequest {
    id: string;
}

export interface ITeamInviteRequest {
    player_id?: string;
    team_id: string;
    email?: string;
    message?: string;
}

export interface ITeamLeaveRequest{
    team_id: string;
}