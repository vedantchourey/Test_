import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Avatar,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { Fragment } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import NoobPage from "../../src/frontend/components/page/noob-page";
import Heading from "../../src/frontend/components/ui-components/typography/heading";
import {
  allGamesSelector,
  gamesFetchStatusSelector,
} from "../../src/frontend/redux-store/games/game-selectors";
import { fetchAllGamesThunk } from "../../src/frontend/redux-store/games/game-slice";
import { deviceTypes } from "../../src/frontend/redux-store/layout/device-types";
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import {
  useAppDispatch,
  useAppSelector,
} from "../../src/frontend/redux-store/redux-store";
import styles from "./leaderboard.module.css";
import { useRouter } from "next/router";
import { frontendSupabase } from "../../src/frontend/services/supabase-frontend-service";
import frontendConfig from "../../src/frontend/utils/config/front-end-config";
import GroupIcon from "@mui/icons-material/Group";

// const createData = (
//   rank: HTMLParagraphElement,
//   img: ImageData,
//   name: string,
//   rating: string,
// ) => {
//   return { rank, img, name, rating };
// }

/*const rows = [
  createData(<Typography>1<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3} />, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>2<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3} />, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>3<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3} />, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>4<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3} />, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>5<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3} />, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>6<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3} />, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>7<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3} />, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>8<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3} />, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>9<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3} />, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>10<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3} />, 'Ralph Edwards', '58,267.000'),
];*/

export interface Gameinfo {
  id: string;
  elo_rating: string;
  game_id: string;
  user_id: string;
  created_at: string;
  userDetails: any;
  loss:any;
  lost:any;
  won:any;
  name:any;
  teamLogo:any;
  avatarUrl:any;
}

const imagedata: any = {
  FIFA_22: "/images/games/Fifa.png",
  BGMI: "/images/games/BGMI.png",
  CSG_O2: "/images/games/COUNTER STRIKE.png",
  CALL_OF_DUTY: "/images/games/CALL OF DUTY.png",
  F1_2021: "/images/games/F1 22.png",
  VALORANT: "/images/games/VALORANT.png",
  OVERWATCH: "/images/games/OVERWATCH.png",
  DOTA_2: "/images/games/DOTA.png",
  MORTAL_KOMBAT_X: "/images/games/MORTAL KOMBAT.png",
  FORTNITE: "/images/games/FORTNITE.png",
  APEX_LEGENDS: "/images/games/APEX LEGENDS.png",
  ROCKET_LEAGUE: "/images/games/ROCKET LEAGUE.png",
};

