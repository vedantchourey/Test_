import {
    Box, Grid, Typography
} from "@mui/material";
import React from "react";

const TournamentsCard: React.FC = ({ children }) => {

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
                    <Grid
                        item
                        mt={9}
                        mb={9}
                        xs={12}
                        lg={12}
                    >
                        <Typography color={"white"} textAlign="center" variant="h1">
                            Tournaments
                        </Typography>

                    </Grid>
                </Grid>
            </Box>
            {children}
        </Box>
    );
};

export default TournamentsCard;
