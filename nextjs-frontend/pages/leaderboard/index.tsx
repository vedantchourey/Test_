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
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import NoobPage from "../../src/frontend/components/page/noob-page";
import Heading from "../../src/frontend/components/ui-components/typography/heading";
import { deviceTypes } from "../../src/frontend/redux-store/layout/device-types";
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import { useAppSelector } from "../../src/frontend/redux-store/redux-store";
import { getAuthHeader } from "../../src/frontend/utils/headers";
import styles from "./leaderboard.module.css";

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
}

const Leaderboard = (): JSX.Element => {
  const responsive = {
    0: { items: 2 },
    568: { items: 3 },
    1024: { items: 12 },
  };

  const [leaderboardgamedata, setData] = React.useState<Gameinfo[]>([]);
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

  React.useEffect(() => {
    getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257");
  }, []);

  const choose_game_items = [
    <Button className="item" key={1} data-value="1">
      <img
        src="/images/game1.png"
        onClick={(): any =>
          getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257")
        }
      />
    </Button>,
    <Button className="item" key={2} data-value="2">
      <img
        src="/images/game2.png"
        onClick={(): any =>
          getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")
        }
      />
    </Button>,
    <Button className="item" key={3} data-value="3">
      <img
        src="/images/game3.png"
        onClick={(): any =>
          getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")
        }
      />
    </Button>,
    <Button className="item" key={4} data-value="4">
      <img
        src="/images/game4.png"
        onClick={(): any =>
          getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")
        }
      />
    </Button>,
    <Button className="item" key={5} data-value="5">
      <img
        src="/images/game5.png"
        onClick={(): any =>
          getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")
        }
      />
    </Button>,
    <Button className="item" key={6} data-value="6">
      <img
        src="/images/game6.png"
        onClick={(): any =>
          getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")
        }
      />
    </Button>,
    <Button className="item" key={7} data-value="7">
      <img
        src="/images/game7.png"
        onClick={(): any =>
          getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")
        }
      />
    </Button>,
    <Button className="item" key={8} data-value="8">
      <img
        src="/images/game8.png"
        onClick={(): any =>
          getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")
        }
      />
    </Button>,
    <Button className="item" key={9} data-value="9">
      <img
        src="/images/game9.png"
        onClick={(): any =>
          getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")
        }
      />
    </Button>,
    <Button className="item" key={10} data-value="10">
      <img
        src="/images/game10.png"
        onClick={(): any =>
          getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")
        }
      />
    </Button>,
    <Button className="item" key={11} data-value="11">
      <img
        src="/images/game11.png"
        onClick={(): any =>
          getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")
        }
      />
    </Button>,
    <Button className="item" key={12} data-value="12">
      <img
        src="/images/game12.png"
        onClick={(): any =>
          getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")
        }
      />
    </Button>,
    <Button className="item" key={13} data-value="13">
      <img
        src="/images/game1.png"
        onClick={(): any =>
          getleaderboardgamedata("ce718f19-ad37-4e56-a958-216da59e9257-1")
        }
      />
    </Button>,
  ];

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
          <Typography className={styles.text}>Choose Game</Typography>
          <AliceCarousel items={choose_game_items} responsive={responsive} />
          {isDesktop && (
            <Grid
              container
              spacing={{ lg: 2 }}
              columns={{ xs: 16, sm: 8, md: 12, lg: 12 }}
              className={styles.mainContainer}
            >
              {leaderboardgamedata.slice(0, 2).map((item) => (
                <Grid item xs={12} lg={4} key={item.id}>
                  <Box className={styles.container}>
                    <img src="/icons/Male.png" className={styles.img1} />
                    <Box style={{ marginLeft: "45px" }}>
                      <Box className={styles.box1}>
                        <Typography className={styles.text1}>
                          {item.user_id}
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
                    <TableCell style={{ width: "25%" }}>Elo Rating</TableCell>
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
                  {leaderboardgamedata.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center" component="th" scope="row">
                        {item.id}
                        <sup>th</sup>
                      </TableCell>
                      <TableCell>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span>
                            <img src="/icons/Ellipse 4.png" />
                          </span>
                          <span style={{ padding: "10px" }}>
                            {item.user_id}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{item.elo_rating}</TableCell>
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
