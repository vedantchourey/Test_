import React, { useEffect, useState } from "react";
import {
  Bracket,
  Seed,
  SeedItem,
  RoundProps,
  RenderSeedProps,
} from "react-brackets";
import { IAny, IBrackets, IMatch } from "./BracketsInterface";

const Player = ({ name }: { name: string }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <span>1</span>
        <span>-</span>
        <img className="img" src="/icons/Brawl_Icon 1.png" width={50} />
        {name}
      </div>
      <div style={{ width: 50, background: "#0F0526", padding: "18px" }}>-</div>
    </div>
  );
};
const RenderSeed = ({ breakpoint, seed }: RenderSeedProps) => {
  return (
    <Seed mobileBreakpoint={breakpoint}>
      <SeedItem style={{ width: "100%" }}>
        <div style={{ background: "#19122C" }}>
          <Player name={seed.teams?.[0] !== 0 ? seed.teams?.[0] : "TBD"} />
          <div style={{ height: 1, backgroundColor: "#707070" }}></div>
          <Player name={seed.teams?.[1] !== 0 ? seed.teams?.[0] : "TBD"} />
        </div>
      </SeedItem>
    </Seed>
  );
};

const SingleElimination = ({ brackets }: { brackets: IBrackets }) => {
  const [rounds, setRounds] = useState([] as any);
  useEffect(() => {
    let r: any[] = [];
    let rd: IAny = {};
    if (brackets?.matches && brackets.matches.length) {
      brackets?.matches.forEach((x: IMatch) => {
        if (x.id.s === 1) {
          let round = `${x.id.r}.${x.id.s}`;
          if (rd[round]) {
            rd[round].push(x.p);
          } else {
            r.push(x?.id.r);
            rd[round] = [x.p];
          }
        }
      });
      let a: any[] = Object.keys(rd)?.map((x) => {
        return {
          title: "",
          seeds: rd[x].map((y: any, i: number) => ({
            teams: rd[x][i],
          })),
        };
      });
      setRounds(a);
    }
  }, [brackets]);

  return (
    <Bracket
      mobileBreakpoint={767}
      rounds={rounds}
      renderSeedComponent={RenderSeed}
      swipeableProps={{ enableMouseEvents: true, animateHeight: true }}
    />
  );
};

export default SingleElimination;
