import * as React from 'react'
import type { NextPage } from 'next'
import NoobPage from '../../src/frontend/components/page/noob-page'
import Heading from '../../src/frontend/components/ui-components/typography/heading';
import { Typography, Grid, Container } from '@mui/material'
import { Box } from '@mui/system'
import styles from './faq.module.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from '../../src/frontend/redux-store/layout/device-types';

const Faq: NextPage = () => {

	const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));

  return (
    <NoobPage title='Faq' metaData={{ description: "Noob Storm faq page" }}>
      <React.Fragment>

				{isDesktop && 

				<Grid container columns={{ xs: 12, sm: 8, md: 12, lg: 8 }} spacing={{ xs: 2, md: 3 }}>
				<div style={{position: 'relative'}}>
					<img className={styles.backgroundImg} src="/images/faq.png" />
					<Typography className={styles.text1}>How It works.</Typography>
					<Typography className={styles.text2}>{`It's easier than you think. Follow 4 simple easy steps`}</Typography>
					<div className={styles.mainContainer}>
						<Grid item xs={12} lg={12} className={styles.container}>
							<Box className={styles.mainBox}>
								<span className={styles.span}>1</span>
								<Box className={styles.box}>
									<img src="/icons/account_group_team_user_icon.png"/>
								</Box>
								<Box className={styles.box1}>
									<Typography className={styles.text3}>Sign Up</Typography>
								</Box>
							</Box>
							<Box className={styles.arrowImg}>
								<img src="/icons/Arrow1.png"/>
							</Box>
							<Box className={styles.mainBox}>
							<span className={styles.span}>2</span>
								<Box className={styles.box}>
									<img src="/icons/deposit_safe_savings_icon.png"/>
								</Box>
								<Box className={styles.box1}>
									<Typography className={styles.text3}>DEPOSIT</Typography>
								</Box>
							</Box>
							<Box className={styles.arrowImg}>
								<img src="/icons/Arrow2.png"/>
							</Box>
							<Box className={styles.mainBox}>
							<span className={styles.span}>3</span>
								<Box className={styles.box}>
									<img src="/icons/Vector.png"/>
								</Box>
								<Box className={styles.box1}>
									<Typography className={styles.text3}>COMPETE</Typography>
								</Box>
							</Box>
							<Box className={styles.arrowImg}>
								<img src="/icons/Arrow1.png"/>
							</Box>
							<Box className={styles.mainBox}>
							<span className={styles.span}>4</span>
								<Box className={styles.box}>
									<img src="/icons/business_tools_get_money_buy_coin_icon.png"/>
								</Box>
								<Box className={styles.box1}>
									<Typography className={styles.text3}>GET PAID</Typography>
								</Box>
							</Box>
						</Grid>
					</div>
				</div>
				</Grid>}
				
				{!isDesktop && 
				<Grid container columns={{ xs: 16, sm: 8, md: 12, lg: 8 }} spacing={{ xs: 0, md: 3 }}>
					<div className={styles.mainMobileDiv}>
						<Typography className={styles.mobileText1}>How It works.</Typography>
						<Typography className={styles.mobileText2}>{`It's easier than you think. Follow 4 simple easy steps`}</Typography>
						
						<div className={styles.mainMobileContainer}>
							<Grid item xs={16} lg={12} className={styles.mobileContainer}>
								
								<Box className={styles.mainMobileBox}>
									<span className={styles.mobileSpan}>1</span>
									<Box className={styles.mobileBox}>
										<img src="/icons/account_group_team_user_icon.png" className={styles.mobileImg}/>
									</Box>
										<Typography className={styles.mobileText3}>Sign Up</Typography>
								</Box>
								<Box className={styles.mainMobileBox}>
									<span className={styles.mobileSpan}>2</span>
									<Box className={styles.mobileBox}>
										<img src="/icons/deposit_safe_savings_icon.png" className={styles.mobileImg} />
									</Box>
									<Typography className={styles.mobileText3}>DEPOSIT</Typography>
								</Box>
								<Box className={styles.mainMobileBox}>
									<span className={styles.mobileSpan}>3</span>
									<Box className={styles.mobileBox}>
										<img src="/icons/Vector.png" className={styles.mobileImg} />
									</Box>
									<Typography className={styles.mobileText3}>COMPETE</Typography>
								</Box>
								<Box className={styles.mainMobileBox}>
									<span className={styles.mobileSpan}>4</span>
									<Box className={styles.mobileBox}>
										<img src="/icons/business_tools_get_money_buy_coin_icon.png" className={styles.mobileImg} />
									</Box>
									<Typography className={styles.mobileText3}>GET PAID</Typography>
								</Box>
							</Grid>
						</div>
					</div>
				</Grid>}

				<Container maxWidth="xl">
					<Heading divider heading={"frequently asked questions"} />
					<Grid container columns={{ xs: 12, sm: 8, md: 12, lg: 8 }} spacing={{ xs: 2, md: 3 }}>
						{Array.from(Array(8)).map((_, index) => (
							<Grid item xs={12} lg={4} key={index}>
								<Accordion className={styles.mainAccordion}>
									<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
										<div className={styles.accordionSummary}>
											<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
											<Typography className={styles.text4}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.?</Typography>
										</div>
									</AccordionSummary>
									<AccordionDetails className={styles.accordionDetail}>
										<Box style={{ display: 'flex' }}>
											<span className={styles.border}></span>
										</Box>
										<Typography className={styles.text5}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}</Typography>
									</AccordionDetails>
								</Accordion>
							</Grid>
						))}
					</Grid>
				</Container>
      </React.Fragment>
    </NoobPage>
  )
}

export default Faq