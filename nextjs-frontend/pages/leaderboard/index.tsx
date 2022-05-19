import { Fragment } from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import Heading from '../../src/frontend/components/ui-components/typography/heading';
import NoobPage from '../../src/frontend/components/page/noob-page';
import styles from "./leaderboard.module.css";
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from '../../src/frontend/redux-store/layout/device-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Slider from "react-slick";

function createData(
  rank: HTMLParagraphElement,
  img: ImageData,
  name: string,
  rating: string,
) {
  return { rank, img, name, rating};
}

const rows = [
  createData(<Typography>1<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3}/>, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>2<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3}/>, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>3<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3}/>, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>4<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3}/>, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>5<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3}/>, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>6<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3}/>, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>7<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3}/>, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>8<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3}/>, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>9<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3}/>, 'Ralph Edwards', '58,267.000'),
  createData(<Typography>10<sup>th</sup></Typography>, <img src="/icons/Ellipse 4.png" className={styles.img3}/>, 'Ralph Edwards', '58,267.000'),
];

const Leaderboard = (): JSX.Element => {

  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          initialSlide: 5
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }
  return (
    <NoobPage title="Leaderboard" metaData={{ description: "Noob Storm Leaderboard page" }}>
      <Fragment>
        <Container maxWidth="xl">
          <Heading divider heading={"LEADERBOARD"} />

{/*          <div>
            <Slider {...settings}>
              <div>
                <h3><img src="/images/game1.png"/></h3>
              </div>
              <div>
              <h3><img src="/images/game2.png"/></h3>
              </div>
              <div>
              <h3><img src="/images/game3.png"/></h3>
              </div>
              <div>
              <h3><img src="/images/game4.png"/></h3>
              </div>
              <div>
              <h3><img src="/images/game5.png"/></h3>
              </div>
              <div>
              <h3><img src="/images/game6.png"/></h3>
              </div>
              <div>
              <h3><img src="/images/game7.png"/></h3>
              </div>
              <div>
              <h3><img src="/images/game8.png"/></h3>
              </div>
            </Slider>
          </div>
*/}
          {isDesktop && 
          <Grid container spacing={{ lg: 2 }} columns={{ xs: 16, sm: 8, md: 12, lg: 12 }} className={styles.mainContainer}>
            {Array.from(Array(3)).map((_, index) => (
              <Grid item xs={12} lg={4} key={index} >
                <Box className={styles.container}>
                  <img src="/icons/Male.png" className={styles.img1} />
                  <Box style={{ marginLeft: '45px' }}>
                    <Box className={styles.box1}>
                      <Typography className={styles.text1}>Leo Bergson</Typography>
                      <Box className={styles.box2}>
                        <Typography className={styles.text2}>ELO RATING</Typography>
                        <Button variant="text" className={styles.button1}>56,267.000</Button>
                      </Box>
                      <Box className={styles.box3}>
                        <Box className={styles.box4}>
                          <img src="/icons/Brawl_Icon 1.png" className={styles.img2}/>
                        </Box>
                        <Typography className={styles.text3}>Legend Club</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>}
          <div style={{ padding: '10px' }}>
          <TableContainer component={Paper} className={styles.mainTable}>
            <Table>
              <TableHead>
                <TableRow sx={{ 'th': { border: 1, borderColor: 'rgba(255, 255, 255, 0.1)', color : '#6932F9' } }}>
                  <TableCell style={{ width: '8%' }} align="center">Rank</TableCell>
                  <TableCell style={{ width: '65%' }}>Username</TableCell>
                  <TableCell style={{ width: '25%' }}>Elo Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ '&:last-child td, &:last-child th': { border: 1, borderColor: 'rgba(255, 255, 255, 0.1)'} }}>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="center" component="th" scope="row">{row.rank}</TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span>{row.img}</span>
                        <span style={{ padding: '10px' }}>{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{row.rating}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
        </Container>
      </Fragment>
    </NoobPage>
  )
}

export default Leaderboard