import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

interface Props {
    tournament?: string;
    platform?: string;
    totalslot?: string;
    leftslot?: string;
    autoCompleteClassName?: string;
    gamename?: string;
    date?: Date;
    credits?: string;
}

const CardDesktop: React.FC = () => {
    return (
        <Grid container columnSpacing={2}>
            <Grid item xs={6}>
                <Box>
                    <Box
                        marginBottom={2}
                        sx={{ padding: { sm: "10px", xs: "10px", md: "20px", textAlign:"left" } }}
                        style={{
                            backgroundImage: "url('/icons/card-tournament-desktop.svg')",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                        }}
                    >
                        <Grid container columnSpacing={2}>
                            <Grid item md={4} lg={4}>
                                TOURNAMENT TYPE
                            </Grid>
                            <Grid item md={2} lg={2}>
                                PLATFORM
                            </Grid>
                            <Grid item md={6} lg={6}>
                                PLATFORM
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={2} mt={25}>
                            <Grid item md={8} lg={8}>
                                ENDPOINTGG VS CEX ESPORTS [2]
                            </Grid>
                            <Grid item md={4} lg={4}>
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={2}>
                            <Grid item md={8} lg={8}>
                               10 OCT 2018 14:35 PM
                            </Grid>
                            <Grid item md={4} lg={4}>
                                256 Credits
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default function CardComp(props: Props): JSX.Element {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const {
        tournament,
        platform,
        totalslot,
        leftslot,
        autoCompleteClassName,
        gamename,
        date,
        credits,
    } = props;

    return (
        <>
            {isMobile ? (
                <CardDesktop />
            ) : (
                < CardDesktop />
            )
            }
        </>
    );
};