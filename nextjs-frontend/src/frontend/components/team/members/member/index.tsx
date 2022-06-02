import { Box, Typography } from "@mui/material";
import { useState } from "react";
import bronze from './images/bronze_Card.png';
import diamond from './images/diamond_Card.png';
import gold from './images/gold_Card.png';
import ruby from './images/ruby_Card.png';
import silver from './images/silver_Card.png';
import Player from './images/Player.png';

const images = {bronze, diamond, gold, ruby, silver, Player}

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

const Member: React.FC<MemberProp> = ({
  type,
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
            top: "61.5%",
            left: "27%",
            width: "45%",
            alignItems: "center",
          }}
        >
          <Typography noWrap fontSize={"1.1 em"}>
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
          <Typography color={"#fff"} fontSize={"1.1 em"}>
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
          <Typography color={"#fff"} fontSize={"1.1 em"}>
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
          <Typography color={"#fff"} fontSize={"1.1 em"}>
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
        <img
          src={images[type].src}
          style={{ zIndex: 1, width: "100%" }}
        />
      </Box>
      {children && hover && <Box>{children}</Box>}
    </Box>
  );
};

export default Member;
