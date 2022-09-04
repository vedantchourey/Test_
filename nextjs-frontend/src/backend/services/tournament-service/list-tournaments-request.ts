export interface ListTournamentType {
  page?: number;
  limit?: number;
  game?: string;
  status?: string;
  sortType?: string;
  [key: string]: any;
}
