export interface IId {
  s: number;
  r: number;
  m: number;
}
export interface IMatch {
  id: IId;
  p: number[];
  m?: number[];
}
export interface IBrackets {
  matches: IMatch[];
}
export interface IAny {
  [key: string]: any;
}

export interface RoundStatusData {
  type: string;
  round: number;
  brackets?: any;
  isFinished: boolean;
  startDate?: string;
  startTime?: string;
}
export interface BracketProps {
  rounds?: RoundStatusData[];
  brackets: IBrackets;
  type: string;
}
