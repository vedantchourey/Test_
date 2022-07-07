// import Image from "next/image";

// Third party packages
import { Avatar, Button, Grid } from "@mui/material";

// styles
import styles from "./result-tile.module.css";
import { IMatchHubData } from "../../../../../../pages/match-hub";
import { frontendSupabase } from "../../../../services/supabase-frontend-service";

interface ResultTileProps {
  isWon?: boolean;
  child?: JSX.Element;
  data: IMatchHubData;
  opponent1Name?:string;
  opponent2Name?:string;
}

const ResultTile: React.FC<ResultTileProps> = (props) => {
  const { isWon, child, opponent1Name="-", opponent2Name="-" } = props;

  const opponent1Image = props.data.opponent1.avatarUrl
    ? frontendSupabase.storage
        .from("public-files")
        .getPublicUrl(props.data.opponent1.avatarUrl).publicURL
    : undefined;

  const opponent2Image = props.data.opponent2.avatarUrl
    ? frontendSupabase.storage
        .from("public-files")
        .getPublicUrl(props.data.opponent2.avatarUrl).publicURL
    : undefined;

  return (
    <Grid container width={"100%"} className={styles.resultTileContainer}>
      <Grid item xs={3}>
        <Button
          variant="outlined"
          className={styles.resultTileButton}
          style={{ marginRight: "16px" }}
        >
          <Avatar src={opponent1Image || undefined} alt={opponent1Name} />
          <span
            style={{ marginLeft: "16px" }}
            className={styles.resultTileValue}
          >
            {opponent1Name}
          </span>
        </Button>
      </Grid>

      {/* Result status */}
      {!child ? (
        <Grid item xs={6}>
          <p className={styles.resultTileValue}>
            {props.data.tournament_name}
          </p>
          <p
            className={styles.resultTileStatus}
            style={{ color: isWon ? "green" : "red", marginTop: 10 }}
          >
            {isWon ? "WON" : "LOST"}
          </p>
          {/* <Container style={{ display: "flex", justifyContent: "center" }}>
            <Button className={styles.resultTileButton}>
              View Result
              <ArrowForwardIcon />
            </Button>
          </Container> */}
        </Grid>
      ) : (
        <Grid item xs={6}>{child}</Grid>
      )}

      <Grid item xs={3} style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="outlined"
          className={styles.resultTileButton}
          style={{ marginRight: "16px" }}
        >
          <span
            style={{ marginRight: "16px" }}
            className={styles.resultTileValue}
          >
            {opponent2Name}
          </span>
          <Avatar src={opponent2Image || undefined} alt={opponent2Name} />
        </Button>
      </Grid>
    </Grid>
  );
}; // End of ResultTile component

export default ResultTile;
