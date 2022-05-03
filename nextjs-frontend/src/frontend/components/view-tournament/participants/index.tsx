import { Grid, Typography } from "@mui/material";
import React from "react";
import ViewCard from "../../ui-components/view-card";
import Avatar from "@mui/material/Avatar";
import { TournamentData } from "../../tournament";

import { Box } from "@mui/system";

const data = [
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
    title: "Guy Hawkins"
  }
];

const imageText = data.map((newData) => {
  return (
    <Grid key={newData.title} item md={6} border={"1px solid rgba(255, 255, 255, 0.1)"}>
      <Box display="flex" alignItems="center" padding={2}>
        <Avatar alt="Guy hawkins" />
        <Typography marginLeft={"16px"}>{newData.title}</Typography>
      </Box>
    </Grid>
  );
});

interface ParticipantsProps {
  data: TournamentData;
}

const Participants:React.FC<ParticipantsProps> = () => {
  return (
    <React.Fragment>
      <ViewCard>
        <Grid container rowSpacing={1}>
          {imageText}
        </Grid>
      </ViewCard>
    </React.Fragment>
  );
};

export default Participants;
