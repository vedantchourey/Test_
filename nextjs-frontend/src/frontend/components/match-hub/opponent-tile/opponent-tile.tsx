import Image from "next/image";
import React from "react";
// Third party packages
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";

// styles
import styles from "./opponent-tile.module.css";
import { Match } from "..";

interface OpponentTileProps {
  onMatchHub?: (opponentData: Match) => void;
  data: Match;
}

const OpponentTile: React.FC<OpponentTileProps> = ({ onMatchHub, data }) => {
  const router = useRouter();

  const matchHubHandler = (): void => {
    if (onMatchHub) {
      onMatchHub(data);
    }
  };
  return (
    <Grid container className={styles.opponentTileContainer}>
      <Grid item xs={2}>
        <p className={styles.opponentTileTitle}>Opponent:</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src="/images/legand-club.png" width={32} height={32} />
          <span
            style={{ marginLeft: "8px" }}
            className={styles.opponentTileValue}
          >{`${data.opponent1.firstName} ${data.opponent1.lastName}`}</span>
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
            00:15:45
          </span>
        </p>
        <p>
          <span className={styles.opponentTileTitle}>Chech starts in::</span>
          <span
            className={styles.opponentTileValue}
            style={{ marginLeft: "24px" }}
          >
            00:18:45
          </span>
        </p>
      </Grid>
      <Grid item xs={4} style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="outlined"
          className={styles.opponentTileButton}
          style={{ marginRight: "16px" }}
          onClick={matchHubHandler}
        >
          Match Hub
        </Button>
        <Button
          variant="contained"
          className={styles.opponentTileButton}
          onClick={(): void => {
            router.push(`/view-tournament/${data.tournament_id}/details`,);
          }}
        >
          View Tournament
        </Button>
      </Grid>
    </Grid>
  );
};

export default OpponentTile;
