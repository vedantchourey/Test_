import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Bracket,
  Seed,
  SeedItem,
  RoundProps,
  RenderSeedProps,
} from "react-brackets";
import { IAny, IBrackets, IMatch, IPlayers } from "./BracketsInterface";

const SingleElimination = ({
  brackets,
  players = [],
}: {
  brackets: IBrackets;
  players: IPlayers[];
}) => {
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
  const Player = ({ id }: { id: string }) => {
    let player = { username: "TBD" };
    let p = players.find((x) => x.id == id);
    if (p) player = p;
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: 50 }}>
            <span style={{ marginLeft: 20 }}>1</span>
            <span>&nbsp;-&nbsp;</span>
          </div>
          <img className="img" src="/icons/Brawl_Icon 1.png" width={50} />
          <Typography> {player?.username}</Typography>
        </div>
        <div style={{ width: 50, background: "#0F0526", padding: "18px" }}>
          -
        </div>
      </div>
    );
  };
  const RenderSeed = ({ breakpoint, seed }: RenderSeedProps) => {
    console.log("reached");

    return (
      <Seed mobileBreakpoint={breakpoint}>
        <SeedItem style={{ width: "100%" }}>
          <div style={{ background: "#19122C" }}>
            <Player id={seed.teams?.[0]} />
            <div style={{ height: 1, backgroundColor: "#707070" }}></div>
            <Player id={seed.teams?.[1]} />
          </div>
        </SeedItem>
      </Seed>
    );
  };

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
