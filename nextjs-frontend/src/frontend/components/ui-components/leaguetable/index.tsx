import { Box, useTheme } from "@mui/material";
import React from "react";


const LeaderBoardCard: React.FC = ({ children }) => {
  const theme = useTheme();
  
  return (
    <Box  sx={{ marginX: { md: "70px", sm: "10px", xs: "10px" } }}>
      {children}
    </Box>
  );
};

export default LeaderBoardCard;
