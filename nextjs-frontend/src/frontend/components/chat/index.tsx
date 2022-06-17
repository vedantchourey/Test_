import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { IChatUsers } from "../../../backend/services/database/models/i-chat-users";
import { userProfileSelector } from "../../redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../redux-store/redux-store";
import { frontendSupabase } from "../../services/supabase-frontend-service";
import ChatBox from "./ChatBox";
import ChatCard from "./ChatCard";
import ChatIcon from "@mui/icons-material/Chat";



export default function Chat(props: {smallChat: boolean}): JSX.Element {
  const user = useAppSelector(userProfileSelector);
  const [chats, _setChats] = useState<object>({});
  const [currentChat, setCurrentChat] = useState<string | null>();
  const [currentChatName, setCurrentChatName] = useState("");

  const chatRef = useRef(chats);
  const userRef = useRef(user);

  const setChats = (data: any): void => {
    _setChats(data);
    chatRef.current = data;
  };

  const fetchChannels = async (): Promise<void> => {
    const res = await frontendSupabase
      .from("chat_users")
      .select()
      .eq("user_id", user?.id);
    const data: any = {};

    if (!res.error) {
      res.data.map((i: IChatUsers) => {
        data[i.channel_id] = i;
      });
    }
    setChats(data);
  };

  const updateChat = (id: string, data: IChatUsers): void => {
    const updateChatList: any = { ...chatRef.current };
    updateChatList[id] = data;
    _setChats(updateChatList);
  };

  useEffect(() => {
    fetchChannels();
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    const chatListener = frontendSupabase
      .from("chat_users")
      .on("*", (payload) => {
        if (payload.new.user_id === userRef.current?.id) {
          updateChat(payload.new.channel_id, payload.new);
        }
      })
      .subscribe();
    return (): any => {
      chatListener.unsubscribe();
    };
  }, []);

  const chatsList: IChatUsers[] = Object.values(chats).sort(
    (a: IChatUsers, b: IChatUsers) =>
      parseInt(moment(b.updated_at).format("X")) -
      parseInt(moment(a.updated_at).format("X"))
  );

  const renderChatList = (): JSX.Element => {
    return (
      <>
        {chatsList.map((i) => (
          <ChatCard
            key={i.id}
            name={i.channel_name}
            message={i.last_message}
            onClick={(): void => {
              setCurrentChat(null);
              setTimeout((): void => {
                setCurrentChatName(i.channel_name);
                setCurrentChat(i.channel_id);
              }, 200);
            }}
          />
        ))}
      </>
    );
  };

  return (
    <Box
      bgcolor={"rgba(255,255,255,0.05)"}
      display={"flex"}
      flex={1}
      height={props.smallChat ? "20%" : "80vh"}
    >
      {props.smallChat ? (
        !currentChat ? (
          <Box
            flex={props.smallChat ? 1 : 0.25}
            style={{
              borderRightStyle: "solid",
              borderRightColor: "rgba(255,255,255,0.1)",
              borderRightWidth: 1,
            }}
          >
            <Typography variant="h5" m={1} textAlign="left">
              Friends
            </Typography>
            {renderChatList()}
          </Box>
        ) : null
      ) : (
        <Box
          flex={props.smallChat ? 1 : 0.25}
          style={{
            borderRightStyle: "solid",
            borderRightColor: "rgba(255,255,255,0.1)",
            borderRightWidth: 1,
          }}
        >
          <Typography variant="h5" m={1} textAlign="left">
            Friends
          </Typography>
          {renderChatList()}
        </Box>
      )}

      {currentChat ? (
        <ChatBox
          channelName={currentChatName}
          channelId={currentChat}
          userId={user?.id || ""}
          onBack={(): any => setCurrentChat(undefined)}
          smallChat={props.smallChat}
        />
      ) : (
        !props.smallChat && (
          <Box
            display={"flex"}
            flex={0.75}
            alignItems={"center"}
            justifyContent={"center"}
            height={'100%'}
          >
            <ChatIcon
              style={{ fontSize: 180, color: "rgba(255, 255, 255, 0.1)" }}
            />
          </Box>
        )
      )}
    </Box>
  );
}
