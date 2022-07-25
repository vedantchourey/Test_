import { Box, Button, Container, Grid, Typography } from "@mui/material";
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
import { getAuthHeader } from "../../src/frontend/utils/headers";
import styles from "./leaderboard.module.css";
import { useRouter } from "next/router";

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
}

const imagedata: any = {
  FIFA_22: "/images/game1.svg",
  CSG_O2: "/images/game2.svg",
  CALL_OF_DUTY: "/images/game3.svg",
  PUBG: "/images/game4.svg",
  F1_2021: "/images/game5.svg",
  VALORANT: "/images/game6.svg",
  OVERWATCH: "/images/game7.svg",
  DOTA_2: "/images/game8.svg",
  MORTAL_KOMBAT_X: "/images/game9.svg",
  FORTNITE: "/images/game10.svg",
  APEX_LEGENDS: "/images/game11.svg",
  ROCKET_LEAGUE: "/images/game12.svg",
  lolp: "/images/game1.svg",
  corp: "/images/game2.svg",
};

const Leaderboard = (): JSX.Element => {
  const [leaderboardgamedata, setData] = React.useState<Gameinfo[]>([]);
  const router=useRouter();
  const getleaderboardgamedata = async (gameId: string): Promise<void> => {
    try {
      const endpoint = "/api/leaderboard";
      const headers = await getAuthHeader();
      axios
        .get(endpoint, { params: { game_id: gameId }, headers: headers })
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
  }, [games]);

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
            sx={{ maxWidth: isDesktop?"1400px":"300px" }}
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
          {isDesktop && (
            <Grid
              container
              spacing={{ lg: 2 }}
              columns={{ xs: 16, sm: 8, md: 12, lg: 12 }}
              className={styles.mainContainer}
            >
              {leaderboardgamedata.slice(0, 3).map((item, index) => (
                <Grid item xs={12} lg={4} key={item.id} onClick={():any=>{router.push(`account/${item.userDetails.username}`)}}>
                  <Box className={styles.container}>
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
                            paddingLeft: "35%",
                          }}
                          fontSize={10}
                          textAlign="center"
                        >
                          {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"}
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
                        className={styles.borderImage}
                      />
                      <img
                        src={"/icons/Male.png"}
                        className={styles.img1}
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
                    </Box>

                    <Box style={{ marginLeft: "45px" }}>
                      <Box className={styles.box1}>
                        <Typography className={styles.text1}>
                          {item.userDetails.username}
                        </Typography>
                        <Box className={styles.box2}>
                          <Typography className={styles.text2}>
                            ELO RATING
                          </Typography>
                          <Button variant="text" className={styles.button1}>
                            {item.elo_rating}
                          </Button>
                        </Box>
                        <Box className={styles.box3}>
                          <Box className={styles.box4}>
                            <img
                              src="/images/game8.png"
                              className={styles.img2}
                            />
                          </Box>
                          <Typography className={styles.text3}>
                            Legend Club
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
          <div style={{ padding: "10px" }}>
            <TableContainer component={Paper} className={styles.mainTable}>
              <Table>
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
                    <TableCell style={{ width: "8%" }} align="center">
                      Rank
                    </TableCell>
                    <TableCell style={{ width: "65%" }}>Username</TableCell>
                    {isDesktop && (
                      <TableCell style={{ width: "25%" }}>Elo Rating</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 1,
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {leaderboardgamedata 
                    .slice(isDesktop?3:0, leaderboardgamedata.length)
                    .map((item, idx) => (
                      <TableRow key={item.id} onClick={():any=>{router.push(`account/${item.userDetails.username}`)}}>
                        <TableCell align="center" component="th" scope="row">
                          {idx + (isDesktop?4:1)}
                          <sup>th</sup>
                        </TableCell>
                        <TableCell>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span>
                              <img src="/icons/Ellipse 4.png" />
                            </span>
                            <span style={{ padding: "10px" }}>
                              {item.userDetails.username}
                            </span>
                          </div>
                        </TableCell>
                        {isDesktop&&(<TableCell>{item.elo_rating}</TableCell>)}
                      </TableRow>
                    ))}
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
