import {
  Box,
  Button,
  Grid,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getAllPlatformsSelector } from "../../redux-store/platforms/platform-selectors";
import { useAppSelector } from "../../redux-store/redux-store";
import styles from "./slider.module.css";

const CardDesktop: React.FC<any> = ({
  id,
  tournament_name,
  tournament_type,
  platform,
  total_slots,
  left_slots,
  start_date,
  credits,
  banner,
}: any) => {
  const router = useRouter();
  return (
    <Grid item lg={6} md={6} mb={2}>
      <Box>
        <Box
          style={{
            backgroundImage: `url(${banner})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            paddingBottom: "0px",
          }}
        >
          <Box
            sx={{
              padding: { sm: "8px", xs: "8px", md: "8px", textAlign: "left" },
            }}
            bgcolor={"rgba(0,0,0,0.4)"}
          >
            <Grid container columnSpacing={2}>
              <Grid item md={4} lg={4} className={styles.heading_font_color}>
                TOURNAMENT TYPE
              </Grid>
              <Grid item md={2} lg={2} className={styles.heading_font_color}>
                PLATFORM
              </Grid>
              <Grid item md={6} lg={6}>
                <LinearProgress
                  variant="determinate"
                  color={"secondary"}
                  value={(left_slots * 100) / parseInt(total_slots.toString())}
                />
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
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ color: "#FFFFFF" }}
                >
                  {moment(start_date).isBefore(moment()) ? "Completed" : "On Going"}
                </Button>
              </Grid>
            </Grid>
            <Grid container columnSpacing={2} mt={15}>
              <Grid item md={8} lg={8}>
                {tournament_name}
              </Grid>
              <Grid item md={4} lg={4}></Grid>
            </Grid>
            <Grid container columnSpacing={2}>
              <Grid item md={6} lg={6} className={styles.heading_font_color}>
                {start_date}
              </Grid>
              <Grid
                item
                md={4}
                lg={4}
                className={styles.credit_font}
                textAlign={"right"}
              >
                {credits} Credits
              </Grid>
              <Grid item md={2} mb={1} lg={2} textAlign={"right"}>
                <Button
                  variant="contained"
                  onClick={(): any =>
                    router.push(`/view-tournament/${id}/details`)
                  }
                >
                  {" "}
                  -{">"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

const CardMobile: React.FC<any> = ({
  tournament_name,
  tournament_type,
  platform,
  start_date,
  participants,
}: any): JSX.Element => {
  return (
    <Grid container columnSpacing={2} mt={5}>
      <Grid item xs={12}>
        <Box>
          <Box
            sx={{
              padding: { sm: "8px", xs: "8px", md: "8px", textAlign: "left" },
            }}
            style={{
              backgroundImage: "url('/icons/card-tournament-mobile.svg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              color: "#FFFFFF",
              paddingBottom: "0px",
            }}
          >
            <Grid container columnSpacing={2}>
              <Grid item xs={9}>
                {tournament_name}
              </Grid>
              <Grid item xs={9} className={styles.heading_font_color}>
                {start_date}
              </Grid>
              <Grid item xs={9} mt={1}>
                <img src="/icons/mobilegameicon.svg" />
              </Grid>
              <Grid item xs={10} mt={5} className={styles.heading_font_color}>
                Participants
              </Grid>
              <Grid item xs={12}>
                {participants}
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={9} mt={1} className={styles.heading_font_color}>
                TOURNAMENT TYPE
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={9}>
                {tournament_type}
              </Grid>
              <Grid item xs={12} mt={1} className={styles.heading_font_color}>
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

const CardComp = ({
  id,
  tournament_name,
  tournament_type,
  platform,
  total_slots,
  left_slots,
  start_date,
  credits,
  participants,
  banner,
}: any): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const platforms = useAppSelector(getAllPlatformsSelector);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);

  React.useEffect(() => {
    const matchingPlatform = platforms.filter((x) => x.id === platform)[0];
    setSelectedPlatform(matchingPlatform || null);
  }, [platforms]);

  return (
    <>
      {isMobile ? (
        <CardMobile
          tournament_name={tournament_name}
          tournament_type={tournament_type}
          platform={platform}
          start_date={start_date}
          participants={participants}
        />
      ) : (
        <CardDesktop
          id={id}
          tournament_name={tournament_name}
          tournament_type={tournament_type}
          platform={selectedPlatform?.displayName}
          banner={banner}
          total_slots={total_slots}
          left_slots={left_slots}
          start_date={start_date}
          credits={credits}
        />
      )}
    </>
  );
};

export default CardComp;
