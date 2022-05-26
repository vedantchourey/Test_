import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Opponent } from "..";

export interface PlayerData{
  opponent1: Opponent;
  opponent2: Opponent;
}

interface Props{
  data :PlayerData;
}

export interface Player {
  user_id:string;
  firstName:string;
  lastName:string;
  elo_rating?:string
}

const Players:React.FC<Props> = ({data}) => {
  const maxPlayers = (data.opponent1.players || []).length>(data.opponent2.players || []).length?(data.opponent1.players ||[]).length:(data.opponent2.players || []).length;
  const renderPlayers = ():JSX.Element[] =>{
    const items:JSX.Element[] = [];
    for(let i=0;i<maxPlayers;i++){
      const op1 = (data.opponent1.players || [])[i];
      let temp = null;
      if(op1){
        temp = (
          <Box display="flex" alignItems="center" padding={2}>
            <Avatar alt="Guy hawkins" />
            <Typography color={"white"} marginLeft={"16px"}>
              {op1.firstName} {op1.lastName}
            </Typography>
          </Box>
        )
      }
      items.push((
        <Grid
          key={op1.firstName}
          item
          xs={12} sm={6} md={6}
          border={"1px solid rgba(255, 255, 255, 0.1)"}
        >
          {temp}
        </Grid>
      ))

      const op2 = (data.opponent2.players || [])[i];
      temp = null;
      if(op2){
        temp = (
          <Box display="flex" alignItems="center" padding={2}>
            <Avatar alt="Guy hawkins" />
            <Typography color={"white"} marginLeft={"16px"}>
              {op2.firstName} {op2.lastName}
            </Typography>
          </Box>
        )
      }
      items.push((
        <Grid
          key={op2.firstName}
          item
          xs={12} sm={6} md={6}
          border={"1px solid rgba(255, 255, 255, 0.1)"}
        >
          {temp}
        </Grid>
      ))
    }

    return items;
  }
  return (
    <Grid container rowSpacing={1}>
      <Grid item xs={12} sm={6} md={6}>
          <Typography textAlign={"left"} paddingX={2} paddingY={1} color={"white"} variant="h3"> {data.opponent1.name}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
      <Typography textAlign={"left"} paddingX={2} paddingY={1} color={"white"} variant="h3"> {data.opponent2.name}</Typography>
      </Grid>
      {renderPlayers()}
    </Grid>
  );
};

export default Players;
