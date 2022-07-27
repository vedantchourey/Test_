import React,{ useState, useEffect } from "react";
import NoobPage from "../../../src/frontend/components/page/noob-page";
import { Box, Grid, Typography, Tab, Divider,Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow, } from "@mui/material";
import commonStyles from "../../../src/frontend/styles/common.module.css";
import PostCard from "../../../src/frontend/components/account/posts/post-card";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { getPostsByUserId } from "../../../src/frontend/service-clients/post-service-client";
import Router from "next/router";
import { IPostsResponse } from "../../../src/frontend/service-clients/messages/i-posts-response";
import { IOthersProfileResponse } from "../../../src/frontend/service-clients/messages/i-profile";
import { getUserProfileByUsername } from "../../../src/frontend/service-clients/profile-service-client";
import OtherProfileCard from "../../../src/frontend/components/cards/others-profile-card/other-profile-card";
import { withProtected } from "../../../src/frontend/components/auth-wrapper/auth-wrapper";
import TextBanner from "../../../src/frontend/components/ui-components/typography/mainBannerHeading";
import { useAppSelector } from "../../../src/frontend/redux-store/redux-store";
import { userProfileSelector } from "../../../src/frontend/redux-store/authentication/authentication-selectors";
type TabsProps = "posts" | "activity";
import moment from "moment";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import {ITournament} from "../../../src/backend/services/database/models/i-tournaments";
import { allGamesSelector } from "../../../src/frontend/redux-store/games/game-selectors";
import { getAuthHeader } from "../../../src/frontend/utils/headers";
import axios from "axios";

function UserAccount(): JSX.Element {
  const loggedUser = useAppSelector(userProfileSelector);
  const [userData, setUserData] = useState<IOthersProfileResponse | null>(null);
  const [posts, setPosts] = useState<IPostsResponse[]>([]);
  const [isFetchingUserData, setIsFetchingUserData] = useState<boolean>(true);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(true);
  const username = Router.query.username as string;
  const [activeTab, setActiveTab] = useState<TabsProps>("posts");
  const router=useRouter();
  const [data, setData] = React.useState<ITournament[]>([]);

  const games = useAppSelector(allGamesSelector);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const result = await getUserProfileByUsername(username);
        if ( result ) {
          setUserData( result );
          fetchData( result.id );}
      } catch (err) {
        setIsFetchingUserData(false);
      }
    })();
  }, [username]);

  useEffect(() => {
    if (!userData) return;
    (async (): Promise<void> => {
      const posts = await getPostsByUserId(userData?.id);
      setPosts(posts);
      setIsFetchingUserData(false);
      setIsFetchingPosts(false);
    })();
  }, [userData]);

  const fetchData = async ( userId: string ): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get("/api/tournaments/user-matches-history-single", { headers: headers, params: { userId: userId }})
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  const NoobRow = styled(TableRow)(() => ({
    align: "center",
  }));
  
  const NoobCell = styled(TableCell)(() => ({
    border: "1px solid #ffffff1a",
    alignItems: "center",
  }));

  const handleChange = (e: unknown, newValue: TabsProps): void => {
    setActiveTab(newValue);
  };

  const _renderPosts = (): JSX.Element | React.ReactNode => {
    if (isFetchingPosts) {
      return null;
    } else if (!isFetchingPosts && posts.length) {
      return posts.map((postData, i) => {
        return <PostCard key={Date.now() + i} data={postData} />;
      });
    }
    // eslint-disable-next-line no-else-return
    else {
      return (
        <Box>
          <Typography variant="h3">No post available</Typography>
        </Box>
      );
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
    }
  };

  if (username === loggedUser?.username) {
    Router.replace("/account");
    return <> </>;
  }

  return (
    <NoobPage
      title="User Account"
      metaData={{
        description: "Noob Storm account page",
      }}
    >
      {!isFetchingUserData && userData ? (
        userData.isPrivate && !userData.isFollowing ? (
          <>
            <TextBanner heading="User account is private" />
          </>
        ) : (
          <div className={commonStyles.container}>
            <Grid container my={2} spacing={2}>
              <Grid item xs={12} md={4}>
                <OtherProfileCard
                  userData={userData}
                  key={Date.now().toString()}
                />
              </Grid>
              <Grid item xs={12} md={8} className={commonStyles.postsContainer}>
                <TabContext value={activeTab}>
                  <Box>
                    <TabList onChange={handleChange} value={activeTab}>
                      <Tab label="Posts" value="posts" />
                      <Tab label="Match activity" value="activity" />
                    </TabList>
                  </Box>
                  <Box my={2}>
                    <Divider light/>
                  </Box>
                  <TabPanel sx={{p:0}} value="posts">{_renderPosts()}</TabPanel>
                  <TabPanel sx={{p:0}} value="activity">
                    { data.length ?
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
                  </TableContainer> :
                  <Box>
                    <Typography variant="h3">No match history available</Typography>
                  </Box>}
                  </TabPanel>
                </TabContext>
              </Grid>
            </Grid>
          </div>
        )
      ) : isFetchingUserData ? (
        <></>
      ) : (
        <TextBanner heading="No user found" />
      )}
    </NoobPage>
  );
}

export default withProtected(UserAccount);
