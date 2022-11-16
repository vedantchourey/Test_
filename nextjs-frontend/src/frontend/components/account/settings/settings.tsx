import React, { useState } from "react";
import {
  Box,
  Container,
  Divider,
  Grid,
  // SxProps,
  // Tab,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import styles from './style.module.css'
import {
  TabContext,
  // TabList,
  TabPanel,
} from "@mui/lab";
import PersonalSettings from './personal-settings';
import Security from './security';
type TabsProps = "personal" | "payment" | "preferences" | "security";

// const tabStyles: SxProps = {
//   textTransform: "capitalize",
//   minHeight: 42,
//   background: "rgba(255,255,255,0.1)",
//   border: '1px solid #31274A',
//   padding: '16px 52px',
//   fontWeight: 600,
//   mb: 5
// };


const ProfileSettings = (): JSX.Element => {
  const [
    activeTab, 
    // setActiveTab
  ] = useState<TabsProps>("personal");
  // const handleChange = (e: unknown, newValue: TabsProps): void => {
  //   setActiveTab(newValue);
  // };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <Box>
      <Grid container className={styles.heading} >
        <Grid item md={4}>
          <Divider />
        </Grid>
        <Grid item md={3} sx={{ textAlign: 'center', mt: isMobile ? "40px" : null }}>
          <Typography variant="h1" fontSize={26}>
            Profile Settings
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Divider />

        </Grid>
      </Grid>
      <Container maxWidth='md'>
        <Box className={isMobile ? styles.formContainerForMobile :styles.formContainer}>
          <TabContext value={activeTab}>
            {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TabList
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    display: "none",
                  },
                }}
                sx={{
                  "& .Mui-selected": {
                    background: (theme) => theme.palette.primary.main,
                    color: "white !important",
                  },
                }}
              >
                <Tab label="Personal" value="personal" sx={tabStyles} />
                <Tab label="Payments" value="payments" sx={tabStyles} />
                <Tab label="Preferences" value="preferences" sx={tabStyles} />
                <Tab label="Security" value="security" sx={tabStyles} />
              </TabList>
            </Box> */}
            <TabPanel sx={{ p: 0 }} value="personal">
              <PersonalSettings />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value="payments"></TabPanel>
            <TabPanel sx={{ p: 0 }} value="preferences"></TabPanel>
            <TabPanel sx={{ p: 0 }} value="security">
              <Security />
            </TabPanel>
          </TabContext>
        </Box>
      </Container >
    </Box >
  );
};
export default ProfileSettings;