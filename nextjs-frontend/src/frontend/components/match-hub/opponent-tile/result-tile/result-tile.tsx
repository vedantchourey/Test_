// import Image from "next/image";

// Third party packages
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

// styles
import styles from "./result-tile.module.css";
import { IMatchHubData } from "../../../../../../pages/match-hub";
import { frontendSupabase } from "../../../../services/supabase-frontend-service";
import GroupIcon from "@mui/icons-material/Group";
import { getRoundName } from "../../../../services/get-round-name";

interface ResultTileProps {
  isWon?: boolean;
  child?: JSX.Element;
  data: IMatchHubData;
  opponent1Name?: string;
  opponent2Name?: string;
  onMatchHub?: (match: IMatchHubData) => void;
}

const ResultTile: React.FC<ResultTileProps> = (props) => {
  const {data, isWon, child, opponent1Name = "-", opponent2Name = "-" } = props;

  const name = getRoundName(
    data.tournament.brackets.group as any[],
    data.tournament.brackets.match as any[],
    data.tournament.brackets.round as any[],
    parseInt(data.match_id),
    data.tournament.brackets.stage[0].type
  );

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
    <Grid
      container
      width={"100%"}
      className={styles.resultTileContainer}
      onClick={(): any =>
        props.onMatchHub ? props.onMatchHub(props.data) : null
      }
    >
      <Grid item xs={3}>
        <Button
          variant="outlined"
          className={styles.resultTileButton}
          style={{ marginRight: "16px" }}
        >
          {!opponent1Image && props.data.opponent1.team_id ? (
            <GroupIcon
              style={{
                height: 45,
                width: 45,
                borderRadius: 25,
                color: "white",
              }}
            />
          ) : (
            <Avatar src={opponent1Image || undefined} alt={opponent1Name} />
          )}
          <span
            style={{ marginLeft: "16px" }}
            className={styles.resultTileValue}
          >
            {opponent1Name}
          </span>
        </Button>
        {props.data.opponent1.gameUniqueId && (
          <Typography mt={1} color={"rgba(255,255,255,0.5)"}>
            Game Id: {props.data.opponent1.gameUniqueId}
          </Typography>
        )}
      </Grid>

      {/* Result status */}
      {!child ? (
        <Grid item xs={6}>
          <p className={styles.resultTileValue}>{props.data.tournament_name} ({name})</p>
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
        <Grid item xs={6}>
          {child}
        </Grid>
      )}

      <Grid item xs={3} style={{ display: "flex", justifyContent: "end" }}>
        <Box textAlign={"right"}>
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
            {!opponent2Image && props.data.opponent2.team_id ? (
              <GroupIcon
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 25,
                  color: "white",
                }}
              />
            ) : (
              <Avatar src={opponent2Image || undefined} alt={opponent2Name} />
            )}
          </Button>
          {props.data.opponent2.gameUniqueId && (
            <Typography
              textAlign={"right"}
              pr={2}
              mt={1}
              color={"rgba(255,255,255,0.5)"}
            >
              Game Id: {props.data.opponent2.gameUniqueId}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}; // End of ResultTile component

export default ResultTile;
