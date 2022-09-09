import _ from "lodash";

export const getRoundName = (
  group: any[],
  match: any[],
  round: any[],
  match_id: number,
  elimination_type: string
): string => {
  const matchObj = match.find((m) => m.id === match_id);
  const roundObj = round.find((r) => r.id === matchObj.round_id);
  const groupObj = group.find((g) => g.id === matchObj.group_id);
  const roundByGroup = _.groupBy(round, "group_id");
  if (elimination_type === "single_elimination") {
    const roundListSize = roundByGroup[matchObj.group_id].length;

    if (groupObj.number === 2) {
      return "3rd Place Playoff";
    }
    if (roundListSize === roundObj.number) {
      return `Final Round`;
    }
    return `Round ${roundObj.number}`;
  }
  const roundListSize = roundByGroup[matchObj.group_id].length;
  if (groupObj.number === 1) {
    if (roundListSize === roundObj.number) {
      return `UB Final Round`;
    }
    return `UB Round ${roundObj.number}`;
  }
  if (groupObj.number === 2) {
    if (roundListSize === roundObj.number) {
      return `LB Final Round`;
    }
    return `LB Round ${roundObj.number}`;
  }
  if (groupObj.number === 2) {
    if (roundListSize === roundObj.number) {
      return `LB Final Round`;
    }
    return `LB Round ${roundObj.number}`;
  }
  if (groupObj.number === 3) {
    return `GF Round`;
  }
  return "";
};