import * as React from 'react'
import type { NextPage } from 'next'
import NoobPage from '../../src/frontend/components/page/noob-page'
import { Typography, Divider, Grid, Container, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material'
import styles from './faq.module.css';
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from '../../src/frontend/redux-store/layout/device-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq: NextPage = () => {

	const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));

	return (
		<NoobPage title='Faq' metaData={{ description: "Noob Storm faq page" }}>
			<React.Fragment>

				{isDesktop &&
					<div>
						<Divider style={{ padding: 25 }}>
							<Typography variant="h3" color={"white"}>FAQ</Typography>
						</Divider>
						<Container maxWidth="xl">
							<Grid container columns={{ xs: 12, sm: 8, md: 12, lg: 8 }} spacing={{ xs: 2, md: 3 }}>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>What is Noobstorm?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Noobstorm facilitates skill-based video game tournaments for cash prizes. All major consoles, pc, and mobile devices are supported as well as popular skill-based video games.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>Does it cost anything to sign up to Noobstorm?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Noobstorm is 100% free to sign up and there are no monthly subscription charges.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>What is Noobstorm Free Agency? </Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Join the Noobstorm Free Agency Market and get scouted by the best e-sports teams in India. </Typography>
											<Typography className={styles.text5}>Click the Enter Free Agency Button and get listed on the Free Agency Market. Select your game and platform and we’ll take care of the rest. Once you get listed, let our market do its magic. Teams from all across India can now send you offers to join their teams.</Typography>
											<Typography className={styles.text5}>You can view the Offers Received by simply clicking on the Offers Received Tab once you have listed yourself on the Free Agency Market. Once you receive an Invite to Join a Team you can choose to either accept or decline the invitation.</Typography>
											<Typography className={styles.text5}>If you accept a TEAM invite, you can view your new team by simply clicking on the MY TEAMS Tab.</Typography>
											<Typography className={styles.text5}>You can view the Offers Sent by you on behalf of your team to e-sports talent across India that are listed on the Free Agency Market by simply clicking on the Offers Sent Tab.  Once they accept your invite, you can enter Team Tournaments by clicking on the Tournaments Tab.</Typography>
											<Typography className={styles.text5}>You can shortlist players that you find may be a potential fit for your team. Simply CLICK on the ADD TO WATCH LIST button and view them later.</Typography>
											<Typography className={styles.text5}>You can now view the players shortlisted by you by simply clicking on the WATCH LIST Tab. It helps you in deciding if you want to potentially send them an offer to join your team.</Typography>
											<Typography className={styles.text5}>Send offers to the best e-sports talent across the country with a single click of the Send Offer to Recruit button. If you’re not ready to send an offer just yet you could also shortlist the player for later by simply clicking on the Add to Watch List button.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>What are Noobstorm Credits? Where can I purchase them?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Noobstorm Credits are your source of entry for daily competitions on Noobstorm. Purchase credits today and get started playing in tournaments with cash prizes up for grab immediately.</Typography>
											<Typography className={styles.text5}>Noobstorm Credits can be purchased from the Store.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>What is a Prize Pool?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Prize Pool is the total amount of money that is distributed among the winners in a tournament.</Typography>
											<Typography className={styles.text5}>The Prize Pool is dynamic and dependent on the number of participants that enter a particular tournament.</Typography>
											<Typography className={styles.text5}>For example if there is a tournament bracket (64 slots) and only 16 participants join, the prize pool will be appropriated according to the 16 participants and NOT the 64 slots. Therefore, if the tournament entry fee was 1 credit (Rs. 100/-) the prize pool for 16 participants would amount to Rs. 1600/-.</Typography>
											<Typography className={styles.text5}>The default prize pool starts from (0) zero and keeps increasing as participants join the tournament. </Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>How do refunds work?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>a)	In the event, that there is an error in the Services provided by us, we may refund the Entry Fee in the form of Noobstorm Credits, provided the reasons are genuine and proved after investigation by Noobstorm.</Typography>
											<Typography className={styles.text5}>b)	Please read the rules of each Tournament before participating.</Typography>
											<Typography className={styles.text5}>c)	In case we cancel a particular tournament which you have already joined, We will refund your Noobstorm Credits back to your account within a reasonable amount of time for You to redeem the same by playing other Tournaments on Noobstorm.</Typography>
											<Typography className={styles.text5}>d)	In case you fail to check in before or during a tournament within the stipulated time period as mentioned in the tournament timings and rules of a particular tournament there will be NO REFUNDS. A walkover will be handed over to your opponent.</Typography>
											<Typography className={styles.text5}>e)	We will try Our best to create the best user experience for You. If paid by credit card, refunds will be issued to the original credit card provided at the time of purchase and in case of payments made through a payment gateway, payment refunds will be made to the same account.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>How do Player Progression cards work?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Noobstorm Player progression cards are specific to each game. They are dynamic in nature.  In order to determine the skill level of players competing in Noobstorm Tournaments we use the Elo Rating system. The Elo rating system is a method for calculating the relative skill levels of players</Typography>
											<Typography className={styles.text5}>It is inferred from the wins and losses against other players. Players’ ratings depend on the ratings of their opponents and the results scored against them.</Typography>
											<Typography className={styles.text5}>After every game, the winning player takes points from the losing one, and the number of points is determined by the difference in the 2 player’s rating.</Typography>
											<Typography className={styles.text5}>•	If the higher-rated player wins, a few points are taken from the lower-rated player.</Typography>
											<Typography className={styles.text5}>•	If the lower-rated player wins, a lot of points are taken from the higher-rated player.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>What is the Match Hub?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>The Match Hub is designed especially keeping in mind YOU the gamers. Any and every tournament that you enter on Noobstorm gets tracked in the Match Hub. You can view the tournaments that you are competing in as well as have easy access to check-in and reporting your results before and after the start of a match. </Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>When and why do I need to Check-in?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>The check-in timer is designed keeping in mind all competitors who are present before the tournament kickstarts. This helps in conducting a tournament without any delays which is what every competitor wants. </Typography>
											<Typography className={styles.text5}>Add your opponent on the respective console/pc/mobile device by entering their gamer tags which are located next to their usernames in order to ensure online play.  </Typography>
											<Typography className={styles.text5}>Click on the Check-in button before the timer runs out to ensure your participation in the match otherwise a walkover will be handed over to your opponent. There shall be no refunds if you fail to check-in within the stipulated time period.</Typography>
											<Typography className={styles.text5}>You can connect with your opponent in the Chat Box. You can also connect with Noobstorm Support by clicking on the Support Tab in the Chat Box.</Typography>
											<Typography className={styles.text5}>You can report the result of a match by simply clicking on the Report Result Button. In the pop-up just select the winner of the Match and upload a picture of the result. Our Admins will take care of the rest.</Typography>
											<Typography className={styles.text5}>The Report Match Issue button is there to ensure you don’t face any problems. If there is an issue with your match simply click on the Report Match Issue button and select the appropriate option.</Typography>
											<Typography className={styles.text5}>For example if your opponent doesn’t show up or you feel they have reported the wrong result.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>Is KYC verification necessary to join tournaments on Noobstorm?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>No. You can join Tournaments even without verifying your account. When you win cash tournaments, your winnings will be deposited into your Noobstorm winnings balance. Verification becomes mandatory for making withdrawals from your Noobstorm account to your bank/wallet account.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>How do I get my Noobstorm account KYC verified?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>In order to do KYC, Open Noobstorm {'>>'} Click on Wallet {'>>'} Go to KYC Details {'>>'} Click Submit KYC {'>>'} Upload a clear photo of a valid Government ID(Aadhaar Card, Driving License, PAN Card, Voter Card, Driving License). Enter the details and wait for 24 hours. Our team will approve your KYC.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>Why do I need to do KYC for withdrawals?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Noobstorm is an esports platform where you can win real cash legally. Your withdrawals on Noobstorm involve the transfer of money from your Noobstorm account to your bank/wallet account, and hence KYC becomes a mandatory requirement as proof of identity.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>How do I withdraw money from my Noobstorm account?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>You can withdraw money only from the winnings account in your account once your account is KYC verified. This verification is a one-time process which doesn’t need to be repeated. Once your account is verified, you can withdraw tournament winnings from your Noobstorm account.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
							</Grid>
						</Container>
					</div>
				}

				{!isDesktop &&
					<div>
						<Divider>
							<Typography variant="h3" color={"white"}>FAQ</Typography>
						</Divider>
						<Container maxWidth="xl">
							<Grid container columns={{ xs: 12, sm: 8, md: 12, lg: 8 }} spacing={{ xs: 2, md: 3 }}>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>What is Noobstorm?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Noobstorm facilitates skill-based video game tournaments for cash prizes. All major consoles, pc, and mobile devices are supported as well as popular skill-based video games.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>Does it cost anything to sign up to Noobstorm?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Noobstorm is 100% free to sign up and there are no monthly subscription charges.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>What is Noobstorm Free Agency? </Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Join the Noobstorm Free Agency Market and get scouted by the best e-sports teams in India. </Typography>
											<Typography className={styles.text5}>Click the Enter Free Agency Button and get listed on the Free Agency Market. Select your game and platform and we’ll take care of the rest. Once you get listed, let our market do its magic. Teams from all across India can now send you offers to join their teams.</Typography>
											<Typography className={styles.text5}>You can view the Offers Received by simply clicking on the Offers Received Tab once you have listed yourself on the Free Agency Market. Once you receive an Invite to Join a Team you can choose to either accept or decline the invitation.</Typography>
											<Typography className={styles.text5}>If you accept a TEAM invite, you can view your new team by simply clicking on the MY TEAMS Tab.</Typography>
											<Typography className={styles.text5}>You can view the Offers Sent by you on behalf of your team to e-sports talent across India that are listed on the Free Agency Market by simply clicking on the Offers Sent Tab.  Once they accept your invite, you can enter Team Tournaments by clicking on the Tournaments Tab.</Typography>
											<Typography className={styles.text5}>You can shortlist players that you find may be a potential fit for your team. Simply CLICK on the ADD TO WATCH LIST button and view them later.</Typography>
											<Typography className={styles.text5}>You can now view the players shortlisted by you by simply clicking on the WATCH LIST Tab. It helps you in deciding if you want to potentially send them an offer to join your team.</Typography>
											<Typography className={styles.text5}>Send offers to the best e-sports talent across the country with a single click of the Send Offer to Recruit button. If you’re not ready to send an offer just yet you could also shortlist the player for later by simply clicking on the Add to Watch List button.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>What are Noobstorm Credits? Where can I purchase them?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Noobstorm Credits are your source of entry for daily competitions on Noobstorm. Purchase credits today and get started playing in tournaments with cash prizes up for grab immediately.</Typography>
											<Typography className={styles.text5}>Noobstorm Credits can be purchased from the Store.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>What is a Prize Pool?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Prize Pool is the total amount of money that is distributed among the winners in a tournament.</Typography>
											<Typography className={styles.text5}>The Prize Pool is dynamic and dependent on the number of participants that enter a particular tournament.</Typography>
											<Typography className={styles.text5}>For example if there is a tournament bracket (64 slots) and only 16 participants join, the prize pool will be appropriated according to the 16 participants and NOT the 64 slots. Therefore, if the tournament entry fee was 1 credit (Rs. 100/-) the prize pool for 16 participants would amount to Rs. 1600/-.</Typography>
											<Typography className={styles.text5}>The default prize pool starts from (0) zero and keeps increasing as participants join the tournament. </Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>How do refunds work?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>a)	In the event, that there is an error in the Services provided by us, we may refund the Entry Fee in the form of Noobstorm Credits, provided the reasons are genuine and proved after investigation by Noobstorm.</Typography>
											<Typography className={styles.text5}>b)	Please read the rules of each Tournament before participating.</Typography>
											<Typography className={styles.text5}>c)	In case we cancel a particular tournament which you have already joined, We will refund your Noobstorm Credits back to your account within a reasonable amount of time for You to redeem the same by playing other Tournaments on Noobstorm.</Typography>
											<Typography className={styles.text5}>d)	In case you fail to check in before or during a tournament within the stipulated time period as mentioned in the tournament timings and rules of a particular tournament there will be NO REFUNDS. A walkover will be handed over to your opponent.</Typography>
											<Typography className={styles.text5}>e)	We will try Our best to create the best user experience for You. If paid by credit card, refunds will be issued to the original credit card provided at the time of purchase and in case of payments made through a payment gateway, payment refunds will be made to the same account.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>How do Player Progression cards work?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Noobstorm Player progression cards are specific to each game. They are dynamic in nature.  In order to determine the skill level of players competing in Noobstorm Tournaments we use the Elo Rating system. The Elo rating system is a method for calculating the relative skill levels of players</Typography>
											<Typography className={styles.text5}>It is inferred from the wins and losses against other players. Players’ ratings depend on the ratings of their opponents and the results scored against them.</Typography>
											<Typography className={styles.text5}>After every game, the winning player takes points from the losing one, and the number of points is determined by the difference in the 2 player’s rating.</Typography>
											<Typography className={styles.text5}>•	If the higher-rated player wins, a few points are taken from the lower-rated player.</Typography>
											<Typography className={styles.text5}>•	If the lower-rated player wins, a lot of points are taken from the higher-rated player.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>What is the Match Hub?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>The Match Hub is designed especially keeping in mind YOU the gamers. Any and every tournament that you enter on Noobstorm gets tracked in the Match Hub. You can view the tournaments that you are competing in as well as have easy access to check-in and reporting your results before and after the start of a match. </Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>When and why do I need to Check-in?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>The check-in timer is designed keeping in mind all competitors who are present before the tournament kickstarts. This helps in conducting a tournament without any delays which is what every competitor wants. </Typography>
											<Typography className={styles.text5}>Add your opponent on the respective console/pc/mobile device by entering their gamer tags which are located next to their usernames in order to ensure online play.  </Typography>
											<Typography className={styles.text5}>Click on the Check-in button before the timer runs out to ensure your participation in the match otherwise a walkover will be handed over to your opponent. There shall be no refunds if you fail to check-in within the stipulated time period.</Typography>
											<Typography className={styles.text5}>You can connect with your opponent in the Chat Box. You can also connect with Noobstorm Support by clicking on the Support Tab in the Chat Box.</Typography>
											<Typography className={styles.text5}>You can report the result of a match by simply clicking on the Report Result Button. In the pop-up just select the winner of the Match and upload a picture of the result. Our Admins will take care of the rest.</Typography>
											<Typography className={styles.text5}>The Report Match Issue button is there to ensure you don’t face any problems. If there is an issue with your match simply click on the Report Match Issue button and select the appropriate option.</Typography>
											<Typography className={styles.text5}>For example if your opponent doesn’t show up or you feel they have reported the wrong result.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>Is KYC verification necessary to join tournaments on Noobstorm?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>No. You can join Tournaments even without verifying your account. When you win cash tournaments, your winnings will be deposited into your Noobstorm winnings balance. Verification becomes mandatory for making withdrawals from your Noobstorm account to your bank/wallet account.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>How do I get my Noobstorm account KYC verified?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>In order to do KYC, Open Noobstorm {'>>'} Click on Wallet {'>>'} Go to KYC Details {'>>'} Click Submit KYC {'>>'} Upload a clear photo of a valid Government ID(Aadhaar Card, Driving License, PAN Card, Voter Card, Driving License). Enter the details and wait for 24 hours. Our team will approve your KYC.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>Why do I need to do KYC for withdrawals?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>Noobstorm is an esports platform where you can win real cash legally. Your withdrawals on Noobstorm involve the transfer of money from your Noobstorm account to your bank/wallet account, and hence KYC becomes a mandatory requirement as proof of identity.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
								<Grid item xs={12} lg={4} >
									<Accordion className={styles.mainAccordion}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
											<div className={styles.accordionSummary}>
												<img src="/icons/Group149.png" style={{ width: '48px', height: '48px' }} />
												<Typography className={styles.text4}>How do I withdraw money from my Noobstorm account?</Typography>
											</div>
										</AccordionSummary>
										<AccordionDetails className={styles.accordionDetail}>
											<Box style={{ display: 'flex' }}>
												<span className={styles.border}></span>
											</Box>
											<Typography className={styles.text5}>You can withdraw money only from the winnings account in your account once your account is KYC verified. This verification is a one-time process which doesn’t need to be repeated. Once your account is verified, you can withdraw tournament winnings from your Noobstorm account.</Typography>
										</AccordionDetails>
									</Accordion>
								</Grid>
							</Grid>
						</Container>
					</div>}
			</React.Fragment>
		</NoobPage>
	)
}

export default Faq