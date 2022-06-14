import { Box } from "@mui/material";
import React from "react";


const TeamListCard: React.FC = ({ children }) => {
  return (
    <Box sx={{ marginX: { md: "70px", sm: "10px", xs: "10px" } }}>
      {children}
    </Box>
  );
};

export default TeamListCard;
