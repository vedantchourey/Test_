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
    <Box width={300} minHeight={409} position="relative">
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          top: 252,
          left: 80,
          width: 134,
          alignItems: "center",
        }}
      >
        <Typography>{name}</Typography>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          zIndex: 1000,
          top: 300,
          left: 61,
          width: 50,
          height:47,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color={"#fff"}>{games}</Typography>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          zIndex: 1000,
          top: 300,
          left: 136,
          width: 50,
          height:47,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color={"#fff"}>{won}</Typography>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          zIndex: 1000,
          top: 300,
          left: 210,
          width: 50,
          height:47,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color={"#fff"}>{elo}</Typography>
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
