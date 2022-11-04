import React from "react";
import Chat from "../../src/frontend/components/chat";
import NoobPage from "../../src/frontend/components/page/noob-page";
import { useMediaQuery, useTheme } from "@mui/material";

export default function ChatPage(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <NoobPage title="Chat" metaData={{}} hideChat={true}>
      <div style={isMobile ? { width: "85%", marginLeft: 20 } : {}}>
        <h1 style={{margin:"20px",color:"#FFFFFF", textAlign: "center"}}>Chat</h1>
        <Chat smallChat={Boolean(isMobile)} />
      </div>
    </NoobPage>
  );
}
