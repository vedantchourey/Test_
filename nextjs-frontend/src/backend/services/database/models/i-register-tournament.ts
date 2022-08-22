export interface IRegisterTournament {
  userId: string;
  tournamentId: string;
  is_team_registration: boolean;
  user_list: string[];
  team_id: string;
  gameUniqueId?: string;
}
