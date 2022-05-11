import React from "react";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ReactComponent as RectangleIcon } from "../../../../../public/icons/Rectangle.svg";
import { ReactComponent as GameIcon } from "../../../../../public/icons/GameIcon_1.svg";
import { ReactComponent as YouTubeIcon } from "../../../../../public/icons/YouTube_1.svg";
import Image from "next/image";

const CardDesktop: React.FC = () => {
  return (
    <Grid container columnSpacing={2}>
      <Grid item md={3} lg={2}>
        <RectangleIcon />
      </Grid>
      <Grid item md={6} lg={10} display={"flex"} flexDirection={"column"}>
        <Typography color={"white"} textAlign="left" component="h4">
          {" "}
          Legend Club{" "}
        </Typography>
        <Box display={"flex"} marginTop="30px">
          <Box
            border={"1px solid #31274A"}
            height="48px"
            width={"48px"}
            display="flex"
            alignItems={"center"}
            justifyContent="center"
          >
            <GameIcon />
          </Box>
          <Box
            border={"1px solid #31274A"}
            height="48px"
            width={"48px"}
            display="flex"
            alignItems={"center"}
            justifyContent="center"
          >
            <YouTubeIcon />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

const CardMobile: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12} display={"flex"}>
        <Box  width={"65px"} height={"65px"} position="relative">
          <Image src={"/icons/Rectangle.svg"} width={"65px"} height={"65px"} />
        </Box>
        <Box marginLeft={2}>
          <Typography color={"white"} textAlign="left" component="h4">
            {" "}
            Legend Club{" "}
          </Typography>
          <Box
            style={{
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "#08001C",
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
            }}
          >
            <Typography color={"white"} variant={"body2"} padding={1}>
              Team Elo Rating:
              <Typography component={"span"} style={{ color: "#F09633", marginLeft: "30px" }}>
                {" "}
                356{" "}
              </Typography>{" "}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} display="flex" marginTop={4}>
        <Box
          border={"1px solid #31274A"}
          height="48px"
          width={"48px"}
          display="flex"
          alignItems={"center"}
          justifyContent="center"
        >
          <GameIcon />
        </Box>
        <Box
          border={"1px solid #31274A"}
          height="48px"
          width={"48px"}
          display="flex"
          alignItems={"center"}
          justifyContent="center"
        >
          <YouTubeIcon />
        </Box>
      </Grid>
    </Grid>
  );
};

const TeamCard: React.FC = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ marginX: { md: "70px", sm: "10px", xs: "10px" } }}>
      <Box
        marginBottom={2}
        sx={{padding:{sm:"10px",xs:"10px",md:"20px"}}}
        style={{
          backgroundImage: "url('/images/team-background.svg')",
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

export default TeamCard;
