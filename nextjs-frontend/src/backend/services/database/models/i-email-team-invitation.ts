export interface IEmailTeamInvitation {
  id: number;
  team_id: string;
  invite_by: string;
  type: string;
  email_id: string;
  secret: string;
}

