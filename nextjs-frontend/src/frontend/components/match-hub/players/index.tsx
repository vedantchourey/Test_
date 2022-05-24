import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";

const myTeamData = [
  {
    image: <Avatar />,
    title: "Guy Hawkins",
  },
  {
    image: <Avatar />,
    title: "Guy Hawkins",
  },
  {
    image: <Avatar />,
    title: "Guy Hawkins",
  },
  {
    image: <Avatar />,
    title: "Guy Hawkins",
  },
  {
    image: <Avatar />,
    title: "Guy Hawkins",
  },
  {
    image: <Avatar />,
    title: "Guy Hawkins",
  },
];

const opponentTeamData = [
  {
    image: <Avatar />,
    title: "Guy Hawkins",
  },
  {
    image: <Avatar />,
    title: "Guy Hawkins",
  },
  {
    image: <Avatar />,
    title: "Guy Hawkins",
  },
  {
    image: <Avatar />,
    title: "Guy Hawkins",
  },
  {
    image: <Avatar />,
    title: "Guy Hawkins",
  },
  {
    image: <Avatar />,
    title: "Guy Hawkins",
  },
];

const imageTextMyTeam = myTeamData.map((newData) => {
  return (
    <Grid
      key={newData.title}
      item
      xs={12} sm={6} md={6}
      border={"1px solid rgba(255, 255, 255, 0.1)"}
    >
      <Box display="flex" alignItems="center" padding={2}>
        <Avatar alt="Guy hawkins" />
        <Typography color={"white"} marginLeft={"16px"}>
          {newData.title}
        </Typography>
      </Box>
    </Grid>
  );
});

const imageTextopponentTeam = opponentTeamData.map((newData) => {
  return (
    <Grid
      key={newData.title}
      item
      xs={12} sm={6} md={6}
      border={"1px solid rgba(255, 255, 255, 0.1)"}
    >
      <Box display="flex" alignItems="center" padding={2}>
        <Avatar alt="Guy hawkins" />
        <Typography color={"white"} marginLeft={"16px"}>
          {newData.title}
        </Typography>
      </Box>
    </Grid>
  );
});

const Players:React.FC = () => {
  return (
    <Grid container rowSpacing={1}>
      <Grid item xs={12} sm={6} md={6}>
          <Typography textAlign={"left"} paddingX={2} paddingY={1} color={"white"} variant="h3"> My Teams</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
      <Typography textAlign={"left"} paddingX={2} paddingY={1} color={"white"} variant="h3"> Opponent Teams</Typography>
      </Grid>
      {imageTextMyTeam}
      {imageTextopponentTeam}
    </Grid>
  );
};

export default Players;
