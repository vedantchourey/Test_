import { Box, Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { deviceTypes } from "../../../redux-store/layout/device-types";
import { isDeviceTypeSelector } from "../../../redux-store/layout/layout-selectors";
import { useAppSelector } from "../../../redux-store/redux-store";
import DoubleElimination from "./brackets-viewer";
import { BracketProps, RoundStatusData } from "./BracketsInterface";
import style from "./style";
const useRoundStatusStyles = makeStyles(() => createStyles(style));

const RoundStatus: React.FC<RoundStatusData> = ({
  round,
  isFinished,
  type,
  startDate,
  startTime,
  name,
  isDesktop
}) => {
  const styles = useRoundStatusStyles();
  const getRoundStatus = (): string => {
    if (isFinished) {
      return "Finished";
    }
    return `${startDate} ${startTime}`;
  };
  return (
    <Box minWidth={isDesktop ? 350 : 250}>
      <Box className={styles.statusContainer}>
        <Typography color={"white"} fontSize={isDesktop ? 14 : 12}> {name || `Round ${round}`}</Typography>
        <Box className={styles.status}>
          <Typography
            color={"white"}
            textTransform={"uppercase"}
            variant="caption"
            fontSize={isDesktop ? 12 : 10}
          >
            {getRoundStatus()}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={2} className={styles.typeContainer}>
        <Box className={styles.type}>
          <Typography
            color={"white"}
            textTransform={"uppercase"}
            variant="caption"
            fontSize={isDesktop ? 12 : 10}
          >
            {type}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Bracket: React.FC<BracketProps> = ({
  rounds = [],
  brackets,
  players,
}) => {

  const isDesktop = useAppSelector((x) =>
    isDeviceTypeSelector(x, deviceTypes.desktop));
  
  const [bData, setBData] = useState<any>(null);
  const renderStatus = (): JSX.Element[] => {
    return rounds.map((round) => {
      return (
        <Grid key={round.round} item md={3} mr={2}>
          <RoundStatus {...round} isDesktop={isDesktop} />
        </Grid>
      );
    });
  };

  useEffect(() => {
    const data = {
      ...brackets,
      match: brackets?.match?.sort((a: any, b: any) => a.id - b.id),
      participant: brackets?.participant?.map((i: any) => {
        if (i.user_id) {
          const findPlayer: any = players.find((p) => p.id === i.user_id);
          if (findPlayer)
            return {
              ...i,
              avatarUrl: findPlayer.avatarUrl,
              name: findPlayer?.firstName + " " + findPlayer?.lastName,
            };
          return { ...i, name: "NA" };
        }
        if (i.team_id) {
          const findPlayer: any = players.find((p) => p.team_id === i.team_id);
          if (findPlayer)
            return {
              ...i,
              avatarUrl: findPlayer.avatarUrl,
              name: findPlayer.team_name,
            };
          return { ...i, name: "NA" };
        }
        return { ...i, name: "NA" };
      }),
    };
    setBData(null);
    setTimeout(() => setBData(data), 500);
  }, [brackets]);

  

  return (
    <>
      <Box marginX={isDesktop ? "70px" : "5px"} marginY={2}>
        {/* <Grid
          container
          columnSpacing={2}
          rowSpacing={1}
          overflow={"scroll"}
          flexWrap={"nowrap"}
          // className={"hide-scrollbar"}
        > */}
        <Box
          display={"flex"}
          flexWrap={"nowrap"}
          maxWidth={isDesktop ? "70vw" : "90vw"}
          overflow={"scroll"}
          className="hide-scrollbar"
        >
          {renderStatus()}
        </Box>

        {/* </Grid> */}
      </Box>
      <Box
        display={"flex"}
        flexWrap={"nowrap"}
        maxWidth={"100vw"}
        overflow={"scroll"}
        className="hide-scrollbar"
      >
        {bData && <DoubleElimination brackets={bData} />}
      </Box>
    </>
  );
};

export default Bracket;
