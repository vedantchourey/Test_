import { Box, Typography } from "@mui/material";
import { useState } from "react";
import bronze from "./images/bronze_Card.png";
import diamond from "./images/diamond_Card.png";
import gold from "./images/gold_Card.png";
import ruby from "./images/ruby_Card.png";
import silver from "./images/silver_Card.png";
import Player from "./images/Player.png";

const images = { bronze, diamond, gold, ruby, silver, Player };

export interface MemberProp {
  name: string;
  image: string;
  tags: string[];
  type: "silver" | "bronze" | "diamond" | "gold" | "ruby";
  elo?: string;
  won?: string;
  games?: string;
  id?: string;
  children?: JSX.Element;
}

const findCardType = (
  elo: string
): "silver" | "bronze" | "diamond" | "gold" | "ruby" => {
  const eloNum = parseInt(elo);
  if (eloNum >= 0 && eloNum < 1000) return "bronze";
  if (eloNum >= 1000 && eloNum < 1250) return "silver";
  if (eloNum >= 1250 && eloNum < 1500) return "gold";
  if (eloNum >= 1500 && eloNum < 2000) return "diamond";
  if (eloNum >= 2000 && eloNum < 1000000000) return "ruby";
  return "bronze";
};

const Member: React.FC<MemberProp> = ({
  name,
  games,
  won,
  elo,
  children,
}) => {
  const [hover, setHover] = useState(false);
  return (
    <Box
      onMouseEnter={(): void => {
        setHover(true);
      }}
      onMouseLeave={(): void => {
        setHover(false);
      }}
    >
      <Box width={"100%"} position="relative">
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            top: "60.8%",
            left: "27%",
            width: "45%",
            alignItems: "center",
          }}
        >
          <Typography noWrap fontSize={"0.9 em"}>
            {name}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            zIndex: 1000,
            top: "74%",
            left: "20%",
            width: "17%",
            height: "11%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color={"#fff"} fontSize={"0.9 em"}>
            {games}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            zIndex: 1000,
            top: "74%",
            left: "45%",
            width: "17%",
            height: "11%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color={"#fff"} fontSize={"0.9 em"}>
            {won}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            zIndex: 1000,
            top: "74%",
            left: "70%",
            width: "17%",
            height: "11%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color={"#fff"} fontSize={"0.9 em"}>
            {elo}
          </Typography>
        </div>
        <img
          src={images["Player"].src}
          style={{
            position: "absolute",
            width: "100%",
            zIndex: -1,
            cursor: "pointer",
          }}
        />
        <img src={images[findCardType(elo || "0")].src} style={{ zIndex: 1, width: "100%" }} />
      </Box>
      {children && hover && <Box>{children}</Box>}
    </Box>
  );
};

export default Member;
