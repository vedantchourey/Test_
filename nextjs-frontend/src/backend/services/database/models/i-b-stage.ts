export interface IBStage {
  id: number;
  tournament_id: number;
  name: string;
  type: string;
  number: number;
  settings: {
    seedOrdering: string[];
    grandFinal: string;
    matchesChildCount: number;
    size: number;
  };
}
