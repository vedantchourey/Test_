import { Box, Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import SingleElimination from "./SingleElimination";
import DoubleElimination from "./DoubleElimination";
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
    <Box>
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

const Bracket: React.FC<BracketProps> = ({
  rounds = [],
  brackets,
  type,
  players,
}) => {
  const renderStatus = (): JSX.Element[] => {
    return rounds.map((round) => {
      return (
        <Grid key={round.round} item md={3}>
          <RoundStatus {...round} />
        </Grid>
      );
    });
  };
  return (
    <>
      <Box marginX={"70px"} marginY={2}>
        <Grid container columnSpacing={2} rowSpacing={1}>
          {renderStatus()}
        </Grid>
      </Box>
      <Box marginX={"70px"} marginY={2}>
        <Grid
          container
          style={{ overflow: "scroll" }}
          columnSpacing={2}
          rowSpacing={1}
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
