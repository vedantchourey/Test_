export interface ListTournamentType {
  page?: number;
  limit?: number;
  game?: string;
  status?: string;
  sortType?: string;
  noPlayers?: string;
  [key: string]: any;
}
