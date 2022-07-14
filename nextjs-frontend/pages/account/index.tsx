import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../src/frontend/redux-store/redux-store";
import {
  authCheckStatusSelector,
  isLoggedInSelector,
  userProfileSelector,
} from "../../src/frontend/redux-store/authentication/authentication-selectors";
import UserProfileCard from "../../src/frontend/components/cards/user-profile-card/user-profile-card";
import NoobPage from "../../src/frontend/components/page/noob-page";
import {
  Box,
  Divider,
  Grid,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import commonStyles from "../../src/frontend/styles/common.module.css";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CreatePostInput from "../../src/frontend/components/account/posts/create-post-input";
import PostCard from "../../src/frontend/components/account/posts/post-card";
import { getPostsByUserId } from "../../src/frontend/service-clients/post-service-client";
import { IPostsResponse } from "../../src/frontend/service-clients/messages/i-posts-response";
import { withProtected } from "../../src/frontend/components/auth-wrapper/auth-wrapper";
import { getAuthHeader } from "../../src/frontend/utils/headers";
import axios from "axios";
import styled from "@emotion/styled";
import { ITournament } from "../../src/backend/services/database/models/i-tournaments";
import moment from "moment";
import { allGamesSelector, gamesFetchStatusSelector } from "../../src/frontend/redux-store/games/game-selectors";
import { fetchAllGamesThunk } from "../../src/frontend/redux-store/games/game-slice";
import SocialMedia from "../social";

type TabsProps = "posts" | "about" | "activity";

const NoobRow = styled(TableRow)(() => ({
  align: "center",
}));

const NoobCell = styled(TableCell)(() => ({
  border: "1px solid #ffffff1a",
  alignItems: "center",
}));

function Account(): JSX.Element {
  const router = useRouter();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const checkStatus = useAppSelector(authCheckStatusSelector);
  const user = useAppSelector(userProfileSelector);
  const [data, setData] = React.useState<ITournament[]>([]);

  const [activeTab, setActiveTab] = useState<TabsProps>("posts");
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(true);
  const [posts, setPosts] = useState<IPostsResponse[]>([]);
  
  const appDispatch = useAppDispatch();
  const games = useAppSelector(allGamesSelector);
  const gamesFetchStatus = useAppSelector(gamesFetchStatusSelector);

  useEffect(() => {
    (async (): Promise<unknown> => {
      if (gamesFetchStatus !== "idle") return;
      appDispatch(fetchAllGamesThunk());
      if (checkStatus !== "success") return;
      if (isLoggedIn) return;
      await router.push("/");
    })();
  }, [user]);

  const fetchData = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get("/api/tournaments/user-matches-history-single", { headers: headers })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    try {
      (async (): Promise<void> => {
        fetchData();
        const posts = await getPostsByUserId(user?.id || "");
        setPosts(posts);
      })();
    } finally {
      setIsFetchingPosts(false);
    }
  }, []);

  const handleChange = (e: unknown, newValue: TabsProps): void => {
    setActiveTab(newValue);
  };

  const _renderPosts = (): JSX.Element | React.ReactNode => {
    if (isFetchingPosts) {
      return new Array(5).fill("")
.map((data, i) => <h1 key={i}>Skeleton</h1>);
    }
    const jsx = posts.map((postData) => {
      return <PostCard key={postData.id} data={postData} />;
    });
    return jsx;
  };

  return (
    <NoobPage
      title="Account"
      metaData={{
        description: "Noob Storm account page",
      }}
    >
      <div className={commonStyles.container}>
        <Grid container my={2} spacing={2}>
          <Grid item xs={12} md={4}>
            <UserProfileCard />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box className={commonStyles.postsContainer}>
              <TabContext value={activeTab}>
                <Box>
                  <TabList onChange={handleChange} value={activeTab}>
                    <Tab label="Posts" value="posts" />
                    <Tab label="Match activity" value="activity" />
                    <Tab label="Social" value="social" />
                  </TabList>
                </Box>

                <Box my={4}>
                  <Divider light />
                </Box>

                <TabPanel sx={{ p: 0 }} value="posts">
                  <CreatePostInput setPosts={setPosts} />
                  {_renderPosts()}
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value="activity">
                  Match activity
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <NoobRow>
                          <NoobCell>Tournament Name</NoobCell>
                          <NoobCell>Game</NoobCell>
                          <NoobCell>Type</NoobCell>
                          <NoobCell>Date</NoobCell>
                          <NoobCell>Participants</NoobCell>
                          <NoobCell>Status</NoobCell>
                        </NoobRow>
                        {data.map((i, idx) => {
                          const game = games.find((g) => g.id === i.game)
                          return (
                            <NoobRow
                              key={idx}
                              onClick={(): void => {
                                router.push(
                                  `/view-tournament/${i.tournament_uuid}/details`
                                );
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <NoobCell>{i?.name}</NoobCell>
                              <NoobCell>{game?.displayName}</NoobCell>
                              <NoobCell>
                                {i.settings?.tournamentFormat}
                              </NoobCell>
                              <NoobCell>
                                {moment(i.startDate).format("DD MMM YYYY")}
                              </NoobCell>
                              <NoobCell>
                                {i.bracketsMetadata?.playersLimit} Participants
                              </NoobCell>
                              <NoobCell>
                                {moment(i.startDate).isAfter(moment()) ? (
                                  <Typography color={"#6931F9"}>
                                    Open
                                  </Typography>
                                ) : (
                                  <Typography color={"green"}>
                                    Completed
                                  </Typography>
                                )}
                              </NoobCell>
                            </NoobRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value="social">
                  <SocialMedia hideChat={true} />
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </div>
    </NoobPage>
  );
}

export default withProtected(Account);
