import React from "react";
import { Box, Grid, Typography, useMediaQuery, useTheme, Button } from "@mui/material";


const LeaderBoardCard: React.FC = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box  sx={{ marginX: { md: "70px", sm: "10px", xs: "10px" } }}>
      {children}
    </Box>
  );
};

export default LeaderBoardCard;
