export interface ITeamInvitation {
  id: number;
  team_id: string;
  user_id: string;
  type: string;
  status: string;
  secret: string;
}

