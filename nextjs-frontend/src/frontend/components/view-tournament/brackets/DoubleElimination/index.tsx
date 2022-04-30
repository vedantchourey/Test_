import {
  Bracket,
  RoundProps,
  Seed,
  SingleLineSeed,
  SeedItem,
  SeedTeam,
  RenderSeedProps,
} from "react-brackets";
import React from "react";
const rounds: RoundProps[] = [
  {
    title: "Round one",
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [{ name: "Team A" }, { name: "Team B" }],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [{ name: "Team C" }, { name: "Team D" }],
      },
    ],
  },
  {
    title: "Round one",
    seeds: [
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: "Team A" }, { name: "Team C" }],
      },
    ],
  },
];
const CustomSeed = ({
  seed,
  breakpoint,
  roundIndex,
  seedIndex,
}: RenderSeedProps) => {
  // ------ assuming rounds is the losers brackets rounds ------
  // losers rounds usually got some identical seeds amount like (2 - 2 - 1 - 1)

  const isLineConnector =
    rounds[roundIndex].seeds.length === rounds[roundIndex + 1]?.seeds.length;

  const Wrapper = isLineConnector ? SingleLineSeed : Seed;

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Wrapper mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
      <SeedItem>
        <div>
          <SeedTeam style={{ color: "red" }}>
            {seed.teams[0]?.name || "NO TEAM "}
          </SeedTeam>
          <SeedTeam>{seed.teams[1]?.name || "NO TEAM "}</SeedTeam>
        </div>
      </SeedItem>
    </Wrapper>
  );
};

const Component = () => {
  //....
  return <Bracket rounds={rounds} renderSeedComponent={CustomSeed} />;
};
export default Component;
