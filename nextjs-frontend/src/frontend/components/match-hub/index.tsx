// Third party packages
import { Card, CardContent, Container, Typography, Grid } from "@mui/material";

// styles
import styles from "./match-hub.module.css";
import OpponentTile from "./opponent-tile/opponent-tile";
import ResultTile from "./opponent-tile/result-tile/result-tile";
import React, { useEffect } from "react";
import { IMatchHubData } from "../../../../pages/match-hub";
import { userProfileSelector } from "../../redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../redux-store/redux-store";
import { getAuthHeader } from "../../utils/headers";
import axios from "axios";
import { IProfile } from "../../../backend/services/database/models/i-profile";
import moment from "moment";

interface Props {
  data: IMatchHubData[];
  onMatchHub: (match: IMatchHubData) => void;
  userDashboard?: boolean;
}

export interface Opponent {
  firstName: string;
  id: string;
  lastName: string;
  player_elo_rating: number;
  position: number;
  result: string;
  score?: number;
  user_id?: string;
  team_id?: string;
  platform_id?: string;
  game_id?: string;
  elo_rating?: string;
  name?: string;
  avatarUrl?: string,
  players?: IProfile[];
  gameUniqueId?: string;
}

export interface Match {
  match_id: string;
  stage_id: string;
  group_id: string;
  opponent1: Opponent;
  opponent2: Opponent;
  tournament_id: string;
  tournament_name: string;
  is_checked_in: boolean;
  type: string;
}

const MatchHub: React.FC<Props> = ({ data, onMatchHub, userDashboard }) => {
  const user = useAppSelector(userProfileSelector);
  const [loading, setLoading] = React.useState(false);
  const [team, setTeam] = React.useState<any[]>([]);


  const fetchTeam = async (): Promise<void> => {
    const headers = await getAuthHeader();
    setLoading(true);
    axios
      .get("/api/teams", { headers: headers })
      .then((res) => {
        if (res.data.result && res.data.result.length > 0) {
          setTeam(res.data.result);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  }

  useEffect(() => {
    fetchTeam()
  }, [])

  return (
    <Container>
      <div>
        <Typography
          variant="h1"
          className={styles.matchHubHeading}
          style={{ margin: "40px 0" }}
        >
          Match Hub{" "}
        </Typography>
      </div>
      <Card variant="outlined" className={styles.matchHubContainer}>
        <CardContent>
          <p className={styles.matchHubDescription}>
            Here you can see the tournaments you have participated in and
            determine the results.
          </p>

          <Grid container style={{ marginTop: "48px" }} spacing={2}>
            {data
              .sort((a: any, b: any) => {
                const aStartDateTime =
                  moment(a.tournament.startDate).format("D MMM YYYY ") +
                  moment(a.tournament.startTime, "HH:mm:ss").format("LT");
                const bStartDateTime =
                  moment(b.tournament.startDate).format("D MMM YYYY ") +
                  moment(b.tournament.startTime, "HH:mm:ss").format("LT");

                const dateA = moment(aStartDateTime).format("X");
                const dateB = moment(bStartDateTime).format("X");
                return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
              })
              .map((item) => {
                const opponent1Name = item.opponent1.user_id
                  ? `${item.opponent1.firstName} ${item.opponent1.lastName}`
                  : item.opponent1.name;
                const opponent2Name = item.opponent2.user_id
                  ? `${item.opponent2.firstName} ${item.opponent2.lastName}`
                  : item.opponent2.name;

                const isMyTeam =
                  item.opponent1.team_id &&
                  team.find(
                    (t) =>
                      t.id === item.opponent1.team_id ||
                      t.id === item.opponent2.team_id
                  );

                const myPlayer = !item.opponent1.team_id
                  ? item.opponent1.user_id === user?.id
                    ? item.opponent1
                    : item.opponent2
                  : item.opponent1?.team_id === isMyTeam?.id
                  ? item.opponent1
                  : item.opponent2;

                return (
                  !loading && (
                    <Grid key={item.opponent1.user_id} item xs={12}>
                      {!item.opponent1.result ? (
                        <OpponentTile
                          data={item}
                          onMatchHub={onMatchHub}
                          userDashboard={userDashboard}
                        />
                      ) : (
                        <ResultTile
                          data={item}
                          isWon={myPlayer.result === "win"}
                          onMatchHub={onMatchHub}
                          opponent1Name={opponent1Name}
                          opponent2Name={opponent2Name}
                        />
                      )}
                    </Grid>
                  )
                );
              })}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}; // End of MatchHubPage

export default MatchHub;
