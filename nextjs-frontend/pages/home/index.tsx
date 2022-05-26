import { Fragment } from 'react';
import type { NextPage } from 'next'
import NoobPage from '../../src/frontend/components/page/noob-page'
import { Typography, Grid, Button } from '@mui/material'
import styles from './home.module.css';

const Home: NextPage = () => {
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
				</Grid>
			</Fragment>
    </NoobPage>
  )
}

export default Home