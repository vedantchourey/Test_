import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Button
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
  hideHeaders?: boolean;
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
  const [chatCount, setChatCount] = useState(0);

  const metaKeys = Object.keys(metaData);

  const isLoggedIn = useAppSelector(isLoggedInSelector);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setTimeout(() => setEnableChat(true), 4000);
  }, []);

  return (
    <>
      {isMobile ? null : !props.hideHeaders && enableChat && <SideHeader />}
      <div>
        {!props.hideHeaders && (
          <Head>
            <title>{title}</title>
            {metaKeys.map((key, index) => (
              <meta key={index} name={key} content={metaData[key]} />
            ))}
            <link rel="icon" href={favIcon} />
          </Head>
        )}

        <Box
          sx={{ display: "flex", marginTop: isMobile ? 10 : 0 }}
          maxWidth={"100vw"}
        >
          {!props.hideHeaders && <NoobHeader />}
          <Box
            style={{ minHeight: "1040px" }}
            component="main"
            sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
          >
            {children}
          </Box>
        </Box>
        {!props.hideHeaders && <NoobFooter />}
        {isLoggedIn && enableChat && !props.hideChat && !props.hideHeaders && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "fixed",
              right: 0,
              bottom: 0,
              borderRadius: 10,
              zIndex: 100,
              width: 450,
              height: toggleChat ? 500 : 50,
              background: "#100626",
            }}
          >
            <Button
              onClick={(): any =>
                setToggleChat(pinChat ? !toggleChat : !toggleChat)
              }
              style={{
                justifyContent: "space-between",
                backgroundColor: "#6931F9",
              }}
            >
              <Box display={"flex"} flexDirection="row">
                <Typography style={{ color: "#FFFFFF" }}>Chat</Typography>
                <Box display={"flex"} flexDirection={"column"}>
                  <Box
                    style={{
                      background: "#ca0f0f",
                      height: 25,
                      width: 25,
                      borderRadius: 25,
                      color: "#fff",
                      marginLeft: 5
                    }}
                  >
                    {chatCount}
                  </Box>
                </Box>
              </Box>

              <IconButton>
                {toggleChat ? <CloseIcon /> : <KeyboardArrowUpIcon />}
              </IconButton>
            </Button>
            <div style={{ display: toggleChat ? "block" : "none" }}>
              <Chat
                smallChat={true}
                setChatCount={(count): any => setChatCount(count)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
