import React, { useEffect, useState } from "react";
import { Bracket, Seed, SeedItem, RenderSeedProps } from "react-brackets";
import { IAny, IBrackets, IMatch } from "./BracketsInterface";

const Player = ({ name }: { name: string }): any => {
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
const RenderSeed = ({ breakpoint, seed }: RenderSeedProps): any => {
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

const SingleElimination = ({ brackets }: { brackets: IBrackets }): any => {
  const [sideOne, setSideOne] = useState([] as any);
  const [sideTwo, setSideTwo] = useState([] as any);
  useEffect(() => {
    const r1: any[] = [];
    const r2: any[] = [];
    const rd1: IAny = {};
    const rd2: IAny = {};
    if (brackets?.matches && brackets.matches.length) {
      brackets?.matches.forEach((x: IMatch): any => {
        if (x.id.s === 1) {
          const round = `${x.id.r}.${x.id.s}`;
          if (rd1[round]) {
            rd1[round].push(x.p);
          } else {
            r1.push(x?.id.r);
            rd1[round] = [x.p];
          }
        } else {
          const round = `${x.id.r}.${x.id.s}`;
          if (rd2[round]) {
            rd2[round].push(x.p);
          } else {
            r2.push(x?.id.r);
            rd2[round] = [x.p];
          }
        }
      });
      const a: any[] = Object.keys(rd1)?.map((x): any => {
        return {
          title: "",
          seeds: rd1[x].map((y: any, i: number) => ({
            teams: rd1[x][i],
          })),
        };
      });
      const a1: any[] = Object.keys(rd2)?.map((x) => {
        return {
          title: "",
          seeds: rd2[x].map((y: any, i: number) => ({
            teams: rd2[x][i],
          })),
        };
      });
      setSideOne(a);
      setSideTwo(a1);
    }
  }, [brackets]);

  return (
    <>
      <Bracket
        mobileBreakpoint={767}
        rounds={sideOne}
        renderSeedComponent={RenderSeed}
        swipeableProps={{ enableMouseEvents: true, animateHeight: true }}
      />
      <Bracket
        mobileBreakpoint={767}
        rounds={sideTwo}
        renderSeedComponent={RenderSeed}
        swipeableProps={{ enableMouseEvents: true, animateHeight: true }}
      />
    </>
  );
};

export default SingleElimination;
