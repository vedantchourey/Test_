import { Box, Typography, Grid, Divider, Button } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IMatchHubData } from "../../../../pages/match-hub";
import { userProfileSelector } from "../../redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../redux-store/redux-store";
import { IPostsResponse } from "../../service-clients/messages/i-posts-response";
import { getPostsByUserId } from "../../service-clients/post-service-client";
import { getAuthHeader } from "../../utils/headers";
import PostCard from "../account/posts/post-card";
import MatchHub from "../match-hub";

export default function index(): JSX.Element {
  const user = useAppSelector(userProfileSelector);
  const [data, setData] = useState<any>([]);
  const [matchData, setMatchData] = useState<IMatchHubData[]>([])
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPostsResponse[]>([]);

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

  useEffect(() => {
    try {
      (async (): Promise<void> => {
        const posts = await getPostsByUserId(user?.id || '');
        setPosts(posts);
      })();
    } finally {
      setIsFetchingPosts(false);
    }
  }, []);

  const _renderPosts = (): JSX.Element | React.ReactNode => {
    if (isFetchingPosts) {
      return new Array(5).fill("")
        .map((data, i) => <h1 key={i}>Skeleton</h1>);
    }
    const jsx = posts.map((postData) => {
      return <PostCard key={postData.id} data={postData} row={true} />;
    });
    return jsx;
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
        <Grid xs={10}>
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
          <Typography textAlign={"left"} mt={2} mb={2}>My Posts</Typography>
          <Box display={"flex"} overflow={"scroll"}>
            {_renderPosts()}
          </Box>

          <Box mt={3}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography textAlign={"left"}>Match Activity</Typography>
              <Button>View All</Button>
            </Box>
            <MatchHub
              data={matchData}
              onMatchHub={(data): any => console.warn("data -> ", data)}
              userDashboard={true}
            />
          </Box>
        </Grid>
        <Grid xs={2}>
          <Box p={2} bgcolor={"rgba(255, 255, 255, 0.06)"}>
            <Typography textAlign={"left"}>My Team</Typography>
            {data.map((i: any) => (
              <Box
                display={"flex"}
                alignItems={"center"}
                mt={1}
                key={`${i.id}`}
              >
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
