import { Box, Typography, Grid, Divider, Button } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { userProfileSelector } from "../../redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../redux-store/redux-store";
import { getAuthHeader } from "../../utils/headers";
import MatchHub, { Match } from "../match-hub";

export default function index(): JSX.Element {
  const user = useAppSelector(userProfileSelector);
  const [data, setData] = useState<any>([]);
  const [matchData, setMatchData] = useState<Match[]>([])
  const teamList = async (): Promise<void> => {
    try {
      const endpoint = "api/teams";
      const headers = await getAuthHeader();
      axios.get(endpoint, { headers: headers }).then((res) => {
        setData(res.data.result);
      });
    } catch (err) {
      alert(err);
    }
  };

  const fetchData = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get("/api/tournaments/user-matchs", { headers: headers })
      .then((res) => {
        setMatchData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    teamList();
    fetchData();
  }, []);

  const teamNames: Array<string> = data.map((i: any) => i.name);

  return (
    <Box textAlign={"left"}>
      <Grid container>
        <Grid xs={8}>
          <Grid mb={2} container>
            <Grid xs={6}>
              <Box display={"flex"}>
                <img
                  src={user?.avatarUrl || "/images/16276393842661.png"}
                  width={"130px"}
                  height={"130px"}
                  style={{
                    marginTop: 5,
                    marginRight: 20,
                    borderRadius: "100%",
                  }}
                />
                <Box>
                  <Typography textAlign={"left"}>{user?.username}</Typography>
                  <Typography textAlign={"left"}>
                    Member since:{" "}
                    {moment(user?.createdAt).format("DD MMMM YYYY")}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid xs={6}>
              <Typography textAlign={"left"}>Joined Teams</Typography>
              <Box display={"flex"} mr={1}>
                {teamNames.join(", ")}
              </Box>
            </Grid>
          </Grid>
          <Divider />
          <Box mt={3}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography textAlign={"left"}>Match Activity</Typography>
              <Button>View All</Button>
            </Box>
            <MatchHub data={matchData} onMatchHub={(data): any => console.warn('data -> ', data)} />
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box p={2} bgcolor={"rgba(255, 255, 255, 0.06)"}>
            <Typography textAlign={"left"}>My Team</Typography>
            {data.map((i: any) => (
              <Box display={"flex"} alignItems={"center"} mt={1} key={`${i.id}`}>
                <img
                  src="/icons/Rectangle.svg"
                  width={"30px"}
                  height={"30px"}
                  style={{ marginTop: 5 }}
                />
                <Typography textAlign={"left"} ml={1}>
                  {i.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
