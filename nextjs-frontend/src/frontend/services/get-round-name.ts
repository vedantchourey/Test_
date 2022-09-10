import _ from "lodash";

export const getRoundName = (
  group: any[],
  match: any[],
  round: any[],
  match_id: number,
  elimination_type: string,
  withExtraDetails?: boolean,

): string | {name: string, roundSize: number, roundLocation: number, type?: string} => {
  const matchObj = match.find((m) => m.id === parseInt(match_id.toString()));
  const roundObj = round.find((r) => r.id === matchObj.round_id);
  const groupObj = group.find((g) => g.id === matchObj.group_id);
  const roundByGroup = _.groupBy(round, "group_id");
  let name = ""
  let roundListSize;
  let type = "round"
  if (elimination_type === "single_elimination") {
    roundListSize = roundByGroup[matchObj.group_id].length;
    if (groupObj.number === 2) {
      name = `3rd Place Playoff`;
      type = `third-place` 
    }
    if (roundListSize === roundObj.number) {
      name = `Final Round`;
      type = `final`
    } else{
      name = `Round ${roundObj.number}`;
      type = roundListSize - 1 === roundObj.number ? `semi-final` : `round`;
    } 
  }
  else{
    roundListSize = roundByGroup[matchObj.group_id].length;
    if (groupObj.number === 1) {
      if (roundListSize - 1 === roundObj.number) {
        name = `UB Final Round`;
        type = `semi-final`
      }
      else{
        name = `UB Round ${roundObj.number}`;
      }
    }
    if (groupObj.number === 2) {
      if (roundListSize === roundObj.number) {
        name = `LB Final Round`;
      } else{
        name = `LB Round ${roundObj.number}`;
      }
    }
    if (groupObj.number === 2) {
      if (roundListSize === roundObj.number) {
        name = `LB Final Round`;
      } else{
        name = `LB Round ${roundObj.number}`;
      }
    }
    if (groupObj.number === 3) {
      name = `GF Round`;
      type = `final`
    }
  }
  if(withExtraDetails){
    return {
      name,
      roundSize: roundListSize,
      roundLocation: roundObj.number,
      type
    }
  }
  return name;
};