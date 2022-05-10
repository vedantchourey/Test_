import React from "react";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { ReactComponent as RectangleIcon } from "../../../../../public/icons/Rectangle.svg";
import { ReactComponent as GameIcon } from "../../../../../public/icons/GameIcon_1.svg";
import { ReactComponent as YouTubeIcon } from "../../../../../public/icons/YouTube_1.svg";


const TeamCard: React.FC = ({ children }) => {
    
  return (
    <Box marginX={"70px"}>
      <Box marginBottom={2} padding={4} style={{backgroundImage : "url('/images/team-background.svg')", backgroundRepeat: "no-repeat",backgroundSize: "cover"}}>
        <Grid display={"flex"}>
          <Grid item>
            <RectangleIcon />
          </Grid>
          <Grid item>
            <Typography color={"white"} marginLeft={"16px"} component="h4"> Legend Club </Typography>
            <Box display={"flex"} marginTop="30px" >
              <Box
                border={"1px solid #31274A"}
                height="48px"
                width={"48px"}
                display="flex"
                alignItems={"center"}
                justifyContent="center"
                marginLeft={"16px"}
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
                marginLeft={"16px"}
              >
                <YouTubeIcon />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {children}
    </Box>
  );
};

export default TeamCard;
