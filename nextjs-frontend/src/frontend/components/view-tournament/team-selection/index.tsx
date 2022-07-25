import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { TournamentData } from "../../tournament";

interface Player {
  firstName: string;
  lastName: string;
  user_id: string;
  balance:number;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
}

interface TeamProps {
  team: Team;
  maxPlayer: number;
  onBack?: () => void;
  onJoin?: (teamId: string, selectedUsers: string[]) => void;
  error?: string;
  entryFees:number;
  data?:TournamentData;
}

const TeamSelection: React.FC<TeamProps> = ({
  team,
  maxPlayer,
  onBack,
  onJoin,
  error,
  entryFees,
  data
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedPlayer, setSelectedPlayer] = React.useState<{
    [key: string]: boolean;
  }>({});

  const isValidAdd = (): boolean => {
    const selected = Object.values(selectedPlayer).filter(
      (value) => value
    ).length;
    return selected + 1 <= maxPlayer;
  };

  const hasEnoughPlayerSelected = ():boolean =>{
    return Object.keys(selectedPlayer).filter(
      (key) => selectedPlayer[key]
    ).length === maxPlayer;
  }

  const registerTeam = (): void => {
    if (onJoin) {
      const users = Object.keys(selectedPlayer).filter(
        (key) => selectedPlayer[key]
      );
      if (users.length > 0) {
        onJoin(team.id, users);
      }
    }
  };

  const onPlayerSelect = (playerId: string): void => {
    if (!selectedPlayer[playerId] && !isValidAdd()) {
      return;
    }

    setSelectedPlayer({
      ...selectedPlayer,
      [playerId]: !selectedPlayer[playerId],
    });
  };

  const backHandler = (): void => {
    if (onBack) {
      onBack();
    }
  };

  const hasEnoughCredit = (credit:number):boolean =>{
    if(entryFees<=0){
      return true;
    }

    const perPlayerFees = entryFees/maxPlayer;
    return perPlayerFees<=credit;
  }

  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
          padding={2}
        >
          <Typography textAlign={"left"}>{team.name}</Typography>
          <Box display="flex" alignItems={"center"}>
            {!isSmallScreen && error && (
              <Typography marginRight={2} color={"red"}>
                {error}
              </Typography>
            )}
            {!isSmallScreen ? (
              <Button disabled={Boolean(!hasEnoughPlayerSelected() || data?.playerList?.filter((i:any)=>i.team_id===team.id).length)} variant="contained" onClick={registerTeam} sx={{borderRadius:0}}>
               {data?.playerList?.filter((i:any)=>i.team_id===team.id).length?"Joined":"Join now"}
              </Button>
            ) : null}
            <Button sx={{ marginLeft: 1,borderRadius:0 }} onClick={backHandler} >
              Back
            </Button>
          </Box>
        </Box>
        <Divider sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography padding={2} textAlign={"left"} textTransform={"uppercase"}>
          Select {maxPlayer} player to join the game.
        </Typography>
      </Grid>
      {team.players.map((player) => {
        return (
          <Grid key={player.user_id} item xs={12} sm={6} md={6}>
            <Box
              sx={{
                background: selectedPlayer[player.user_id]
                  ? "#F08743"
                  : "#100626",
              }}
              display="flex"
              alignItems={"center"}
              justifyContent="space-between"
              padding={2}
            >
              <Box display="Flex" alignItems={"center"}>
                <Avatar alt={player.firstName} />
                <Typography color={"white"} marginLeft={2}>
                  {`${player.firstName} ${player.lastName}`}
                </Typography>
              </Box>
              <Box display="Flex" alignItems={"center"} justifyContent="center">
                <IconButton disabled={!hasEnoughCredit(player.balance)} onClick={():void => onPlayerSelect(player.user_id)}>
                  {selectedPlayer[player.user_id] ? (
                    <RemoveIcon height={"14px"} width="14px" />
                  ) : (
                    <AddIcon height={"14px"} width="14px" />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Grid>
        );
      })}
      <Grid item xs={12} display="flex" flexDirection={"column"} alignItems="center">
        {isSmallScreen ? (
          <Button disabled={!hasEnoughPlayerSelected()} variant="contained" onClick={registerTeam} sx={{marginY:1,borderRadius:0,width:"200px"}}>
            Join Now
          </Button>
        ) : null}
        {isSmallScreen && error && (
          <Typography color={"red"}>{error}</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default TeamSelection;
