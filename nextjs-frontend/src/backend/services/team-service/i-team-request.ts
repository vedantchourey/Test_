export interface ITeamCreateRequest {
    name: string;
    platform_id: string;
    game_id: string;
}

export interface ITeamDiscardRequest {
    id: string;
}

export interface ITeamInviteRequest {
    team_id: string;
    users: string[];
}

export interface ITeamLeaveRequest{
    team_id: string;
}