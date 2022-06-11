import { Box, Button, Grid, Slider, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import styles from "./slider.module.css";

//interface Tournament {
//   tournament_type: string;
//   tournament_name: string;
//    platform: string;
//    totalslot: string;
//    leftslot: string;
//    gamename: string;
//    date: Date;
//    credits: string;
//}
    
const CardDesktop: React.FC = ({ tournament_name, tournament_type, platform, total_slots, left_slots, start_date, credits }) => {
    return (
            <Grid item lg={6} md={6} mb={2}>
                <Box>
                    <Box
                        sx={{ padding: { sm: "8px", xs: "8px", md: "8px", textAlign: "left" } }}
                        style={{
                            backgroundImage: "url('/icons/card-tournament-desktop.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            fontSize: "15px",
                            paddingBottom: "0px"
                        }}
                    >
                        <Grid container columnSpacing={2}>
                            <Grid item md={4} lg={4} className={styles.heading_font_color}>
                                TOURNAMENT TYPE
                            </Grid>
                            <Grid item md={2} lg={2} color="#B5B5B5">
                                PLATFORM
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <Slider aria-label="Temperature" defaultValue={38} max={50} color="secondary" />
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={2}>
                            <Grid item md={4} lg={4}>
                                {tournament_type}
                            </Grid>
                            <Grid item md={2} lg={2}>
                                {platform}
                            </Grid>
                            <Grid item md={3} lg={3} textAlign={"left"}>
                                {total_slots} TOTAL SLOTS
                            </Grid>
                            <Grid item md={3} lg={3} textAlign={"right"}>
                                {left_slots} LEFT SLOTS
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={2} mt={1}>
                            <Grid item md={4} lg={4}>
                                <Button variant="contained" color="secondary" sx={{ color: "#FFFFFF" }}>Completed</Button>
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={2} mt={15}>
                            <Grid item md={8} lg={8}>
                                {tournament_name}
                            </Grid>
                            <Grid item md={4} lg={4}>
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={2}>
                            <Grid item md={6} lg={6} color="#B5B5B5">
                                {start_date}
                            </Grid>
                            <Grid item md={4} lg={4} textAlign={"right"} color="##EF507E">
                                {credits} Credits
                            </Grid>
                            <Grid item md={2} lg={2} textAlign={"right"}>
                                <Button variant="contained"> -{">"}</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
    )
}

const CardMobile: React.FC = ({ tournament_name, tournament_type, platform, start_date, participants }) => {
    return (
        <Grid container columnSpacing={2} mt={5}>
            <Grid item xs={12}>
                <Box>
                    <Box
                        sx={{ padding: { sm: "8px", xs: "8px", md: "8px", textAlign: "left" } }}
                        style={{
                            backgroundImage: "url('/icons/card-tournament-mobile.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            color: "#FFFFFF",
                            fontSize: "15px",
                            paddingBottom: "0px"
                        }}
                    >

                        <Grid container columnSpacing={2}>
                            <Grid item xs={9}>
                                {tournament_name}
                            </Grid>
                            <Grid item xs={9}>
                               {start_date}
                            </Grid>
                            <Grid item xs={9} mt={1}>
                                <img src="/icons/mobilegameicon.svg" />
                            </Grid>
                            <Grid item xs={10} mt={5}>
                                Participants
                            </Grid>
                            <Grid item xs={12}>
                                {participants}
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={9} mt={1}>
                                TOURNAMENT TYPE
                            </Grid>
                            <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={9}>
                                {tournament_type}
                            </Grid>
                            <Grid item xs={12} mt={1}>
                                Platform
                            </Grid>
                            <Grid item xs={6}>
                                {platform}
                            </Grid>
                            <Grid item xs={6} textAlign={"right"}>
                                <Button variant="contained">View More -{">"}</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

const CardComp = ({ tournament_name, tournament_type, platform, total_slots, left_slots, start_date, credits, participants }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    
    return (
        <>
            {isMobile ?
                (
                    < CardMobile tournament_name={tournament_name} tournament_type={tournament_type} platform={platform} start_date={start_date} participants={participants}/>
                ) : (
                    <CardDesktop tournament_name={tournament_name} tournament_type={tournament_type} platform={platform} total_slots={total_slots} left_slots={left_slots} start_date={start_date} credits={credits}/>
                )
            }
        </>
    );
};

export default CardComp;