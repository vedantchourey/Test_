import { Box, Typography } from "@mui/material";
import React from "react";

interface IChatCard {
    name: string,
    message: string,
    image: string;
    onClick: () => void,
}

export default function ChatCard(props: IChatCard): JSX.Element {
  return (
    <Box
      p={1}
      display={"flex"}
      alignItems={"center"}
      style={{ cursor: "pointer" }}
      // style={{
      //   borderBottomColor: "rgba(255,255,255,0.1)",
      //   borderBottomWidth: 1,
      //   borderBottomStyle: "solid",
      // }}
      onClick={props.onClick}
    >
      <img
        src={props.image}
        style={{
          height: 50,
          width: 50,
          borderRadius: 10,
          background: "rgba(0,0,0,0.4)",
        }}
      />
      <Box ml={2} textAlign={"left"}>
        <Typography textAlign={"left"} fontSize={18}>
          {props.name}
        </Typography>
        <Typography
          textAlign={"left"}
          variant="caption"
          color={"rgba(255,255,255,0.5)"}
        >
          {props.message}
        </Typography>
      </Box>
    </Box>
  );
}
