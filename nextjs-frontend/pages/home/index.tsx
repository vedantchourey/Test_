import { Fragment, useState, SyntheticEvent, useEffect } from "react";
import {
  Typography,
  Grid,
  Button,
  Box,
  Container,
  Skeleton,
} from "@mui/material";
import styles from "./home.module.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import StarRateIcon from "@mui/icons-material/StarRate";
import StorageIcon from "@mui/icons-material/Storage";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import moment from "moment";
import TwitchIcon from "../../src/frontend/components/icons/twitch-icon";
import YoutubeIcon from "../../src/frontend/components/icons/youtube-icon";
import { useAppSelector } from "../../src/frontend/redux-store/redux-store";
import { allGamesSelector } from "../../src/frontend/redux-store/games/game-selectors";
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from "../../src/frontend/redux-store/layout/device-types";
import router from "next/router";
import { userProfileSelector } from "../../src/frontend/redux-store/authentication/authentication-selectors";
import { getTopPosts } from "../../src/frontend/service-clients/post-service-client";
import { IPostsResponse } from "../../src/frontend/service-clients/messages/i-posts-response";
import PostCard from "../../src/frontend/components/account/posts/post-card";
import { getAuthHeader } from "../../src/frontend/utils/headers";
import axios from "axios";

const Home = (): JSX.Element => {
  const isDesktop = useAppSelector((x) =>
    isDeviceTypeSelector(x, deviceTypes.desktop)
  );
  const user = useAppSelector(userProfileSelector);
  const [newsData, setNewsData] = useState<any[]>([]);
  const [posts, setPosts] = useState<IPostsResponse[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(true);

  const [value, setValue] = useState("1");

  const handleChange = (event: SyntheticEvent, newValue: string): void => {
    setValue(newValue);
  };

  const sortRecentPost = (post: any): any => {
    const sortedList = post.sort(
      (a: any, b: any) =>
        new Date(b.createdAt || b.created_at).getTime() -
        new Date(a.createdAt || a.created_at).getTime()
    );
    return sortedList;
  };

  const fetchPosts = async (): Promise<void> => {
    try {
      setIsFetchingPosts(true);
      const posts: IPostsResponse[] | undefined = await getTopPosts();

      setPosts(sortRecentPost(posts));
    } finally {
      setIsFetchingPosts(false);
    }
  };

  const getleaderboardgamedata = async (gameId: string): Promise<void> => {
    try {
      const endpoint = "/api/news/newslist";
      axios
        .get(endpoint, { params: { game_id: gameId } })
        .then((res) => {
          setNewsData(sortRecentPost(res.data));
        })
        .catch(function (error) {
          console.error(error);
          setNewsData([]);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchPosts();
  }, [user]);

  useEffect(() => {
    getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257");
  }, []);

  const responsive = {
    0: { items: 0 },
    568: { items: 0 },
    1024: { items: 1 },
  };

  const _renderPosts = (): JSX.Element | React.ReactNode => {
    if (isFetchingPosts) {
      return new Array(5)
        .fill("")
        .map((i, key) => <Skeleton key={`${i}${key}`} />);
    }
    const jsx = posts.map((postData, index) => {
      if (index < 3) {
        return (
          <PostCard
            key={postData.id}
            data={postData}
            row={true}
            isDesktop={isDesktop}
          />
        );
      }
    });
    return jsx;
  };

  const [tournamentsData, setData] = useState([]);

  const TournamentsData = async (): Promise<void> => {
    try {
      const endpoint = "/api/tournaments/list";
      axios
        .get(endpoint, {
          params: {
            game: "",
            limit: 3,
          },
        })
        .then((res) => {
          setData(res.data.data.tournaments.filter((i: any) => i !== null));
        })
        .catch(function (error) {
          setData([]);
          console.error(error);
        })
        .finally((): void => {});
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    TournamentsData();
  }, []);

  const items = [
    <div className="item" data-value="1" key={"1"}>
      <Box className={styles.slider}>
        <img src="/images/group.png" />
        <Typography className={styles.text3}>
          Always keep in touch with your friends and watch their activities,
          like and comment.
        </Typography>
        <span className={styles.border}></span>
        <Box className={styles.sliderBox}>
          <YoutubeIcon />
          <img src="/images/Discord.png" style={{ height: "19px" }} />
          <TwitchIcon />
        </Box>
      </Box>
    </div>,
    <div className="item" data-value="2" key={"2"}>
      <Box className={styles.slider}>
        <img src="/images/group.png" />
        <Typography className={styles.text3}>
          Always keep in touch with your friends and watch their activities,
          like and comment.
        </Typography>
        <span className={styles.border}></span>
        <Box className={styles.sliderBox}>
          <YoutubeIcon />
          <img src="/images/Discord.png" style={{ height: "19px" }} />
          <TwitchIcon />
        </Box>
      </Box>
    </div>,
    <div className="item" data-value="3" key={"3"}>
      <Box className={styles.slider}>
        <img src="/images/group.png" />
        <Typography className={styles.text3}>
          Always keep in touch with your friends and watch their activities,
          like and comment.
        </Typography>
        <span className={styles.border}></span>
        <Box className={styles.sliderBox}>
          <YoutubeIcon />
          <img src="/images/Discord.png" style={{ height: "19px" }} />
          <TwitchIcon />
        </Box>
      </Box>
    </div>,
  ];

  return (
    <Fragment>
      <Grid container xs={12}>
        {isDesktop && (
          <>
            <Grid item xs={12} lg={9}>
              <Box className={styles.backgroundImg}>
                <div className={styles.bgImgContainer}>
                  <Typography className={styles.text1}>
                    PIXIEFREAK GAMING
                  </Typography>
                  <Typography className={styles.text2}>
                    We organize eSports tournaments for professional and amateur
                    gamers
                  </Typography>
                  <Button variant="text" className={styles.button1}>
                    Read More
                  </Button>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} lg={3}>
              <div className={styles.imgContainer}>
                <img src="/images/home1.png" className={styles.img1} />
                <img src="/images/home2.png" className={styles.img1} />
                <img src="/images/home3.png" className={styles.img1} />
              </div>
            </Grid>
          </>
        )}
        {!isDesktop && (
          <>
            <Grid item xs={12}>
              <Typography
                style={{
                  marginTop: 42,
                  color: "white",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: 16,
                  textTransform: "uppercase",
                }}
              >
                PIXIEFREAK GAMING
              </Typography>
              <Typography
                style={{
                  marginTop: 16,
                  color: "white",
                  fontFamily: "Chakra Petch",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: 18,
                  textTransform: "uppercase",
                  marginBottom: 22,
                }}
              >
                We organize eSports tournaments for professional and amateur
                gamers
              </Typography>
              <Button variant="text" className={styles.button1}>
                Read More
              </Button>
              <Grid
                container
                direction={"row"}
                style={{
                  justifyContent: "space-between",
                  flexGrow: 1,
                  marginTop: 42,
                }}
              >
                <img src="/images/home1.png" className={styles.img1} />
                <img src="/images/home2.png" className={styles.img1} />
                <img src="/images/home3.png" className={styles.img1} />
              </Grid>
            </Grid>
          </>
        )}
        {isDesktop ? (
          <>
            <Container maxWidth="xl" className={styles.container}>
              <Grid item xs={12} lg={30}>
                <TabContext value={value}>
                  <Box className={styles.tabBox}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        value="1"
                        className={styles.tab}
                        icon={<StarRateIcon />}
                        iconPosition="start"
                        label="TOP POSTS"
                      />
                      <Tab
                        value="2"
                        className={styles.tab}
                        icon={<StorageIcon />}
                        iconPosition="start"
                        label="NEW FEED"
                      />
                      <Tab
                        value="3"
                        className={styles.tab}
                        icon={<EmojiEventsIcon />}
                        iconPosition="start"
                        label="TOURNAMENTS"
                      />
                    </TabList>
                    <Button
                      className={styles.viewAllButton}
                      onClick={async (): Promise<void> => {
                        await router.push("tournaments-list");
                      }}
                    >
                      VIEW All
                    </Button>
                  </Box>
                  <TabPanel
                    value="1"
                    className={styles.postContainer}
                    style={{ flexDirection: "column" }}
                  >
                    <Box display={"flex"}>{_renderPosts()}</Box>
                  </TabPanel>
                  <TabPanel value="2" className={styles.newsFeedContainer}>
                    <Grid container columns={{ xs: 16, sm: 8, md: 12, lg: 12 }}>
                      {newsData.map((i: any, key) => {
                        if (key < 3) {
                          return (
                            <Grid item xs={12} lg={4}>
                              <Box
                                className={styles.newsFeedImg}
                                style={{
                                  backgroundImage: `url(${i.image})`,
                                }}
                              >
                                <Box className={styles.newsGrid}>
                                  <Button
                                    variant="text"
                                    className={styles.newsFeedButton}
                                  >
                                    SHOOTERS
                                  </Button>
                                  <Typography className={styles.newsFeedText}>
                                    {i.title}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          );
                        }
                      })}
                    </Grid>
                  </TabPanel>
                  <TabPanel value="3" className={styles.tournamentContainer}>
                    <Grid container columns={{ xs: 16, sm: 8, md: 12, lg: 12 }}>
                      {tournamentsData.map((data: any) => {
                        const startDateTime = moment(data.startDate).format(
                          "D MMM YYYY hh:mm A"
                        );
                        return (
                          <Grid item xs={12} lg={4}>
                            <img
                              src="/images/tournament1.png"
                              className={styles.newsFeedImg}
                            />
                            <Box style={{ marginTop: "-355px" }}>
                              <Box className={styles.tournamentTopContainer}>
                                <Button
                                  variant="text"
                                  style={{
                                    background: moment(startDateTime).isBefore(
                                      moment()
                                    )
                                      ? "#F08743"
                                      : "#EF5DA8",
                                  }}
                                  className={styles.tournamentButton}
                                >
                                  {moment(startDateTime).isBefore(moment())
                                    ? "Completed"
                                    : "On Going"}
                                </Button>
                              </Box>
                              <Box className={styles.textMainContainer}>
                                <Box className={styles.textContainer}>
                                  <Typography
                                    className={styles.tContainerText1}
                                  >
                                    TOURNAMENT TYPE
                                  </Typography>
                                  <Typography
                                    className={styles.tContainerText2}
                                  >
                                    {data.settings?.tournamentFormat}
                                  </Typography>
                                </Box>
                                <Box className={styles.textContainer}>
                                  <Typography
                                    className={styles.tContainerText1}
                                  >
                                    PLATFORM
                                  </Typography>
                                  <Typography
                                    className={styles.tContainerText2}
                                  >
                                    PC
                                  </Typography>
                                </Box>
                              </Box>
                              <Box className={styles.tournamentBottomContainer}>
                                <Typography className={styles.tournamentText1}>
                                  {data.name}
                                </Typography>
                                <Typography className={styles.tournamentText2}>
                                  {startDateTime}
                                </Typography>
                                <img
                                  src="/images/arrow1.png"
                                  className={styles.arrowImg}
                                />
                              </Box>
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </TabPanel>
                </TabContext>
              </Grid>
              {isDesktop && (
                <>
                  <Grid
                    item
                    xs={12}
                    lg={3}
                    className={styles.mainSideBox}
                    style={{ marginLeft: 20 }}
                  >
                    <Box className={styles.sideBox}>
                      <AliceCarousel
                        items={items}
                        responsive={responsive}
                        autoPlay={true}
                        autoPlayInterval={10000}
                        infinite={true}
                      />
                    </Box>
                  </Grid>
                </>
              )}
            </Container>
          </>
        ) : (
          <>
            <Grid container xs={12} style={{ marginTop: 33 }}>
              <TabContext value={value}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab value="1" label="TOP POSTS" />
                  <Tab value="2" label="NEW FEED" />
                  <Tab value="3" label="TOURNAMENTS" />
                </TabList>
                <TabPanel value="1">
                  <Grid item xs={12}>
                    {_renderPosts()}
                  </Grid>
                </TabPanel>
                <TabPanel value="2">
                  <Grid container columns={{ xs: 16, sm: 8, md: 12, lg: 12 }}>
                    {newsData.map((i: any, key) => {
                      if (key < 3) {
                        return (
                          <Grid item xs={12} lg={4} style={{ marginTop: 25 }}>
                            <Box
                              className={styles.newsFeedImg}
                              style={{
                                backgroundImage: `url(${i.image})`,
                              }}
                            >
                              <Box className={styles.newsGrid}>
                                <Button
                                  variant="text"
                                  className={styles.newsFeedButton}
                                >
                                  SHOOTERS
                                </Button>
                                <Typography className={styles.newsFeedText}>
                                  {i.title}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        );
                      }
                    })}
                  </Grid>
                </TabPanel>
                <TabPanel value="3">
                  <Grid container columns={{ xs: 16, sm: 8, md: 12, lg: 12 }}>
                    <Grid item xs={12} lg={4} style={{ marginTop: 25 }}>
                      <img
                        src="/images/tournament1.png"
                        className={styles.newsFeedImg}
                      />
                      <Box style={{ marginTop: "-355px" }}>
                        <Box className={styles.tournamentTopContainer}>
                          <Button
                            variant="text"
                            style={{ background: "#F08743" }}
                            className={styles.tournamentButton}
                          >
                            Completed
                          </Button>
                        </Box>
                        <Box className={styles.textMainContainer}>
                          <Box className={styles.textContainer}>
                            <Typography className={styles.tContainerText1}>
                              TOURNAMENT TYPE
                            </Typography>
                            <Typography className={styles.tContainerText2}>
                              Round Robin
                            </Typography>
                          </Box>
                          <Box className={styles.textContainer}>
                            <Typography className={styles.tContainerText1}>
                              PLATFORM
                            </Typography>
                            <Typography className={styles.tContainerText2}>
                              PC
                            </Typography>
                          </Box>
                        </Box>
                        <Box className={styles.tournamentBottomContainer}>
                          <Typography className={styles.tournamentText1}>
                            ENDPOINTGG VS CEX ESPORTS [2]
                          </Typography>
                          <Typography className={styles.tournamentText2}>
                            10 OCT 2018 14:35 PM
                          </Typography>
                          <img
                            src="/images/arrow1.png"
                            className={styles.arrowImg}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={4} style={{ marginTop: 25 }}>
                      <img
                        src="/images/tournament1.png"
                        className={styles.newsFeedImg}
                      />
                      <Box style={{ marginTop: "-355px" }}>
                        <Box className={styles.tournamentTopContainer}>
                          <Button
                            variant="text"
                            style={{ background: "#EF5DA8" }}
                            className={styles.tournamentButton}
                          >
                            ON-going
                          </Button>
                        </Box>
                        <Box className={styles.textMainContainer}>
                          <Box className={styles.textContainer}>
                            <Typography className={styles.tContainerText1}>
                              TOURNAMENT TYPE
                            </Typography>
                            <Typography className={styles.tContainerText2}>
                              Round Robin
                            </Typography>
                          </Box>
                          <Box className={styles.textContainer}>
                            <Typography className={styles.tContainerText1}>
                              PLATFORM
                            </Typography>
                            <Typography className={styles.tContainerText2}>
                              PC
                            </Typography>
                          </Box>
                        </Box>
                        <Box className={styles.tournamentBottomContainer}>
                          <Typography className={styles.tournamentText1}>
                            ENDPOINTGG VS CEX ESPORTS [2]
                          </Typography>
                          <Typography className={styles.tournamentText2}>
                            10 OCT 2018 14:35 PM
                          </Typography>
                          <img
                            src="/images/arrow1.png"
                            className={styles.arrowImg}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} lg={4} style={{ marginTop: 25 }}>
                      <img
                        src="/images/tournament1.png"
                        className={styles.newsFeedImg}
                      />
                      <Box style={{ marginTop: "-355px" }}>
                        <Box className={styles.tournamentTopContainer}>
                          <Button
                            variant="text"
                            className={styles.tournamentButton}
                          >
                            OPEN
                          </Button>
                        </Box>
                        <Box className={styles.textMainContainer}>
                          <Box className={styles.textContainer}>
                            <Typography className={styles.tContainerText1}>
                              TOURNAMENT TYPE
                            </Typography>
                            <Typography className={styles.tContainerText2}>
                              Round Robin
                            </Typography>
                          </Box>
                          <Box className={styles.textContainer}>
                            <Typography className={styles.tContainerText1}>
                              PLATFORM
                            </Typography>
                            <Typography className={styles.tContainerText2}>
                              PC
                            </Typography>
                          </Box>
                        </Box>
                        <Box className={styles.tournamentBottomContainer}>
                          <Typography className={styles.tournamentText1}>
                            ENDPOINTGG VS CEX ESPORTS [2]
                          </Typography>
                          <Typography className={styles.tournamentText2}>
                            10 OCT 2018 14:35 PM
                          </Typography>
                          <img
                            src="/images/arrow1.png"
                            className={styles.arrowImg}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </TabPanel>
              </TabContext>
            </Grid>
          </>
        )}
      </Grid>
    </Fragment>
  );
};

export default Home;
