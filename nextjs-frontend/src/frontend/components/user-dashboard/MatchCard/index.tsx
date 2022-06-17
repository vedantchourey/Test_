import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function MatchCard(): JSX.Element {
  return (
    <Box bgcolor={"rgba(255, 255, 255, 0.05)"} mt={2}>
      <Box display={"flex"} p={2}>
        <Box flex={0.5}>
          <Typography textAlign={"left"} variant="caption">
            Opponent:
          </Typography>
          <Box display={"flex"} alignItems={"center"}>
            <img
              src="/icons/Rectangle.svg"
              width={"30px"}
              height={"30px"}
              style={{ marginTop: 5 }}
            />
            <Typography textAlign={"left"} ml={1}>
              Legend Club
            </Typography>
          </Box>
        </Box>
        <Box flex={0.5}>
          <Typography textAlign={"left"} variant="caption">
            Tournament name
          </Typography>
          <Typography textAlign={"left"}>
            ENDPOINTGG VS CEX ESPORTS [2]
          </Typography>
        </Box>
      </Box>
      <Box display={"flex"} p={2}>
        <Box flex={0.5}>
          <Box display={"flex"} alignItems={"center"}>
            <Typography textAlign={"left"} variant="caption">
              Round starts in:
            </Typography>
            <Typography textAlign={"left"} ml={2}>
              00:15:45
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <Typography textAlign={"left"} variant="caption">
              Check starts in:
            </Typography>
            <Typography textAlign={"left"} ml={2}>
              00:18:45
            </Typography>
          </Box>
        </Box>
        <Box flex={0.5}>
          <Button variant="outlined" size="large">
            Match Hub
          </Button>
          <Button variant="contained" size="large" style={{ marginLeft: 10 }}>
            View Tournament
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
