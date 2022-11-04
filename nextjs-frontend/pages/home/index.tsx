import { Fragment, useState, SyntheticEvent, useEffect } from "react";
import { CardContent, CardMedia, Card } from "@mui/material";
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
// import TwitchIcon from "../../src/frontend/components/icons/twitch-icon";
// import YoutubeIcon from "../../src/frontend/components/icons/youtube-icon";
import { useAppSelector } from "../../src/frontend/redux-store/redux-store";
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from "../../src/frontend/redux-store/layout/device-types";
import router from "next/router";
import { getTopPosts } from "../../src/frontend/service-clients/post-service-client";
import { IPostsResponse } from "../../src/frontend/service-clients/messages/i-posts-response";
import PostCard from "../../src/frontend/components/account/posts/post-card";
import axios from "axios";
import CardComp from "../../src/frontend/components/tournaments-list/card";

const Home = (): JSX.Element => {
  const isDesktop = useAppSelector((x) =>
    isDeviceTypeSelector(x, deviceTypes.desktop));

  

  const [newsData, setNewsData] = useState<any[]>([]);
  const [posts, setPosts] = useState<IPostsResponse[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(true);
  const [carouselImages, setCarouselImages] = useState<{ id: string, name: string, subtitle: string, navigation: string, image: string }[]>([]);
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

  const fetchCarousels = async (): Promise<void> => {
    try {
      axios
        .get("/api/home-carousel/list")
        .then((res) => {
          setCarouselImages(res.data);
        })
        .catch((err) => {
          console.error("Error: Error while getting home carousels.", err);
        });
    } catch (error) {
      console.warn("Error: ", error);
    }
  };

  useEffect(() => {
    getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257");
  }, []);

  const responsive = {
    0: { items: 1 }
  };

  const _renderPosts = (): JSX.Element | React.ReactNode => {
    if (isFetchingPosts) {
      return new Array(5)
        .fill("")
        .map((i, key) => <Skeleton key={`${i}${key}`} />);
    }
    const jsx = posts.map((postData, index) => {
      if (index < 4) {
        return (
          <PostCard
            key={postData.id}
            data={postData}
            row={isDesktop}
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
            sortType: "home",
            limit: 100,
          },
        })
        .then((res) => {
          setData(res.data.data.tournaments.filter((i: any) => i !== null));
        })
        .catch(function (error) {
          setData([]);
          console.error(error);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    TournamentsData();
    fetchPosts();
    fetchCarousels();
  }, []);

  const topImageCarousel = carouselImages.map((image) => {
    return (
      <div
        data-value={image.id}
        key={image.id}
        className={styles.imageContainer}
        onClick={(): void => {
          router.push(image.navigation)
        }}>
        <Box style={{ width: "100%" }}>
          <img
            src={image.image}
            style={{ width: "100%", position: "relative" }}
            className={styles.mainCarouselImage}
          />
          <Box className={styles.carouselContainer} style={{ position: "absolute" }}>
            <Typography className={isDesktop ? styles.title : styles.text1Mobile} style={{ marginBottom: 20, marginLeft: 10 }}>
              {image.name}
            </Typography>
            <div style={{ width: "70%" }}>
              <Typography className={isDesktop ? styles.subtitle : styles.text2Mobile} style={{ marginBottom: 20, marginLeft: 10 }}>
                {image.subtitle}
              </Typography>
            </div>
          </Box>
        </Box>
      </div>
    )
  });

  return (
    <Fragment>
      <Grid container style={{ flex: 1 }}>
        {isDesktop && (
          <>
            <Grid item xs={12} lg={12}>
              <div className={styles.backgroundImg}>
                <AliceCarousel
                  items={topImageCarousel}
                  responsive={responsive}
                  autoPlay={true}
                  disableButtonsControls={true}
                  // disableDotsControls={true}
                  autoPlayInterval={10000}
                  infinite={true}
                />
              </div>
            </Grid>
          </>
        )}
        {!isDesktop && (
          <div style={{ width: "90vw", marginTop: 40 }}>
            <AliceCarousel
              items={topImageCarousel}
              responsive={responsive}
              autoPlay={true}
              disableButtonsControls={true}
              autoPlayInterval={10000}
              infinite={true}
            />
          </div>
        )}
        {isDesktop ? (
            <>
              <Container maxWidth="xl" className={styles.container}>
                <Grid item xs={12} lg={30} mt={5}>
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
                          label="NEWS FEED"
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
                          value === "1"
                            ? await router.push("social")
                            : value === "2"
                            ? await router.push("blog")
                            : await router.push("tournaments-list");
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
                      <Box
                        overflow={"scroll"}
                        maxWidth={"62vw"}
                        display={"flex"}
                        className={"hide-scrollbar"}
                      >
                        {_renderPosts()}
                      </Box>
                    </TabPanel>
                    <TabPanel value="2" className={styles.newsFeedContainer}>
                      <Grid
                        container
                        columns={{ xs: 16, sm: 8, md: 12, lg: 12 }}
                        display="flex"
                      >
                        {newsData.map((i: any, key) => {
                          if (key < 4) {
                            return (
                              <Card
                                sx={{ maxWidth: 280, m: 2 }}
                                key={key}
                                onClick={(): any => router.push(`/blog/${i.id}`)}
                              >
                                {i.label &&<Typography
                                  style={{
                                    position: "absolute",
                                    backgroundColor: "#6932F9",
                                    marginTop: "15px",
                                    padding: "5px 25px",
                                    color: "white",
                                  }}
                                >
                                  {i.label}
                                </Typography>}
                                <CardMedia
                                  component="img"
                                  height="240"
                                  image={i.image}
                                  alt="green iguana"
                                />
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="h5"
                                    fontSize={16}
                                    textAlign={"left"}
                                    component="div"
                                  >
                                    {i.title}
                                  </Typography>
                                  <Typography
                                    textAlign={"left"}
                                    variant="h1"
                                    fontSize={14}
                                    mt={1}
                                    color={"#6931F9"}
                                  >
                                    Author: {i.author} / Publishing Date:{" "}
                                    {moment(i.created_at).format("DD MMM YYYY")}
                                  </Typography>
                                </CardContent>
                              </Card>
                            );
                          }
                        })}
                      </Grid>
                    </TabPanel>
                    <TabPanel value="3" className={styles.tournamentContainer}>
                      <Grid display={"flex"} maxWidth={"75vw"} className={"hide-scrollbar"}>
                        {tournamentsData
                          .sort((a: any, b: any) => {
                            const aTime: any = moment(a.startDate).format("x");
                            const bTime: any = moment(b.startDate).format("x");
                            return bTime - aTime;
                          }).slice(0,3)
                          .map((data: any) => {
                            const startDateTime =
                              moment(data.startDate).format("D MMM YYYY ") +
                              moment(data.startTime, "HH:mm:ss").format("LT");
                            const totalSlots = data?.bracketsMetadata?.playersLimit || 0;
                            const currentSlot = (data?.playerList || []).length;
                          return (
                            <CardComp
                              key={data.id}
                              id={data.id}
                              tournament_name={data.name}
                              banner={data.banner}
                              tournament_type={data.settings?.tournamentFormat}
                              platform={data.settings?.platform}
                              total_slots={totalSlots}
                              left_slots={currentSlot}
                              start_date={startDateTime}
                              credits={data.settings?.entryFeeAmount || 0}
                              participants={`${currentSlot} out of ${totalSlots}`}
                            />
                          );
                        })}
                      </Grid>
                    </TabPanel>
                  </TabContext>
                </Grid>
                {/* {isDesktop && (
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
                )} */}
              </Container>
            </>
          ) : (
            <>
              <Grid container xs={12} style={{ marginTop: 33 }}>
                <TabContext value={value}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    <Tab value="1"
                      icon={<StarRateIcon style={{ height: 20, width: 20 }} />}
                      iconPosition="start"
                      label="TOP POSTS"
                      style={{ fontSize: 12 }}
                    />
                    <Tab value="2"
                      icon={<StorageIcon style={{ height: 20, width: 20 }} />}
                      iconPosition="start"
                      label="NEWS FEED"
                      style={{ fontSize: 12 }}
                    />
                    <Tab value="3"
                      icon={<EmojiEventsIcon style={{ height: 20, width: 20 }} />}
                      iconPosition="start"
                      label="TOURNAMENTS"
                      style={{ fontSize: 12 }}
                    />
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
                            <Card
                              sx={{ maxWidth: 400, m: 2 }}
                              key={key}
                              onClick={(): any => router.push(`/blog/${i.id}`)}
                            >
                              {i.label&&<Typography
                                style={{
                                  position: "absolute",
                                  backgroundColor: "#6932F9",
                                  marginTop: "15px",
                                  padding: "5px 25px",
                                  color: "white",
                                }}
                              >
                                {i.label}
                              </Typography>}
                              <CardMedia
                                component="img"
                                height="240"
                                image={i.image}
                                alt="green iguana"
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  fontSize={16}
                                  textAlign={"left"}
                                  component="div"
                                >
                                  {i.title}
                                </Typography>
                                <Typography
                                  textAlign={"left"}
                                  variant="h1"
                                  fontSize={14}
                                  mt={1}
                                  color={"#6931F9"}
                                >
                                  Author: {i.author} / Publishing Date:{" "}
                                  {moment(i.created_at).format("DD MMM YYYY")}
                                </Typography>
                              </CardContent>
                            </Card>
                          );
                        }
                      })}
                    </Grid>
                  </TabPanel>
                  <TabPanel value="3">
                    <Grid container columns={{ xs: 16, sm: 8, md: 12, lg: 12 }}>
                    {tournamentsData
                            .sort((a: any, b: any) => {
                              const aTime: any = moment(a.startDate).format("x");
                              const bTime: any = moment(b.startDate).format("x");
                              return bTime - aTime;
                            }).slice(0,3)
                            .map((data: any) => {
                              const startDateTime =
                                moment(data.startDate).format("D MMM YYYY ") +
                                moment(data.startTime, "HH:mm:ss").format("LT");
                              const totalSlots = data?.bracketsMetadata?.playersLimit || 0;
                              const currentSlot = (data?.playerList || []).length;
                            return (
                              <CardComp
                                key={data.id}
                                id={data.id}
                                tournament_name={data.name}
                                banner={data.banner}
                                tournament_type={data.settings?.tournamentFormat}
                                platform={data.settings?.platform}
                                total_slots={totalSlots}
                                left_slots={currentSlot}
                                start_date={startDateTime}
                                credits={data.settings?.entryFeeAmount || 0}
                                participants={`${currentSlot} out of ${totalSlots}`}
                              />
                            );
                          })}
                    </Grid>
                  </TabPanel>

                  <TabPanel value="3" className={styles.tournamentContainer}>
                    <Grid container columns={{ xs: 16, sm: 8, md: 12, lg: 12 }}>
                        <Grid display={"flex"} maxWidth={"75vw"} className={"hide-scrollbar"}>
                          
                          
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
