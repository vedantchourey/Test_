import { Fragment, useState, SyntheticEvent } from 'react';
import type { NextPage } from 'next'
import NoobPage from '../../src/frontend/components/page/noob-page'
import { Typography, Grid, Button, Box, Container } from '@mui/material'
import styles from './home.module.css';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StarRateIcon from '@mui/icons-material/StarRate';
import StorageIcon from '@mui/icons-material/Storage';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import TwitchIcon from '../../src/frontend/components/icons/twitch-icon';
import YoutubeIcon from '../../src/frontend/components/icons/youtube-icon';

const Home: NextPage = () => {

	const [value, setValue] = useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

	const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
  };

  const items = [
    <div className="item" data-value="1">
    	<Box className={styles.slider}>
				<img src="/images/group.png"/>
				<Typography className={styles.text3}>Always keep in touch with your friends and watch their activities, like and comment.</Typography>
				<span className={styles.border} ></span>
				<Box className={styles.sliderBox}>
					<YoutubeIcon/>
					<img src="/images/Discord.png" style={{ height: '19px' }} />
					<TwitchIcon/>
				</Box>
			</Box>
		</div>,
		<div className="item" data-value="2">
			<Box className={styles.slider}>
				<img src="/images/group.png"/>
				<Typography className={styles.text3}>Always keep in touch with your friends and watch their activities, like and comment.</Typography>
				<span className={styles.border} ></span>
				<Box className={styles.sliderBox}>
					<YoutubeIcon/>
					<img src="/images/Discord.png" style={{ height: '19px' }} />
					<TwitchIcon/>
				</Box>
			</Box>
		</div>,
		<div className="item" data-value="3">
			<Box className={styles.slider}>
				<img src="/images/group.png"/>
				<Typography className={styles.text3}>Always keep in touch with your friends and watch their activities, like and comment.</Typography>
				<span className={styles.border} ></span>
				<Box className={styles.sliderBox}>
					<YoutubeIcon/>
					<img src="/images/Discord.png" style={{ height: '19px' }} />
					<TwitchIcon/>
				</Box>
			</Box>
		</div>,
  ];

  return (
		<NoobPage title='Home' metaData={{ description: "Noob Storm home page" }}>
			<Fragment>
				<Grid container>
					<img className={styles.backgroundImg} src="/images/home.png" />
					<Grid item xs={12} lg={9}>
						<div className={styles.bgImgContainer}>
							<Typography className={styles.text1}>PIXIEFREAK GAMING</Typography>
							<Typography className={styles.text2}>We organize eSports tournaments for professional and amateur gamers</Typography>
							<Button variant="text" className={styles.button1}>Read More</Button>
						</div>
					</Grid>
					<Grid item xs={12} lg={3}>
						<div className={styles.imgContainer}>
							<img src="/images/home1.png" className={styles.img1}/>
							<img src="/images/home2.png" className={styles.img1}/>
							<img src="/images/home3.png" className={styles.img1}/>
						</div>
					</Grid>

					<Container maxWidth="xl" className={styles.container}>
						<Grid item xs={12} lg={9}>
								<TabContext value={value}>
									<TabList onChange={handleChange} aria-label="lab API tabs example">
										<Tab value="1" className={styles.tab} icon={<StarRateIcon />} iconPosition="start" label="TOP POSTS" />
										<Tab value="2" className={styles.tab} icon={<StorageIcon />} iconPosition="start" label="NEW FEED" />
										<Tab value="3" className={styles.tab} icon={<EmojiEventsIcon />} iconPosition="start" label="TOURNAMENTS" />
									</TabList>
									<TabPanel value="1" className={styles.postContainer}>
										<Grid container columns={{ xs: 16, sm: 8, md: 12, lg: 12 }}>
											{Array.from(Array(3)).map((_, index) => (
												<Grid item xs={12} lg={4} key={index} className={styles.postGrid}>

												</Grid>
											))}
										</Grid>
									</TabPanel>
									<TabPanel value="2" className={styles.newsFeedContainer}>
										<Grid container columns={{ xs: 16, sm: 8, md: 12, lg: 12 }}>											
											<Grid item xs={12} lg={4}>
												<img src="/images/newsfeed1.png" className={styles.newsFeedImg} />
												<Typography className={styles.newsFeedText}>Overwatch january 28 update nerfs echo, tracer, and zenyatta</Typography>
												<Button variant="text" className={styles.newsFeedButton}>SHOOTERS</Button>
											</Grid>
											<Grid item xs={12} lg={4}>
												<img src="/images/newsfeed2.png" className={styles.newsFeedImg} />
												<Typography className={styles.newsFeedText}>Zensports signs casino deal for colorado expansion</Typography>
												<Button variant="text" className={styles.newsFeedButton}>SLIDER</Button>
											</Grid>
											<Grid item xs={12} lg={4}>
												<img src="/images/newsfeed3.png" className={styles.newsFeedImg} />
												<Typography className={styles.newsFeedText}>Evil geniuses enters valorant with mixed-gender team</Typography>
												<Button variant="text" className={styles.newsFeedButton}>ADVENTURE</Button>
											</Grid>
										</Grid>
									</TabPanel>
									<TabPanel value="3" className={styles.tournamentContainer}>
										<Grid container columns={{ xs: 16, sm: 8, md: 12, lg: 12 }}>
											<Grid item xs={12} lg={4}>
												<img src="/images/tournament1.png" className={styles.newsFeedImg} />
												<Typography className={styles.newsFeedText}>Overwatch january 28 update nerfs echo, tracer, and zenyatta</Typography>
												<Button variant="text" className={styles.newsFeedButton}>SHOOTERS</Button>
											</Grid>
											<Grid item xs={12} lg={4}>
												<img src="/images/tournament1.png" className={styles.newsFeedImg} />
												<Typography className={styles.newsFeedText}>Overwatch january 28 update nerfs echo, tracer, and zenyatta</Typography>
												<Button variant="text" className={styles.newsFeedButton}>SHOOTERS</Button>
											</Grid>
											<Grid item xs={12} lg={4}>
												<img src="/images/tournament1.png" className={styles.newsFeedImg} />
												<Typography className={styles.newsFeedText}>Overwatch january 28 update nerfs echo, tracer, and zenyatta</Typography>
												<Button variant="text" className={styles.newsFeedButton}>SHOOTERS</Button>
											</Grid>
										</Grid>
									</TabPanel>
								</TabContext>
						</Grid>
						<Grid item xs={12} lg={3}>
							<Box className={styles.sideBox}>
								<AliceCarousel
									items={items}
									responsive={responsive}
								/>
							</Box>
						</Grid>
					</Container>

				</Grid>
			</Fragment>
    </NoobPage>
  )
}

export default Home