const Leaderboard = (): JSX.Element => {
  const [leaderboardgamedata, setData] = React.useState<Gameinfo[]>([]);
  const router=useRouter();
  const [isTeam,setIsTeam]=React.useState<boolean>(false);

  const getleaderboardgamedata = async (gameId: string): Promise<void> => {
    try {
      const endpoint = `/api/leaderboard?isTeam=${isTeam}`;
      axios
        .get(endpoint, { params: { game_id: gameId } })
        .then((res) => {
          setData(res.data);
        })
        .catch(function (error) {
          console.error(error);
          setData([]);
        });
    } catch (err) {
      alert(err);
    }
  };

  const appDispatch = useAppDispatch();
  const games = useAppSelector(allGamesSelector);
  const gamesFetchStatus = useAppSelector(gamesFetchStatusSelector);
  const [selectedGame, setSelectedGame] = React.useState<string>(
    games.length > 0 ? games[0].id : ""
  );

  React.useEffect(() => {
    if (games.length) {
      getleaderboardgamedata(games[0].id);
    }
  }, [games,isTeam]);

  React.useEffect(() => {
    if (gamesFetchStatus !== "idle") return;
    appDispatch(fetchAllGamesThunk());
  }, [appDispatch, gamesFetchStatus]);

  const isDesktop = useAppSelector((x) =>
    isDeviceTypeSelector(x, deviceTypes.desktop));

  return (
    <NoobPage
      title="Leaderboard"
      metaData={{ description: "Noob Storm Leaderboard page" }}
    >
      <Fragment>
        <Container maxWidth="xl">
          <Heading divider heading={"LEADERBOARD"} />
          <Box
            mt={5}
            sx={
              isDesktop
                ? { maxWidth: "1000px", marginLeft: 4 }
                : { maxWidth: "290px" }
            }
            display={"flex"}
            flexWrap={"nowrap"}
            overflow={"scroll"}
            className="hide-scrollbar"
          >
            {games.map((data) => (
              <img
                key={1}
                data-value="1"
                className={styles.scrollImage}
                src={imagedata[data.code]}
                onClick={(): any => {
                  setSelectedGame(data.id);
                  getleaderboardgamedata(data.id);
                }}
                role="presentation"
                style={{
                  borderWidth: data.id === selectedGame ? 3 : 0,
                  borderColor: "#6932F9",
                  borderStyle: "solid",
                }}
              />
            ))}
          </Box>
          <FormControlLabel
            control={<Checkbox />}
            onChange={(): void => {
              setIsTeam(!isTeam);
            }}
            style={{ color: "white" }}
            label={<Typography className={styles.button}>Team</Typography>}
          />
          {
            <Grid
              container
              spacing={{ lg: 2 }}
              columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
              className={
                isDesktop ? styles.mainContainer : styles.mainContainerMobile
              }
            >
              {leaderboardgamedata
                ?.sort(function (a, b) {
                  return parseInt(b.elo_rating) - parseInt(a.elo_rating);
                })
                .slice(0, 3)
                ?.map((item, index) => {
                  const image = isTeam
                    ? item.teamLogo
                      ? frontendSupabase.storage
                          .from("public-files")
                          .getPublicUrl(item.teamLogo).publicURL
                      : null
                    : item.avatarUrl
                    ? item.avatarUrl
                    : null;
                  return (
                    <Grid
                      item
                      xs={12}
                      lg={4}
                      key={item.id}
                      onClick={(): any => {
                        isTeam
                          ? null
                          : router.push(`account/${item.userDetails.username}`);
                      }}
                    >
                      <Box
                        className={
                          isDesktop ? styles.container : styles.mobileContainer
                        }
                      >
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Box
                            display={"flex"}
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              style={{
                                paddingLeft: !isDesktop ? 0 : "35%",
                                color: "white",
                              }}
                              fontSize={10}
                              textAlign="center"
                            >
                              {index === 0
                                ? "1st"
                                : index === 1
                                ? "2nd"
                                : "3rd"}
                            </Typography>
                            {index === 0 && (
                              <img
                                src="/images/winnerCrown.png"
                                style={{ height: 10, width: 10, marginLeft: 5 }}
                              />
                            )}
                          </Box>
                          <img
                            src={
                              index === 0
                                ? "/images/winner1.png"
                                : index === 1
                                ? "/images/winner3.png"
                                : "/images/winner2.png"
                            }
                            className={
                              isDesktop
                                ? styles.borderImage
                                : styles.borderImageMobile
                            }
                          />
                          {isTeam ? (
                            image ? (
                              <img
                                src={image || ""}
                                className={
                                  isDesktop ? styles.img1 : styles.img1Mobile
                                }
                                style={{
                                  position: "absolute",
                                  borderColor:
                                    index === 0
                                      ? "#FFAA2E"
                                      : index === 1
                                      ? "#C05C00"
                                      : "#979797",
                                  borderStyle: "groove",
                                  borderWidth: 5,
                                }}
                              />
                            ) : (
                              <GroupIcon
                                className={
                                  isDesktop ? styles.img1 : styles.img1Mobile
                                }
                                style={{
                                  position: "absolute",
                                  borderColor:
                                    index === 0
                                      ? "#FFAA2E"
                                      : index === 1
                                      ? "#C05C00"
                                      : "#979797",
                                  borderStyle: "groove",
                                  borderWidth: 5,
                                }}
                              />
                            )
                          ) : (
                            <Avatar
                              src={`${frontendConfig.storage.publicBucketUrl}/${frontendConfig.storage.publicBucket}/${image}`}
                              className={
                                isDesktop ? styles.img1 : styles.img1Mobile
                              }
                              style={{
                                position: "absolute",
                                borderColor:
                                  index === 0
                                    ? "#FFAA2E"
                                    : index === 1
                                    ? "#C05C00"
                                    : "#979797",
                                borderStyle: "groove",
                                borderWidth: 5,
                              }}
                            />
                          )}
                        </Box>

                        <Box
                          style={{ marginLeft: !isDesktop ? "20px" : "45px" }}
                        >
                          <Box className={styles.box1}>
                            <Typography className={styles.text1}>
                              {isTeam ? item.name : item?.userDetails?.username}
                            </Typography>
                            <Box className={styles.box2}>
                              <Typography className={styles.text2}>
                                ELO RATING
                              </Typography>
                              <Button variant="text" className={styles.button1}>
                                {item.elo_rating}
                              </Button>
                            </Box>
                            <Box className={styles.box2}>
                              <Typography
                                className={styles.text2}
                                style={{ color: "white" }}
                              >
                                Game Played:{" "}
                                {isTeam
                                  ? item.loss + item.won
                                  : parseInt(item.lost) + parseInt(item.won)}
                              </Typography>
                              <Typography
                                className={styles.text2}
                                style={{ color: "white" }}
                              >
                                Wins: {isTeam ? item.won : parseInt(item.won)}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
            </Grid>
          }
          <div>
            <TableContainer component={Paper} className={styles.mainTable}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow
                    sx={{
                      th: {
                        border: 1,
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        color: "#6932F9",
                      },
                    }}
                  >
                    <TableCell
                      align="center"
                      style={{ fontSize: !isDesktop ? 10 : 15 }}
                    >
                      Rank
                    </TableCell>
                    <TableCell style={{ fontSize: !isDesktop ? 10 : 15 }}>
                      Username
                    </TableCell>
                    <TableCell style={{ fontSize: !isDesktop ? 10 : 15 }}>
                      Games Played
                    </TableCell>
                    <TableCell style={{ fontSize: !isDesktop ? 10 : 15 }}>
                      Wins
                    </TableCell>
                    {isDesktop && <TableCell>Elo Rating</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 1,
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      fontSize: !isDesktop ? 10 : 15,
                    },
                  }}
                >
                  {leaderboardgamedata
                    ?.sort(function (a, b) {
                      return parseInt(b.elo_rating) - parseInt(a.elo_rating);
                    })
                    .slice(0, leaderboardgamedata.length)
                    .map((item, idx) => {
                      const image = isTeam
                        ? item.teamLogo
                          ? frontendSupabase.storage
                              .from("public-files")
                              .getPublicUrl(item.teamLogo).publicURL
                          : null
                        : item.avatarUrl
                        ? item.avatarUrl
                        : null;
                      return (
                        <TableRow
                          key={item.id}
                          onClick={(): any => {
                            isTeam
                              ? null
                              : router.push(
                                  `account/${item.userDetails.username}`
                                );
                          }}
                        >
                          <TableCell align="center" component="th" scope="row">
                            {idx + (isDesktop ? 4 : 1)}
                            <sup>th</sup>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <span>
                                {isTeam ? (
                                  image ? (
                                    <img
                                      src={image || ""}
                                      width={!isDesktop ? "25px" : "45px"}
                                      height={!isDesktop ? "25px" : "45px"}
                                      style={{ borderRadius: 65 }}
                                    />
                                  ) : (
                                    <GroupIcon
                                      style={{
                                        borderRadius: 65,
                                        width: !isDesktop ? 25 : 45,
                                        height: !isDesktop ? 25 : 45,
                                      }}
                                    />
                                  )
                                ) : (
                                  <Avatar
                                    src={`${frontendConfig.storage.publicBucketUrl}/${frontendConfig.storage.publicBucket}/${image}`}
                                    style={{
                                      height: !isDesktop ? "25px" : "45px",
                                      width: !isDesktop ? "25px" : "45px",
                                      borderRadius: "65px",
                                    }}
                                  />
                                )}
                              </span>
                              <span style={{ padding: "10px" }}>
                                {isTeam
                                  ? item.name
                                  : item?.userDetails?.username}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                            {isTeam
                              ? item.loss + item.won
                              : parseInt(item.lost) + parseInt(item.won)}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                            {isTeam ? item.won : parseInt(item.won)}
                          </TableCell>
                          {isDesktop && (
                            <TableCell>{item.elo_rating}</TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Container>
      </Fragment>
    </NoobPage>
  );
};

export default Leaderboard;
