import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Chat from "../../components/chat";
import { isLoggedInSelector } from "../../redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../redux-store/redux-store";
import NoobFooter from "../footer";
import NoobHeader from "../header/noob-header";
import SideHeader from "../header/sideheader";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface Props {
  title: string;
  metaData: { [key: string]: string };
  favIcon?: string;
  children: React.ReactElement;
  hideChat?: boolean;
  pinChat?: boolean;
}

export default function NoobPage(props: Props): JSX.Element {
  const {
    metaData,
    favIcon = "/noob-fav.ico",
    title,
    children,
    pinChat,
  } = props;
  const [enableChat, setEnableChat] = useState(false);
  const [toggleChat, setToggleChat] = useState(false);

  const metaKeys = Object.keys(metaData);

  const isLoggedIn = useAppSelector(isLoggedInSelector);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setTimeout(() => setEnableChat(true), 4000);
  }, []);

  return (
    <>
      {isMobile ? null : <SideHeader />}
      <div>
        <Head>
          <title>{title}</title>
          {metaKeys.map((key, index) => (
            <meta key={index} name={key} content={metaData[key]} />
          ))}
          <link rel="icon" href={favIcon} />
        </Head>
        <Box
          sx={{ display: "flex", marginTop: isMobile ? 10 : 0 }}
          maxWidth={"100vw"}
        >
          <NoobHeader />
          <Box
            style={{ minHeight: "1040px" }}
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            {children}
          </Box>
        </Box>
        <NoobFooter />
        {isLoggedIn && enableChat && !props.hideChat && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#08001C",
              padding: 10,
              position: "fixed",
              right: 0,
              bottom: 0,
              borderRadius: 5,
              zIndex: 9999,
              width: 450,
              height: toggleChat ? 500 : 50,
            }}
          >
            <Box
              display={"flex"}
              alignItems="center"
              justifyContent={"space-between"}
              pl={2}
              pr={2}
            >
              <Typography>Chat</Typography>
              <IconButton
                onClick={(): any =>
                  setToggleChat(pinChat ? !toggleChat : !toggleChat)
                }
              >
                {toggleChat ? <CloseIcon /> : <KeyboardArrowUpIcon />}
              </IconButton>
            </Box>
            {toggleChat && <Chat smallChat={true} />}
          </div>
        )}
      </div>
    </>
  );
}
