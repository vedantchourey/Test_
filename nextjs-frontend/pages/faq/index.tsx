import * as React from 'react'
import type { NextPage } from 'next'
import NoobPage from '../../src/frontend/components/page/noob-page'
import { Typography, Divider } from '@mui/material'
import { useAppSelector } from '../../src/frontend/redux-store/redux-store';
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from '../../src/frontend/redux-store/layout/device-types';

const Faq: NextPage = () => {

	const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));

	return (
		<NoobPage title='Faq' metaData={{ description: "Noob Storm faq page" }}>
			<React.Fragment>

				{isDesktop &&
					<div>
						<Divider style={{ padding: 35 }}>
							<Typography variant="h5">FAQ</Typography>
						</Divider>
						<div style={{ display: "flex", flexDirection: "column", gap: "10px", marginLeft: "40px" }}>
							<div>
								<Typography variant='subtitle1' color={"blueviolet"}>What is Noobstorm?</Typography>
								<Typography variant='body2'>Noobstorm facilitates skill-based video game tournaments for cash prizes. All major consoles, pc, and mobile devices are supported as well as popular skill-based video games.</Typography>
							</div>
							<div>
								<Typography variant='subtitle1' color={"blueviolet"}>Does it cost anything to sign up to Noobstorm?</Typography>
								<Typography variant='body2'>Noobstorm is 100% free to sign up and there are no monthly subscription charges.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>What is Noobstorm Free Agency?</Typography>
								<Typography variant='body2'>Join the Noobstorm Free Agency Market and get scouted by the best e-sports teams in India.</Typography>
								<Typography variant='body2'>Click the Enter Free Agency Button and get listed on the Free Agency Market. Select your game and platform and we’ll take care of the rest. Once you get listed, let our market do its magic. Teams from all across India can now send you offers to join their teams.</Typography>
								<Typography variant='body2'>You can view the Offers Received by simply clicking on the Offers Received Tab once you have listed yourself on the Free Agency Market. Once you receive an Invite to Join a Team you can choose to either accept or decline the invitation.</Typography>
								<Typography variant='body2'>If you accept a TEAM invite, you can view your new team by simply clicking on the MY TEAMS Tab.</Typography>
								<Typography variant='body2'>You can view the Offers Sent by you on behalf of your team to e-sports talent across India that are listed on the Free Agency Market by simply clicking on the Offers Sent Tab.  Once they accept your invite, you can enter Team Tournaments by clicking on the Tournaments Tab.</Typography>
								<Typography variant='body2'>You can shortlist players that you find may be a potential fit for your team. Simply CLICK on the ADD TO WATCH LIST button and view them later.</Typography>
								<Typography variant='body2'>You can now view the players shortlisted by you by simply clicking on the WATCH LIST Tab. It helps you in deciding if you want to potentially send them an offer to join your team.</Typography>
								<Typography variant='body2'>Send offers to the best e-sports talent across the country with a single click of the Send Offer to Recruit button. If you’re not ready to send an offer just yet you could also shortlist the player for later by simply clicking on the Add to Watch List button. </Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>What are Noobstorm Credits? Where can I purchase them?</Typography>
								<Typography variant='body2'>Noobstorm Credits are your source of entry for daily competitions on Noobstorm. Purchase credits today and get started playing in tournaments with cash prizes up for grab immediately.</Typography>
								<Typography variant='body2'>Noobstorm Credits can be purchased from the Store.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>What is a Prize Pool?</Typography>
								<Typography variant='body2'>Prize Pool is the total amount of money that is distributed among the winners in a tournament.</Typography>
								<Typography variant='body2'>The Prize Pool is dynamic and dependent on the number of participants that enter a particular tournament.</Typography>
								<Typography variant='body2'>For example if there is a tournament bracket (64 slots) and only 16 participants join, the prize pool will be appropriated according to the 16 participants and NOT the 64 slots. Therefore, if the tournament entry fee was 1 credit (Rs. 100/-) the prize pool for 16 participants would amount to Rs. 1600/-.</Typography>
								<Typography variant='body2'>The default prize pool starts from (0) zero and keeps increasing as participants join the tournament.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>How do refunds work?</Typography>
								<Typography variant='body2'>a)	In the event, that there is an error in the Services provided by us, we may refund the Entry Fee in the form of Noobstorm Credits, provided the reasons are genuine and proved after investigation by Noobstorm.</Typography>
								<Typography variant='body2'>b)	Please read the rules of each Tournament before participating.</Typography>
								<Typography variant='body2'>c)	In case we cancel a particular tournament which you have already joined, We will refund your Noobstorm Credits back to your account within a reasonable amount of time for You to redeem the same by playing other Tournaments on Noobstorm.</Typography>
								<Typography variant='body2'>d)	In case you fail to check in before or during a tournament within the stipulated time period as mentioned in the tournament timings and rules of a particular tournament there will be NO REFUNDS. A walkover will be handed over to your opponent.</Typography>
								<Typography variant='body2'>e)	We will try Our best to create the best user experience for You. If paid by credit card, refunds will be issued to the original credit card provided at the time of purchase and in case of payments made through a payment gateway, payment refunds will be made to the same account.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>How do Player Progression cards work?</Typography>
								<Typography variant='body2'>Noobstorm Player progression cards are specific to each game. They are dynamic in nature.  In order to determine the skill level of players competing in Noobstorm Tournaments we use the Elo Rating system. The Elo rating system is a method for calculating the relative skill levels of players</Typography>
								<Typography variant='body2'>It is inferred from the wins and losses against other players. Players’ ratings depend on the ratings of their opponents and the results scored against them.</Typography>
								<Typography variant='body2'>After every game, the winning player takes points from the losing one, and the number of points is determined by the difference in the 2 player’s rating.</Typography>
								<div style={{ display: "flex", flexDirection: "column", gap: "5px", marginLeft: "20px" }}>
									<Typography variant='body2'>•	If the higher-rated player wins, a few points are taken from the lower-rated player.</Typography>
									<Typography variant='body2'>•	If the lower-rated player wins, a lot of points are taken from the higher-rated player.</Typography>
								</div>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>What is the Match Hub?</Typography>
								<Typography variant='body2'>The Match Hub is designed especially keeping in mind YOU the gamers. Any and every tournament that you enter on Noobstorm gets tracked in the Match Hub. You can view the tournaments that you are competing in as well as have easy access to check-in and reporting your results before and after the start of a match.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>When and why do I need to Check-in?</Typography>
								<Typography variant='body2'>The check-in timer is designed keeping in mind all competitors who are present before the tournament kickstarts. This helps in conducting a tournament without any delays which is what every competitor wants.</Typography>
								<Typography variant='body2'>Add your opponent on the respective console/pc/mobile device by entering their gamer tags which are located next to their usernames in order to ensure online play.</Typography>
								<Typography variant='body2'>Click on the Check-in button before the timer runs out to ensure your participation in the match otherwise a walkover will be handed over to your opponent. There shall be no refunds if you fail to check-in within the stipulated time period.</Typography>
								<Typography variant='body2'>You can connect with your opponent in the Chat Box. You can also connect with Noobstorm Support by clicking on the Support Tab in the Chat Box.</Typography>
								<Typography variant='body2'>You can report the result of a match by simply clicking on the Report Result Button. In the pop-up just select the winner of the Match and upload a picture of the result. Our Admins will take care of the rest.</Typography>
								<Typography variant='body2'>The Report Match Issue button is there to ensure you don’t face any problems. If there is an issue with your match simply click on the Report Match Issue button and select the appropriate option.</Typography>
								<Typography variant='body2'>For example if your opponent doesn’t show up or you feel they have reported the wrong result.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>Is KYC verification necessary to join tournaments on Noobstorm?</Typography>
								<Typography variant='body2'>No. You can join Tournaments even without verifying your account. When you win cash tournaments, your winnings will be deposited into your Noobstorm winnings balance. Verification becomes mandatory for making withdrawals from your Noobstorm account to your bank/wallet account.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>How do I get my Noobstorm account KYC verified?</Typography>
								<Typography variant='body2'>In order to do KYC, Open Noobstorm {'>>'} Click on Wallet {'>>'} Go to KYC Details {'>>'} Click Submit KYC {'>>'} Upload a clear photo of a valid Government ID(Aadhaar Card, Driving License, PAN Card, Voter Card, Driving License). Enter the details and wait for 24 hours. Our team will approve your KYC.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>Why do I need to do KYC for withdrawals?</Typography>
								<Typography variant='body2'>Noobstorm is an esports platform where you can win real cash legally. Your withdrawals on Noobstorm involve the transfer of money from your Noobstorm account to your bank/wallet account, and hence KYC becomes a mandatory requirement as proof of identity.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>How do I withdraw money from my Noobstorm account?</Typography>
								<Typography variant='body2'>You can withdraw money only from the winnings account in your account once your account is KYC verified. This verification is a one-time process which doesn’t need to be repeated. Once your account is verified, you can withdraw tournament winnings from your Noobstorm account.</Typography>
							</div>
						</div>
					</div>
				}

				{!isDesktop &&
					<div>
						<Divider style={{ padding: 25 }}>
							<Typography variant="h3" color={"white"}>FAQ</Typography>
						</Divider>
						<div style={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "space-around", color: "white" }}>
							<div>
								<Typography variant='subtitle1' color={"blueviolet"}>What is Noobstorm?</Typography>
								<Typography variant='body2'>Noobstorm facilitates skill-based video game tournaments for cash prizes. All major consoles, pc, and mobile devices are supported as well as popular skill-based video games.</Typography>
							</div>
							<div>
								<Typography variant='subtitle1' color={"blueviolet"}>Does it cost anything to sign up to Noobstorm?</Typography>
								<Typography variant='body2'>Noobstorm is 100% free to sign up and there are no monthly subscription charges.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>What is Noobstorm Free Agency?</Typography>
								<Typography variant='body2'>Join the Noobstorm Free Agency Market and get scouted by the best e-sports teams in India.</Typography>
								<Typography variant='body2'>Click the Enter Free Agency Button and get listed on the Free Agency Market. Select your game and platform and we’ll take care of the rest. Once you get listed, let our market do its magic. Teams from all across India can now send you offers to join their teams.</Typography>
								<Typography variant='body2'>You can view the Offers Received by simply clicking on the Offers Received Tab once you have listed yourself on the Free Agency Market. Once you receive an Invite to Join a Team you can choose to either accept or decline the invitation.</Typography>
								<Typography variant='body2'>If you accept a TEAM invite, you can view your new team by simply clicking on the MY TEAMS Tab.</Typography>
								<Typography variant='body2'>You can view the Offers Sent by you on behalf of your team to e-sports talent across India that are listed on the Free Agency Market by simply clicking on the Offers Sent Tab.  Once they accept your invite, you can enter Team Tournaments by clicking on the Tournaments Tab.</Typography>
								<Typography variant='body2'>You can shortlist players that you find may be a potential fit for your team. Simply CLICK on the ADD TO WATCH LIST button and view them later.</Typography>
								<Typography variant='body2'>You can now view the players shortlisted by you by simply clicking on the WATCH LIST Tab. It helps you in deciding if you want to potentially send them an offer to join your team.</Typography>
								<Typography variant='body2'>Send offers to the best e-sports talent across the country with a single click of the Send Offer to Recruit button. If you’re not ready to send an offer just yet you could also shortlist the player for later by simply clicking on the Add to Watch List button. </Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>What are Noobstorm Credits? Where can I purchase them?</Typography>
								<Typography variant='body2'>Noobstorm Credits are your source of entry for daily competitions on Noobstorm. Purchase credits today and get started playing in tournaments with cash prizes up for grab immediately.</Typography>
								<Typography variant='body2'>Noobstorm Credits can be purchased from the Store.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>What is a Prize Pool?</Typography>
								<Typography variant='body2'>Prize Pool is the total amount of money that is distributed among the winners in a tournament.</Typography>
								<Typography variant='body2'>The Prize Pool is dynamic and dependent on the number of participants that enter a particular tournament.</Typography>
								<Typography variant='body2'>For example if there is a tournament bracket (64 slots) and only 16 participants join, the prize pool will be appropriated according to the 16 participants and NOT the 64 slots. Therefore, if the tournament entry fee was 1 credit (Rs. 100/-) the prize pool for 16 participants would amount to Rs. 1600/-.</Typography>
								<Typography variant='body2'>The default prize pool starts from (0) zero and keeps increasing as participants join the tournament.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>How do refunds work?</Typography>
								<Typography variant='body2'>a)	In the event, that there is an error in the Services provided by us, we may refund the Entry Fee in the form of Noobstorm Credits, provided the reasons are genuine and proved after investigation by Noobstorm.</Typography>
								<Typography variant='body2'>b)	Please read the rules of each Tournament before participating.</Typography>
								<Typography variant='body2'>c)	In case we cancel a particular tournament which you have already joined, We will refund your Noobstorm Credits back to your account within a reasonable amount of time for You to redeem the same by playing other Tournaments on Noobstorm.</Typography>
								<Typography variant='body2'>d)	In case you fail to check in before or during a tournament within the stipulated time period as mentioned in the tournament timings and rules of a particular tournament there will be NO REFUNDS. A walkover will be handed over to your opponent.</Typography>
								<Typography variant='body2'>e)	We will try Our best to create the best user experience for You. If paid by credit card, refunds will be issued to the original credit card provided at the time of purchase and in case of payments made through a payment gateway, payment refunds will be made to the same account.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>How do Player Progression cards work?</Typography>
								<Typography variant='body2'>Noobstorm Player progression cards are specific to each game. They are dynamic in nature.  In order to determine the skill level of players competing in Noobstorm Tournaments we use the Elo Rating system. The Elo rating system is a method for calculating the relative skill levels of players</Typography>
								<Typography variant='body2'>It is inferred from the wins and losses against other players. Players’ ratings depend on the ratings of their opponents and the results scored against them.</Typography>
								<Typography variant='body2'>After every game, the winning player takes points from the losing one, and the number of points is determined by the difference in the 2 player’s rating.</Typography>
								<div style={{ display: "flex", flexDirection: "column", gap: "5px", marginLeft: "20px" }}>
									<Typography variant='body2'>•	If the higher-rated player wins, a few points are taken from the lower-rated player.</Typography>
									<Typography variant='body2'>•	If the lower-rated player wins, a lot of points are taken from the higher-rated player.</Typography>
								</div>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>What is the Match Hub?</Typography>
								<Typography variant='body2'>The Match Hub is designed especially keeping in mind YOU the gamers. Any and every tournament that you enter on Noobstorm gets tracked in the Match Hub. You can view the tournaments that you are competing in as well as have easy access to check-in and reporting your results before and after the start of a match.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>When and why do I need to Check-in?</Typography>
								<Typography variant='body2'>The check-in timer is designed keeping in mind all competitors who are present before the tournament kickstarts. This helps in conducting a tournament without any delays which is what every competitor wants.</Typography>
								<Typography variant='body2'>Add your opponent on the respective console/pc/mobile device by entering their gamer tags which are located next to their usernames in order to ensure online play.</Typography>
								<Typography variant='body2'>Click on the Check-in button before the timer runs out to ensure your participation in the match otherwise a walkover will be handed over to your opponent. There shall be no refunds if you fail to check-in within the stipulated time period.</Typography>
								<Typography variant='body2'>You can connect with your opponent in the Chat Box. You can also connect with Noobstorm Support by clicking on the Support Tab in the Chat Box.</Typography>
								<Typography variant='body2'>You can report the result of a match by simply clicking on the Report Result Button. In the pop-up just select the winner of the Match and upload a picture of the result. Our Admins will take care of the rest.</Typography>
								<Typography variant='body2'>The Report Match Issue button is there to ensure you don’t face any problems. If there is an issue with your match simply click on the Report Match Issue button and select the appropriate option.</Typography>
								<Typography variant='body2'>For example if your opponent doesn’t show up or you feel they have reported the wrong result.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>Is KYC verification necessary to join tournaments on Noobstorm?</Typography>
								<Typography variant='body2'>No. You can join Tournaments even without verifying your account. When you win cash tournaments, your winnings will be deposited into your Noobstorm winnings balance. Verification becomes mandatory for making withdrawals from your Noobstorm account to your bank/wallet account.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>How do I get my Noobstorm account KYC verified?</Typography>
								<Typography variant='body2'>In order to do KYC, Open Noobstorm {'>>'} Click on Wallet {'>>'} Go to KYC Details {'>>'} Click Submit KYC {'>>'} Upload a clear photo of a valid Government ID(Aadhaar Card, Driving License, PAN Card, Voter Card, Driving License). Enter the details and wait for 24 hours. Our team will approve your KYC.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>Why do I need to do KYC for withdrawals?</Typography>
								<Typography variant='body2'>Noobstorm is an esports platform where you can win real cash legally. Your withdrawals on Noobstorm involve the transfer of money from your Noobstorm account to your bank/wallet account, and hence KYC becomes a mandatory requirement as proof of identity.</Typography>
							</div>
							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<Typography variant='subtitle1' color={"blueviolet"}>How do I withdraw money from my Noobstorm account?</Typography>
								<Typography variant='body2'>You can withdraw money only from the winnings account in your account once your account is KYC verified. This verification is a one-time process which doesn’t need to be repeated. Once your account is verified, you can withdraw tournament winnings from your Noobstorm account.</Typography>
							</div>
						</div>
					</div>}
			</React.Fragment>
		</NoobPage>
	)
}

export default Faq