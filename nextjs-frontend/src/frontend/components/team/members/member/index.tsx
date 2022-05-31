import { Box, Typography } from "@mui/material";
export interface MemberProp {
  name: string;
  image: string;
  tags: string[];
  type: "silver" | "bronze" | "diamond" | "gold" | "ruby";
  elo?: string;
  won?: string;
  games?: string;
}

const Member: React.FC<MemberProp> = ({ image, type, name, games, won, elo }) => {
  return (
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
        <Typography noWrap fontSize={"1.1 em"}>{name}</Typography>
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
        <Typography color={"#fff"} fontSize={"1.1 em"}>{games}</Typography>
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
        <Typography color={"#fff"} fontSize={"1.1 em"}>{won}</Typography>
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
        <Typography color={"#fff"} fontSize={"1.1 em"}>{elo}</Typography>
      </div>
      <img
        src={image}
        style={{ position: "absolute", width: "100%", zIndex: -1 }}
      />
      <img
        src={`/images/teams/${type}_Card.png`}
        style={{ zIndex: 1, width: "100%" }}
      />
    </Box>
  );
};

export default Member;
