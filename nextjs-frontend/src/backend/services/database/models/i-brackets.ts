export interface IBracket {
  id?: string;
  tournament_id?: string;
  players: {
    list: string[];
  };
  brackets?: any[];
  rounds: number;
}
