import {
  Box,
  Button,
  Grid,
  LinearProgress,
  
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
  isCompleted,
  isDesktop
}: any) => {
  const router = useRouter();
  const isOnGoing = moment(start_date).isBetween(
    moment().hour(0),
    moment().hour(23)
.minute(59)
  );
  return (
    <Box
      width={window.innerWidth / 2.8}
      height={window.innerWidth / 2.8 / 2.9}
      minWidth={isDesktop ? 370 : 320}
      minHeight={177}
      m={2}
      sx={{ fontSize: !isDesktop ? 10 : undefined, marginLeft: "30px" }}
    >
      <Box
        style={{
          backgroundImage: `url(${banner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          paddingBottom: "0px",
        }}
        height={"100%"}
      >
        <Box
          sx={{
            padding: { sm: "8px", xs: "8px", md: "8px", textAlign: "left" },
          }}
          bgcolor={"rgba(0,0,0,0.4)"}
          display={"flex"}
          flexDirection={"column"}
          height={"100%"}
          color={"#fff"}
        >
          <Box flex={1}>
            <Grid container columnSpacing={2}>
              <Grid item xs={4} md={4} lg={4} className={styles.heading_font_color} style={{ fontSize: !isDesktop ? 10 : undefined }}>
                TOURNAMENT TYPE
              </Grid>
              <Grid item xs={2} md={2} lg={2} className={styles.heading_font_color} style={{ fontSize: !isDesktop ? 10 : undefined }}>
                PLATFORM
              </Grid>
              <Grid item xs={6} md={6} lg={6} display={"flex"}>
                <LinearProgress
                  variant="determinate"
                  color={"secondary"}
                  value={(left_slots * 100) / parseInt(total_slots.toString())}
                  style={{ flex: 1, marginLeft: 10, marginTop: isDesktop ? 0 : 4 }}
                />
              </Grid>
            </Grid>
            <Grid container columnSpacing={2}>
              <Grid item xs={4} md={4} lg={4}>
                {tournament_type}
              </Grid>
              <Grid item xs={2} md={2} lg={2}>
                {platform}
              </Grid>
              <Grid item xs={3} md={3} lg={3} textAlign={"left"}>
                {total_slots} TOTAL SLOTS
              </Grid>
              <Grid item xs={3} md={3} lg={3} textAlign={"right"}>
                {total_slots - left_slots} SLOTS LEFT
              </Grid>
            </Grid>
            <Grid container columnSpacing={2} mt={1}>
              <Grid item xs={4} md={4} lg={4}>
                <Button
                  variant="contained"
                  sx={{
                    background: isCompleted
                      ? "rgba(249, 85, 49, 1)"
                      : isOnGoing
                      ? "rgba(249, 49, 193, 1)"
                      : moment(start_date).isBefore(moment().add(1, "day"))
                      ? "rgba(249, 85, 49, 1)"
                      : "rgba(105, 49, 249, 1)",
                    width: isDesktop ? "auto" : "110px",
                    height: isDesktop ? "auto" : "30px"
                  }}
                >
                  {isCompleted
                    ? "Completed"
                    : isOnGoing
                    ? "On Going"
                    : moment(start_date).isBefore(moment())
                    ? "Completed"
                    : "Upcoming"}
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container columnSpacing={2}>
              <Grid item xs={8} md={8} lg={8} style={{fontSize: !isDesktop ? 12 : undefined}}>
                {tournament_name}
              </Grid>
              <Grid item md={4} lg={4}></Grid>
            </Grid>
            <Grid container columnSpacing={isDesktop ? 2 : 1}>
              <Grid item xs={6} md={6} lg={6} className={styles.heading_font_color} style={{fontSize: !isDesktop ? 12 : undefined}}>
                {start_date}
              </Grid>
              <Grid
                item
                md={4}
                lg={4}
                fontSize={isDesktop ? 18 : 13}
                className={styles.credit_font}
                textAlign={"right"}
              >
                {credits === 0 ? "Free Entry" : `${credits} Credits`}
              </Grid>
              <Grid item md={2} xs={2} mb={1} lg={2} textAlign={"right"}>
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
    </Box>
  );
};

// const CardMobile: React.FC<any> = ({
//   id,
//   tournament_name,
//   tournament_type,
//   platform,
//   start_date,
//   participants,
//   banner,
// }: any): JSX.Element => {
//   const router = useRouter();
//   return (
//     <Grid container columnSpacing={2} mt={5}>
//       <Grid item xs={12}>
//         <Box>
//           <Box
//             sx={{
//               padding: { sm: "8px", xs: "8px", md: "8px", textAlign: "left" },
//             }}
//             style={{
//               backgroundImage: `url(${banner})`,
//               backgroundRepeat: "no-repeat",
//               backgroundSize: "cover",
//               color: "#FFFFFF",
//               paddingBottom: "0px",
//             }}
//           >
//             <Grid container columnSpacing={2}>
//               <Grid item xs={9}>
//                 {tournament_name}
//               </Grid>
//               <Grid item xs={9} className={styles.heading_font_color}>
//                 {start_date}
//               </Grid>
//               <Grid item xs={9} mt={1}>
//                 <img src="/icons/mobilegameicon.svg" />
//               </Grid>
//               <Grid item xs={10} mt={5} className={styles.heading_font_color}>
//                 Participants
//               </Grid>
//               <Grid item xs={12}>
//                 {participants}
//               </Grid>
//               <Grid item xs={2}></Grid>
//               <Grid item xs={9} mt={1} className={styles.heading_font_color}>
//                 TOURNAMENT TYPE
//               </Grid>
//               <Grid item xs={2}></Grid>
//               <Grid item xs={9}>
//                 {tournament_type}
//               </Grid>
//               <Grid item xs={12} mt={1} className={styles.heading_font_color}>
//                 Platform
//               </Grid>
//               <Grid item xs={6}>
//                 {platform}
//               </Grid>
//               <Grid item xs={6} textAlign={"right"}>
//                 <Button
//                   variant="contained"
//                   onClick={(): any =>
//                     router.push(`/view-tournament/${id}/details`)
//                   }
//                 >
//                   View More -{">"}
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

const CardComp = ({
  id,
  tournament_name,
  tournament_type,
  platform,
  total_slots,
  left_slots,
  start_date,
  credits,
  // participants,
  banner,
  isCompleted,
  isDesktop
}: any): JSX.Element => {
  
  const platforms = useAppSelector(getAllPlatformsSelector);
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);

  React.useEffect(() => {
    const matchingPlatform = platforms.filter((x) => x.id === platform)[0];
    setSelectedPlatform(matchingPlatform || null);
  }, [platforms]);

  return (
    <>
        <CardDesktop
          id={id}
          tournament_name={tournament_name}
          tournament_type={tournament_type}
          platform={selectedPlatform?.displayName}
          isCompleted={isCompleted}
          banner={banner}
          total_slots={total_slots}
          left_slots={left_slots}
          start_date={start_date}
          credits={credits}
          isDesktop={isDesktop}
        />
      
    </>
  );
};

export default CardComp;
