import { Box } from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { IChatUsers } from "../../src/backend/services/database/models/i-chat-users";
import NoobPage from "../../src/frontend/components/page/noob-page";
import { userProfileSelector } from "../../src/frontend/redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../src/frontend/redux-store/redux-store";
import { frontendSupabase } from "../../src/frontend/services/supabase-frontend-service";
import ChatBox from "./ChatBox";
import ChatCard from "./ChatCard";

export default function Chat(): JSX.Element {
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

  return (
    <NoobPage title="Chat" metaData={{}}>
      <>
        <h1>Chat</h1>
        <Box
          bgcolor={"rgba(255,255,255,0.05)"}
          mt={2}
          display={"flex"}
          height={"60vh"}
        >
          <Box
            flex={0.4}
            style={{
              borderRightStyle: "solid",
              borderRightColor: "rgba(255,255,255,0.1)",
              borderRightWidth: 1,
            }}
          >
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
                  }, 500);
                }}
              />
            ))}
          </Box>
          {currentChat && (
            <ChatBox
              channelName={currentChatName}
              channelId={currentChat}
              userId={user?.id || ""}
            />
          )}
        </Box>
      </>
    </NoobPage>
  );
}
