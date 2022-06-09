import {
    Box, Grid, MenuItem, Select, Typography, useMediaQuery, useTheme
} from "@mui/material";
import React from "react";

const CardDesktop: React.FC = () => {
    return (
        <>
            <Grid item xs={6} lg={2} md={2}>
                <Select value={"teamsize"} fullWidth={true}>
                    <MenuItem value="teamsize">Team Size</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={6} lg={2} md={2}>
                <Select value={"status"} fullWidth={true}>
                    <MenuItem value="status">Status</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12} lg={2} md={2}>
                <Select value={"entryfee"} fullWidth={true}>
                    <MenuItem value="entryfee">Entry Fee</MenuItem>
                </Select>
            </Grid>
        </>
    );
};

const TournamentsCard: React.FC = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Box sx={{ marginX: { md: "70px", sm: "10px", xs: "10px" } }}>
            <Box
                marginBottom={2}
                sx={{ padding: { sm: "10px", xs: "10px", md: "20px" } }}
                style={{
                    backgroundImage: "url('/icons/tournaments-background.svg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <Grid container columnSpacing={2}>
                    <Grid item mt={9} mb={9} xs={12} lg={12}>
                        <Typography color={"white"} textAlign="center" variant="h1">
                            Tournaments
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Grid container columnSpacing={2}>
                {isMobile ? (
                    <CardDesktop />
                ) : (
                    <>
                        <Grid item xs={6}></Grid>
                        <CardDesktop />
                    </>
                )}
            </Grid>
            {children}
        </Box>
    );
};

export default TournamentsCard;
