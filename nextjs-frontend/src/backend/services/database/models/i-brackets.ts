export interface IData {
  id: {
    s: number;
    r: number;
    m: number;
  };
  p: any[];
}
export interface IBracket {
  id?: string;
  tournament_id?: string;
  brackets: {
    numPlayers: number;
    p: number;
    last: number;
    isLong: boolean;
    limit: number;
    matches: IData[];
  };
  rounds: number;
}
