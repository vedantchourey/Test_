import { Box, Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
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
}) => {
  const styles = useRoundStatusStyles();
  const getRoundStatus = (): string => {
    if (isFinished) {
      return "Finished";
    }
    return `${startDate} ${startTime}`;
  };
  return (
    <Box minWidth={325}>
      <Box className={styles.statusContainer}>
        <Typography color={"white"}>Round {round}</Typography>
        <Box className={styles.status}>
          <Typography
            color={"white"}
            textTransform={"uppercase"}
            variant="caption"
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
          >
            {type}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Bracket: React.FC<BracketProps> = ({ rounds = [], brackets }) => {
  const renderStatus = (): JSX.Element[] => {
    return rounds.map((round) => {
      return (
        <Grid key={round.round} item md={3} mr={2}>
          <RoundStatus {...round} />
        </Grid>
      );
    });
  };
  
  return (
    <>
      <Box marginX={"70px"} marginY={2}>
        {/* <Grid
          container
          columnSpacing={2}
          rowSpacing={1}
          overflow={"scroll"}
          flexWrap={"nowrap"}
          // className={"hide-scrollbar"}
        > */}
        <Box display={"flex"} flexWrap={"nowrap"} maxWidth={"70vw"} overflow={"scroll"} className="hide-scrollbar">
          {renderStatus()}
        </Box>
          
        {/* </Grid> */}
      </Box>
      <Box marginX={"70px"} marginY={2}>
        <Grid
          container
          style={{ overflow: "scroll" }}
          columnSpacing={2}
          rowSpacing={1}
          className={"hide-scrollbar"}
        >
          <div className="bracket">
            {/* {type === "SINGLE" ? (
              <SingleElimination brackets={brackets} players={players as any} />
            ) : ( */}
            <DoubleElimination brackets={brackets} />
            {/* )} */}
          </div>
        </Grid>
      </Box>
    </>
  );
};

export default Bracket;
