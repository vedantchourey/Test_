import { Box, Divider, Typography } from "@mui/material";
import React from "react";

interface IChatCard {
    name: string,
    message: string,
    onClick: () => void,
}

export default function ChatCard(props: IChatCard): JSX.Element {
  return (
    <Box
      p={1}
      display={"flex"}
      alignItems={"center"}
      style={{
        borderBottomColor: "rgba(255,255,255,0.1)",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
      }}
      onClick={props.onClick}
    >
      <img
        src="/images/teams/player.png"
        style={{ height: 50, width: 50, borderRadius: "100%" }}
      />
      <Box ml={2} textAlign={"left"}>
        <Typography textAlign={"left"}>{props.name}</Typography>
        <Typography textAlign={"left"} variant="caption" color={"rgba(255,255,255,0.5)"}>{props.message}</Typography>
      </Box>
      <Divider />
    </Box>
  );
}
