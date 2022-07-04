import Image from "next/image";
import React from "react";
// Third party packages
import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

// styles
import styles from "./opponent-tile.module.css";
import { IMatchHubData } from "../../../../../pages/match-hub";
import moment from "moment";
import { userProfileSelector } from "../../../redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../../redux-store/redux-store";

interface OpponentTileProps {
  onMatchHub?: (opponentData: IMatchHubData) => void;
  data: IMatchHubData;
  userDashboard?: boolean;
}

const calculateDuration = (
  eventTime: moment.Moment,
  now: moment.Moment = moment()
): moment.Duration => moment.duration(eventTime.diff(now), "milliseconds");

const OpponentTile: React.FC<OpponentTileProps> = ({ onMatchHub, data, userDashboard }) => {
  const router = useRouter();
  const user = useAppSelector(userProfileSelector);

  React.useEffect(() => {
    const timerRef = window.setInterval(timerCallback, 1000);

    return () => {
      clearInterval(timerRef);
    };
  }, [data]);

  const [countDown, setCountDown] = React.useState("00:00:00");

  const timerCallback = React.useCallback(() => {
    if (data.tournament) {
      const mDate = moment(data.tournament.startDate);
      const mTime = moment(data.tournament.startTime, "hh:mm:SS");
      mDate.set({
        hours: mTime.get("hours"),
        minutes: mTime.get("minutes"),
        seconds: mTime.get("seconds"),
      });
      const now = moment();
      let diff = mDate.diff(now);
      if (diff <= 0) {
        setCountDown("00:00:00");
      } else {
        diff = mDate.diff(now, "hours");
        if (diff > 24) {
          diff = mDate.diff(now, "days");
          setCountDown(`${diff} days`);
        } else {
          const timer = calculateDuration(mDate, now);
          setCountDown(
            `${timer.hours()}:${timer.minutes()}:${timer.seconds()}`
          );
        }
      }
    }
  }, [data]);

  const matchHubHandler = (): void => {
    if (userDashboard) {
      router.push(`/match-hub`);
      return
    }
    if (onMatchHub) {
      onMatchHub(data);
    }
  };
  
  let opponent_name = ""
  if(data.opponent1.user_id === user?.id){
    opponent_name = data.opponent2.user_id ? data.opponent2.firstName + " " + data.opponent2.lastName : "N/A"
  } else{
    opponent_name = data.opponent1.user_id ? data.opponent1.firstName + " " + data.opponent1.lastName : "N/A"
  }

  return (
    <Grid container className={styles.opponentTileContainer}>
      <Grid item xs={2}>
        <Typography className={styles.opponentTileTitle} textAlign={"left"}>Opponent:</Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src="/images/legand-club.png" width={32} height={32} />
          <span
            style={{ marginLeft: "15px" }}
            className={styles.opponentTileValue}
          >{opponent_name}</span>
        </div>
      </Grid>
      <Grid item xs={3}>
        <p className={styles.opponentTileTitle}>Tournament name</p>
        <p className={styles.opponentTileValue}>{data.tournament_name}</p>
      </Grid>
      <Grid
        item
        xs={3}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>
          <span className={styles.opponentTileTitle}>Round starts in:</span>
          <span
            className={styles.opponentTileValue}
            style={{ marginLeft: "24px" }}
          >
            {countDown}
          </span>
        </p>
        {/* <p>
          <span className={styles.opponentTileTitle}>Check starts in:</span>
          <span
            className={styles.opponentTileValue}
            style={{ marginLeft: "24px" }}
          >
            00:18:45
          </span>
        </p> */}
      </Grid>
      <Grid item xs={4} style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="outlined"
          className={styles.opponentTileButton}
          style={{ marginRight: "16px" }}
          onClick={matchHubHandler}
        >
          {userDashboard ? "Open Match Hub" : "Match Hub"}
        </Button>
        <Button
          variant="contained"
          className={styles.opponentTileButton}
          onClick={(): void => {
            router.push(`/view-tournament/${data.tournament_id}/details`);
          }}
        >
          View Tournament
        </Button>
      </Grid>
    </Grid>
  );
};

export default OpponentTile;
