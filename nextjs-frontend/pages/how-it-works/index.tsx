import * as React from "react";
import Link from "next/link";
import type { NextPage } from "next";
import NoobPage from "../../src/frontend/components/page/noob-page";
import {
    Divider,
    Typography,
} from "@mui/material";
import { isDeviceTypeSelector } from "../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from "../../src/frontend/redux-store/layout/device-types";
import { useAppSelector } from "../../src/frontend/redux-store/redux-store";
import { userProfileSelector } from "../../src/frontend/redux-store/authentication/authentication-selectors";

const NoobHowItWorksPage: NextPage = () => {
    const isDesktop = useAppSelector((x) =>
        isDeviceTypeSelector(x, deviceTypes.desktop));
        const loggedUser = useAppSelector(userProfileSelector);
    return (
        <NoobPage
            title="HowItWorks"
            metaData={{
                description: "Noob Storm How it works page",
            }}
        >
            <React.Fragment>
                {!isDesktop && (
                    <div>
                        <Divider style={{ padding: 25 }}>
                            <Typography variant="h3">HOW IT WORKS</Typography>
                        </Divider>
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px", color: "white", justifyContent: "space-around" }}>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                <Typography variant="h6" color={"GrayText"}>More Than Tournament Hosting</Typography>
                                <Typography variant="body2">Noobstorm is a community for gamers, by gamers. From cross-platform tournaments to active recruiting – we’re creating an opportunity for you to go pro.</Typography>
                                <Link href="/register">Get Started Today</Link>
                                <Typography variant="body2">Noobstorm was born out of devotion. Gaming gave us our best childhood memories – and we want to share that passion with you.</Typography>
                                <Typography variant="body2">We designed Noobstorm to be the world’s #1 e-sports platform. More than just tournament hosting, we want to give you opportunities to grow, interact, and succeed.</Typography>
                                <Typography variant="body2">And, of course, have some fun while you’re going pro.</Typography>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px" }}>
                                <Typography variant="h6" color={"GrayText"}>Giving Back</Typography>
                                <Typography variant="body2">Gaming gave us passion and purpose. We want to give you the ability to achieve your dreams of going pro.</Typography>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "50%" }}>
                                        <Typography variant="body1" color={"blueviolet"}>Players</Typography>
                                        <Typography variant="body2">You’re the heart of Noobstorm. This is why we’re giving the gaming community everything they need to succeed.</Typography>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "50%" }}>
                                        <Typography variant="body1" color={"blueviolet"}>Games & Brands</Typography>
                                        <Typography variant="body2">You’re the heart of Noobstorm. This is why we’re giving the gaming community everything they need to succeeWe make it easy for gaming companies to take part in the experience. Find skilled players who have mastered your game.</Typography>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="body1" color={"blueviolet"}>Grow Together</Typography>
                                    <Typography variant="body2">Noobstorm is about all of growing together as a community. Watch your Play Cards progress, show your talent to the world, and make your dreams come true.</Typography>
                                    <Typography variant="body2">We’ll be here for you – every step of the way.</Typography>
                                </div>
                                <Link href= {loggedUser ? "/free-agency-market/view/watchlist" : ""}>Go Pro</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Free Agency Market</Typography>
                                    <Typography variant="body2">An easy way to show off your gaming skills to recruiters – or find the perfect player for your team.</Typography>
                                </div>
                                <Link href={loggedUser ? "/free-agency-market/view/watchlist" : ""}>Scout ‘em out</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Pro Gamer Recruiting</Typography>
                                    <Typography variant="body2">Our market makes it simpler than ever to show your skills off to the world. Create your profile and list your achievements.</Typography>
                                    <Typography variant="body2">From football to hockey – every professional sport needs a seamless recruiting system to find the best players. And e-sports are no different.</Typography>
                                </div>
                                <Link href={loggedUser ? "/free-agency-market/view/watchlist" : ""}>List Yourself Today</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>List. Play. Earn</Typography>
                                    <Typography variant="body2">Pro players don’t end up on world-renowned teams by accident. Noobstorm’s Free Agency Market is simple – </Typography>
                                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", gap: "10px" }}>
                                        <Typography variant="body2">●	List yourself on the marketplace </Typography>
                                        <Typography variant="body2">●	Keep playing and watch your Elo rating rise</Typography>
                                        <Typography variant="body2">●	Earn money winning tournaments </Typography>
                                    </div>
                                </div>
                                <Link href="/faq">Learn More About Player Cards Progression</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Need a Player?</Typography>
                                    <Typography variant="body2">It’s never been easier to add a professional gamer onto your team. Scroll through profiles, reach out to your favorites – and them to your roster.</Typography>
                                    <Typography variant="body2">Whether you’re looking for upcoming talent or the best of the best – you’ll find them on the Free Agency Market.</Typography>
                                </div>
                                <Link href={loggedUser ? "/free-agency-market/view/watchlist" : ""}>Find Talent</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>There’s No Cheat Code to Success</Typography>
                                    <Typography variant="body2">Put yourself out there, sharpen those reflexes, and move up in the world </Typography>
                                </div>
                                <Link href={loggedUser ? "/free-agency-market/view/watchlist" : ""}>List Yourself Among The Pros</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Player Cards Progression</Typography>
                                    <Typography variant="body2">A growth-based community – Noobstorm’s cards show your progress, rating, and standing</Typography>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Stand out among the pros </Typography>
                                    <Typography variant="body2">You’ll be assigned a card that shows your progress and skills. Keep track of your performance and show the world you’re a pro.</Typography>
                                </div>
                                <Link href="/register">Sign up today</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Dynamic Elo Rating </Typography>
                                    <Typography variant="body2">Players ratings will be updated using the official Elo range from 750 - 2000+.</Typography>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "start" }}>
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", marginLeft: "40px", gap: "5px" }}>
                                            <Typography variant="body2">Beginner (Bronze)</Typography>
                                            <Typography variant="body2">Intermediate (Silver)</Typography>
                                            <Typography variant="body2">Semi-Pro (Gold)</Typography>
                                            <Typography variant="body2">Professional (Ruby)</Typography>
                                            <Typography variant="body2">Master (Diamond)</Typography>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", marginLeft: "20px", gap: "5px" }}>
                                            <Typography variant="body2">750-999</Typography>
                                            <Typography variant="body2">1000-1249</Typography>
                                            <Typography variant="body2">1250-1499 </Typography>
                                            <Typography variant="body2">1500-1999</Typography>
                                            <Typography variant="body2">2000-infinity</Typography>
                                        </div>
                                    </div>
                                </div>
                                <Link href={loggedUser ? "/free-agency-market/view/watchlist" : ""}>Forge Your Card</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Opportunity for Growth</Typography>
                                    <Typography variant="body2">Our Elo Ranking system gives every player the chance to evolve, hone their skills, and pursue their dreams in gaming. </Typography>
                                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", gap: "10px" }}>
                                        <Typography variant="body2">●	Show off your skills</Typography>
                                        <Typography variant="body2">●	Connect with Players</Typography>
                                        <Typography variant="body2">●	Go pro </Typography>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Find your tribe</Typography>
                                    <Typography variant="body2">Join the world’s fastest-growing community of pro gamers.</Typography>
                                    <Typography variant="body2">Get your player card, climb the ranks, and start raking in that tournament cash.</Typography>
                                </div>
                                <Link href={loggedUser ? "/free-agency-market/view/watchlist" : ""}>I want to go pro</Link>
                            </div>
                        </div>
                    </div>
                )}

                {isDesktop && (
                    <div>
                        <Divider style={{ padding: 35 }}>
                            <Typography variant="h3">HOW IT WORKS</Typography>
                        </Divider>
                        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginLeft: "40px" }}>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                <Typography variant="h6" color={"GrayText"}>More Than Tournament Hosting</Typography>
                                <Typography variant="body2">Noobstorm is a community for gamers, by gamers. From cross-platform tournaments to active recruiting – we’re creating an opportunity for you to go pro.</Typography>
                                <Link href="/register">Get Started Today</Link>
                                <Typography variant="body2">Noobstorm was born out of devotion. Gaming gave us our best childhood memories – and we want to share that passion with you.</Typography>
                                <Typography variant="body2">We designed Noobstorm to be the world’s #1 e-sports platform. More than just tournament hosting, we want to give you opportunities to grow, interact, and succeed.</Typography>
                                <Typography variant="body2">And, of course, have some fun while you’re going pro.</Typography>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                <Typography variant="h6" color={"GrayText"}>Giving Back</Typography>
                                <Typography variant="body2">Gaming gave us passion and purpose. We want to give you the ability to achieve your dreams of going pro.</Typography>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px", width: "40%" }}>
                                        <Typography variant="body1" color={"blueviolet"}>Players</Typography>
                                        <Typography variant="body2">You’re the heart of Noobstorm. This is why we’re giving the gaming community everything they need to succeed.</Typography>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px", width: "40%" }}>
                                        <Typography variant="body1" color={"blueviolet"}>Games & Brands</Typography>
                                        <Typography variant="body2">You’re the heart of Noobstorm. This is why we’re giving the gaming community everything they need to succeeWe make it easy for gaming companies to take part in the experience. Find skilled players who have mastered your game.</Typography>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="body1" color={"blueviolet"}>Grow Together</Typography>
                                    <Typography variant="body2">Noobstorm is about all of growing together as a community. Watch your Play Cards progress, show your talent to the world, and make your dreams come true.</Typography>
                                    <Typography variant="body2">We’ll be here for you – every step of the way.</Typography>
                                </div>
                                <Link href= {loggedUser ? "/free-agency-market/view/watchlist" : ""}>Go Pro</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Free Agency Market</Typography>
                                    <Typography variant="body2">An easy way to show off your gaming skills to recruiters – or find the perfect player for your team.</Typography>
                                </div>
                                <Link href={loggedUser ? "/free-agency-market/view/watchlist" : ""}>Scout ‘em out</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Pro Gamer Recruiting</Typography>
                                    <Typography variant="body2">Our market makes it simpler than ever to show your skills off to the world. Create your profile and list your achievements.</Typography>
                                    <Typography variant="body2">From football to hockey – every professional sport needs a seamless recruiting system to find the best players. And e-sports are no different.</Typography>
                                </div>
                                <Link href={loggedUser ? "/free-agency-market/view/watchlist" : ""}>List Yourself Today</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>List. Play. Earn</Typography>
                                    <Typography variant="body2">Pro players don’t end up on world-renowned teams by accident. Noobstorm’s Free Agency Market is simple – </Typography>
                                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", gap: "10px" }}>
                                        <Typography variant="body2">●	List yourself on the marketplace </Typography>
                                        <Typography variant="body2">●	Keep playing and watch your Elo rating rise</Typography>
                                        <Typography variant="body2">●	Earn money winning tournaments </Typography>
                                    </div>
                                </div>
                                <Link href="/faq">Learn More About Player Cards Progression</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Need a Player?</Typography>
                                    <Typography variant="body2">It’s never been easier to add a professional gamer onto your team. Scroll through profiles, reach out to your favorites – and them to your roster.</Typography>
                                    <Typography variant="body2">Whether you’re looking for upcoming talent or the best of the best – you’ll find them on the Free Agency Market.</Typography>
                                </div>
                                <Link href={loggedUser ? "/free-agency-market/view/watchlist" : ""}>Find Talent</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>There’s No Cheat Code to Success</Typography>
                                    <Typography variant="body2">Put yourself out there, sharpen those reflexes, and move up in the world </Typography>
                                </div>
                                <Link href={loggedUser ? "/free-agency-market/view/watchlist" : ""}>List Yourself Among The Pros</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Player Cards Progression</Typography>
                                    <Typography variant="body2">A growth-based community – Noobstorm’s cards show your progress, rating, and standing</Typography>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Stand out among the pros </Typography>
                                    <Typography variant="body2">You’ll be assigned a card that shows your progress and skills. Keep track of your performance and show the world you’re a pro.</Typography>
                                </div>
                                <Link href="/register">Sign up today</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Dynamic Elo Rating </Typography>
                                    <Typography variant="body2">Players ratings will be updated using the official Elo range from 750 - 2000+.</Typography>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "start" }}>
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", marginLeft: "40px", gap: "5px" }}>
                                            <Typography variant="body2">Beginner (Bronze)</Typography>
                                            <Typography variant="body2">Intermediate (Silver)</Typography>
                                            <Typography variant="body2">Semi-Pro (Gold)</Typography>
                                            <Typography variant="body2">Professional (Ruby)</Typography>
                                            <Typography variant="body2">Master (Diamond)</Typography>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", marginLeft: "20px", gap: "5px" }}>
                                            <Typography variant="body2">750-999</Typography>
                                            <Typography variant="body2">1000-1249</Typography>
                                            <Typography variant="body2">1250-1499 </Typography>
                                            <Typography variant="body2">1500-1999</Typography>
                                            <Typography variant="body2">2000-infinity</Typography>
                                        </div>
                                    </div>
                                </div>
                                <Link href={loggedUser ? "/free-agency-market/view/watchlist" : ""}>Forge Your Card</Link>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Opportunity for Growth</Typography>
                                    <Typography variant="body2">Our Elo Ranking system gives every player the chance to evolve, hone their skills, and pursue their dreams in gaming. </Typography>
                                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px", gap: "10px" }}>
                                        <Typography variant="body2">●	Show off your skills</Typography>
                                        <Typography variant="body2">●	Connect with Players</Typography>
                                        <Typography variant="body2">●	Go pro </Typography>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "10px" }}>
                                    <Typography variant="h6" color={"GrayText"}>Find your tribe</Typography>
                                    <Typography variant="body2">Join the world’s fastest-growing community of pro gamers.</Typography>
                                    <Typography variant="body2">Get your player card, climb the ranks, and start raking in that tournament cash.</Typography>
                                </div>
                                <Link href={loggedUser ? "/free-agency-market/view/watchlist" : ""}>I want to go pro</Link>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        </NoobPage>
    );
};

export default NoobHowItWorksPage;
