// import Image from "next/image";
import React from "react";
// Third party packages
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import GroupIcon from "@mui/icons-material/Group";
// styles
import styles from "./opponent-tile.module.css";
import { IMatchHubData } from "../../../../../pages/match-hub";
import moment from "moment";
import { userProfileSelector } from "../../../redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../../redux-store/redux-store";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import { getRoundName } from "../../../services/get-round-name";

interface OpponentTileProps {
  onMatchHub?: (opponentData: IMatchHubData) => void;
  data: IMatchHubData;
  userDashboard?: boolean;
  team: any[];
}

const calculateDuration = (
  eventTime: moment.Moment,
  now: moment.Moment = moment()
): moment.Duration => moment.duration(eventTime.diff(now), "milliseconds");

const OpponentTile: React.FC<OpponentTileProps> = ({
  onMatchHub,
  data,
  userDashboard,
  team,
}) => {
  const router = useRouter();
  const user = useAppSelector(userProfileSelector);

  React.useEffect(() => {
    const timerRef = window.setInterval(timerCallback, 1000);

    return () => {
      clearInterval(timerRef);
    };
  }, [data]);

  const name = getRoundName(
    data.tournament.brackets.group as any[],
    data.tournament.brackets.match as any[],
    data.tournament.brackets.round as any[],
    parseInt(data.match_id),
    data.tournament.brackets.stage[0].type
  );

  const matchData = data.tournament.bracketsMetadata.rounds.find(
    (r: any) => r.name === name
  );

  const [countDown, setCountDown] = React.useState("00:00:00");

  const timerCallback = React.useCallback(() => {
    if (data.tournament) {
      const mDate = moment(data.tournament.startDate);
      const mTime = moment(
        matchData.startTime ||
          data.tournament.settings.checkInStartTime ||
          data.tournament.startTime,
        "hh:mm:SS"
      );
      mDate.set({
        hours: mTime.get("hours"),
        minutes: mTime.get("minutes"),
        seconds: mTime.get("seconds"),
      });
      const now = moment();
      let diff = mDate.diff(now);
      if (diff <= 0) {
        setCountDown("Started");
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
      return;
    }
    if (onMatchHub) {
      onMatchHub(data);
    }
  };

  const isMyTeam =
    data.opponent1.team_id &&
    team.find(
      (t) => t.id === data.opponent1.team_id || t.id === data.opponent2.team_id
    );

  let opponent_name = "";
  let opponent_data: any = {};

  if (isMyTeam) {
    const opponentPlayer =
      data.opponent1?.team_id !== isMyTeam?.id
        ? data.opponent1
        : data.opponent2;
    opponent_name = opponentPlayer.name || "";
    opponent_data = opponentPlayer;
  } else if (data.opponent1.user_id === user?.id) {
      opponent_name = data.opponent2.user_id
        ? data.opponent2.firstName + " " + data.opponent2.lastName
        : "N/A";
      opponent_data = data.opponent2;
    } else {
      opponent_name = data.opponent1.user_id
        ? data.opponent1.firstName + " " + data.opponent1.lastName
        : "N/A";
      opponent_data = data.opponent1;
    }

  const opponentImage = opponent_data.avatarUrl
    ? frontendSupabase.storage
        .from("public-files")
        .getPublicUrl(opponent_data.avatarUrl).publicURL
    : undefined;

  return (
    <Grid container className={styles.opponentTileContainer}>
      <Grid item xs={2}>
        <Typography className={styles.opponentTileTitle} textAlign={"left"}>
          Opponent:
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <Image src="/images/legand-club.png" width={32} height={32} /> */}
          {!opponentImage && opponent_data.team_id ? (
            <GroupIcon style={{ height: 45, width: 45, borderRadius: 25 }} />
          ) : (
            <Avatar src={opponentImage || ""} alt={opponent_name} />
          )}
          <span
            style={{ marginLeft: "15px" }}
            className={styles.opponentTileValue}
          >
            {opponent_name}
          </span>
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
