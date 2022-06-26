import { Box, Button, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { IChatUsers } from "../../../backend/services/database/models/i-chat-users";
import { userProfileSelector } from "../../redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../redux-store/redux-store";
import { frontendSupabase } from "../../services/supabase-frontend-service";
import ChatBox from "./ChatBox";
import ChatCard from "./ChatCard";
import ChatIcon from "@mui/icons-material/Chat";
import { getAuthHeader } from "../../utils/headers";
import axios from "axios";

export default function Chat(props: { smallChat: boolean }): JSX.Element {
  const user = useAppSelector(userProfileSelector);
  const [chats, _setChats] = useState<object>({});
  const [currentChat, setCurrentChat] = useState<string | null>();
  const [currentChatName, setCurrentChatName] = useState("");
  const [supportChatChannel, setSupportChatChannel] = useState<boolean>(false);
  const [teamData, setTeamData] = useState<any[]>([])
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(chats);
  const userRef = useRef(user);

  const setChats = (data: any): void => {
    _setChats(data);
    chatRef.current = data;
  };

  const fetchSupportChannel = async (): Promise<any> => {
    const res = await frontendSupabase
      .from("chat_users")
      .select()
      .eq("user_id", user?.id)
      .eq("other_user", "support");
    if (res.data?.length) setSupportChatChannel(true);
  };

  const fetchChannels = async (): Promise<void> => {
    const res = await frontendSupabase
      .from("chat_users")
      .select()
      .eq("user_id", user?.userRoles[0] === "noob-admin" ? "support" : user?.id);
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

  const teamList = async (): Promise<void> => {
    try {
      const endpoint = "api/teams";
      const headers = await getAuthHeader();
      axios.get(endpoint, { headers: headers }).then((res) => {
        setTeamData(res.data.result);
      });
    } catch (err) {
      alert(err);
    }
  };


  useEffect(() => {
    fetchSupportChannel();
    fetchChannels();
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    teamList();
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
    (a: IChatUsers, b: IChatUsers) => {
      return (
        parseInt(moment(b.updated_at).format("X")) -
        parseInt(moment(a.updated_at).format("X"))
      );
    }
  );

  const createSupportChat = async (): Promise<any> => {
    setLoading(true)
    await frontendSupabase.from("chat_users").insert({
      channel_id: `${user?.id}_support`,
      user_id: user?.id || "",
      other_user: "support",
      channel_name: "support",
      user_name: user?.username,
    });
    await frontendSupabase.from("chat_users").insert({
      channel_id: `${user?.id}_support`,
      user_id: "support",
      other_user: user?.id || "",
      channel_name: user?.username,
      user_name: "support",
    });
    await frontendSupabase.from("messages").insert({
      channel_id: `${user?.id}_support`,
      send_by: user?.id,
      message: "Hey, I need Help!",
      metadata: null,
    });
    await frontendSupabase
      .from("chat_users")
      .update({
        last_message: "Hey, I need Help!",
        updatedAt: new Date().toISOString,
      })
      .eq("channel_id", `${user?.id}_support`);
    fetchSupportChannel();
    fetchChannels();
    setLoading(false);
  };

  const renderChatList = (): JSX.Element => {
    return (
      <>
        {chatsList.map((i) => {
          const findTeam = teamData.find(t => t.id === i.other_user);
          const teamLogo = findTeam?.teamLogo
                  ? frontendSupabase.storage.from("public-files").getPublicUrl(findTeam.teamLogo)
                      .publicURL as string
                  : "/images/16276393842661.png";
          console.log('findTeam -> ', findTeam)
          return (
            <ChatCard
              key={i.id}
              image={teamLogo}
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
          );
        })}
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
            overflow: "scroll",
          }}
        >
          {!supportChatChannel && user?.userRoles[0] !== "noob-admin" ? (
            <Box mt={2}>
              <Button disabled={loading} onClick={(): any => createSupportChat()}>
                Create Support Chat
              </Button>
            </Box>
          ) : null}
          <Typography variant="h5" m={1} textAlign="left">
          {user?.userRoles[0] === "noob-admin" ? "Support request" : "Friends"}
            
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
          user={user}
          smallChat={props.smallChat}
        />
      ) : (
        !props.smallChat && (
          <Box
            display={"flex"}
            flex={0.75}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
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
