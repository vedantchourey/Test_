import { Box, Grid } from "@mui/material";
import React from "react";
import { deviceTypes } from "../../../redux-store/layout/device-types";
import { isDeviceTypeSelector } from "../../../redux-store/layout/layout-selectors";
import { useAppSelector } from "../../../redux-store/redux-store";

const TournamentsCard: React.FC = ({ children }) => {
  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));
  return (
    <>
      <Box sx={{ marginX: { md: "50px", sm: "0px", xs: "0px" } }}>
        <Box
          marginBottom={2}
          sx={{ padding: { sm: "10px", xs: "10px", md: "20px", marginTop: 50 }, }}
          
          style={{
            // background: "red",
            backgroundImage: "url('/images/Tournaments Banner.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            height: isDesktop ? "13vw" : "25vw"
          }}
        >
          <Grid container columnSpacing={2}>
            <Grid item mt={9} xs={12} lg={12} sx={{background: "red"}}>
              {/* <Typography color={"white"} textAlign="center" variant="h1">
                <div style={{ minHeight: 50 }} />
              </Typography> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>{children}</Box>
    </>
  );
};

export default TournamentsCard;
