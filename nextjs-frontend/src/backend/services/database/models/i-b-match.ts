export interface IBMatch {
  id: number;
  number: number;
  stage_id: number;
  group_id: number;
  round_id: number;
  child_count: number;
  status: number;
  opponent1: {
    id: number;
    position: number;
  };
  opponent2: {
    id: number;
    position: number;
  };
}
