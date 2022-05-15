import React from "react";
import { Box, Grid, Typography, useMediaQuery, useTheme, Button } from "@mui/material";
import { ReactComponent as UnplashIcon } from "../../../../../public/icons/Unplashicon.svg";
import { ReactComponent as UnplashIconMobile } from "../../../../../public/icons/Unplashicon_mobile.svg";
import Image from "next/image";
import styled from "@emotion/styled";

export const NoobButton = styled(Button)(() => ({
  color: "white",
  borderRadius: 0,
  textTransform: "capitalize",
  "&.delete": {
    background: "rgba(255, 0, 0, 0.2)",
  },
  "&.leave": {
    background: "rgba(196, 213, 2, 0.2)",
  },
}));

const CardDesktop: React.FC = () => {
  return (
    <Grid container columnSpacing={2}>
      <Grid item mt={18} md={4} lg={9} display={"flex"} flexDirection={"column"}>
        <Typography color={"white"} textAlign="left" component="h4" >
          {" "}
          Free Agency Market{" "}
        </Typography>
        <Typography mt={2} color={"white"} textAlign="left" variant="caption">
          <Box>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem</Box>
          <Box> Ipsum has been the industry's standard dummy </Box>
          <Box> text ever since the 1500s</Box>
        </Typography>
       
      </Grid>
      <Grid item md={4} lg={2} >
        <UnplashIcon />
      </Grid>
    </Grid>
  );
};

const CardMobile: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} display={"flex"}>
        <Box >
          <Typography color={"white"} textAlign="left" component="h4">
            {" "}
            Free Agency Market{" "}
          </Typography><br/>
          <Typography color={"white"} textAlign="left" variant="caption">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem<br/> 
           Ipsum has been the industry's standard dummy <br/>
           text ever since the 1500s
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} display={"flex"} mt={2}>
          <UnplashIconMobile /> 
      </Grid>
    </Grid>
  );
};

const FreeAgencyMarketCard: React.FC = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ marginX: { md: "70px", sm: "10px", xs: "10px" } }}>
      <Box
        marginBottom={2}
        sx={{padding:{sm:"10px",xs:"10px",md:"20px"}}}
        style={{
          backgroundImage: "url('/icons/free-agency-market-background.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {!isMobile ? <CardDesktop /> : <CardMobile />}
      </Box>

      {children}
    </Box>
  );
};

export default FreeAgencyMarketCard;
