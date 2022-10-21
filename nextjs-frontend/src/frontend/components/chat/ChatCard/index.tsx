import { Avatar, Box, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import GroupIcon from "@mui/icons-material/Group";
import {validate} from 'uuid'
import { deviceTypes } from "../../../../../src/frontend/redux-store/layout/device-types";
import { isDeviceTypeSelector } from "../../../../../src/frontend/redux-store/layout/layout-selectors";
import { screenWidthSelector } from "../../../../../src/frontend/redux-store/layout/layout-selectors";
import { useAppSelector } from "../../../redux-store/redux-store";

interface IChatCard {
  name: string;
  message: string;
  image: string;
  otherUser: string;
  onClick: () => void;
  type: string;
  isUnreadMessage: boolean;
  lastMessageUser: string;
  updatedAt: string;
}

export default function ChatCard(props: IChatCard): JSX.Element {
  const [lastSeenTime, setLastSeenTime] = useState<any>(null);
  const [currentMoment, setCurrentMoment] = useState(moment());
  const [chatImage, setChatImage] = useState(props.image);

  const isDesktop = useAppSelector((x) =>
    isDeviceTypeSelector(x, deviceTypes.desktop));

  const screenWidth = useAppSelector((x) =>
    screenWidthSelector(x));

  const fetchLastSeen = async (): Promise<void> => {
    if (
      props.type === "one-to-one" &&
      props.otherUser &&
      validate(props.otherUser)
    ) {
      const userDataReq = await frontendSupabase
        .from("profiles")
        .select()
        .eq("id", props.otherUser);
      if (userDataReq?.data?.[0]) {
        const chatImage = userDataReq?.data?.[0]?.avatarUrl
          ? (frontendSupabase.storage
              .from("public-files")
              .getPublicUrl(userDataReq?.data?.[0]?.avatarUrl)
              .publicURL as string)
          : props.image;
        setChatImage(chatImage as string);
      }
    }
    props.type;
    const lLastSeenReq = await frontendSupabase
      .from("user_last_seen")
      .select()
      .eq("user_id", props.otherUser);
    if (lLastSeenReq?.data?.[0]?.last_seen) {
      setLastSeenTime(lLastSeenReq?.data?.[0]?.last_seen);
    }
  };

  useEffect(() => {
    fetchLastSeen();
    const lastSeenListener = frontendSupabase
      .from("user_last_seen")
      .on("*", (payload) => {
        if (payload.new.user_id === props.otherUser)
          setLastSeenTime(payload.new.last_seen);
      })
      .subscribe();
    const momentInterval = setInterval(
      () => setCurrentMoment(moment()),
      1000 * 30
    );
    return (): any => {
      clearInterval(momentInterval);
      lastSeenListener.unsubscribe();
    };
  }, []);

  return (
    <Box
      p={1}
      display={"flex"}
      alignItems={"center"}
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
    >
      <Box>
        {props.image || props.type !== "group" ? (
          <Avatar
            src={chatImage}
            style={{
              height: !isDesktop ? 30 : 50,
              width: !isDesktop ? 30 : 50,
              background: "rgba(0,0,0,0.4)",
            }}
          />
        ) : (
          <GroupIcon
            style={{
              height: !isDesktop ? 30 : 50,
              width: !isDesktop ? 30 : 50,
              borderRadius: 25,
              background: "rgba(0,0,0,0.4)",
            }}
          />
        )}
        {lastSeenTime &&
        moment(lastSeenTime).add(1, "minute")
.isAfter(currentMoment) ? (
          <div
            style={{
              zIndex: 99,
              background: "green",
              maxHeight: 12,
              maxWidth: 12,
              minHeight: 12,
              minWidth: 12,
              borderRadius: 20,
              marginLeft: 38,
              marginTop: -12,
            }}
          />
        ) : null}
      </Box>

      <Box ml={2} textAlign={"left"} flex={1}>
        <Typography
          textAlign={"left"}
          fontSize={!isDesktop ? 13 : 18}
          color={props.isUnreadMessage ? "rgb(105, 50, 249)" : "#FFFFFF"}
          sx={{ flex: 1 }}
        >
          {props.name}
        </Typography>
        <Typography
          textAlign={"left"}
          variant="caption"
          color={"rgba(255,255,255,0.5)"}
        >
          {props.lastMessageUser}: {props.message}
        </Typography>
      </Box>
      <Box ml={2} textAlign={"left"}>
        <Typography
          textAlign={"left"}
          variant="caption"
          color={"rgba(255,255,255,0.5)"}
        >
          {moment(props.updatedAt).fromNow()}
        </Typography>
      </Box>
    </Box>
  );
}
