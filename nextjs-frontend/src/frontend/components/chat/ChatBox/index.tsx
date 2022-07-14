import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { IMessages } from "../../../../backend/services/database/models/i-messages";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { IChatUsers } from "../../../../backend/services/database/models/i-chat-users";
import NoobFilePicker from "../../utils/noob-file-picker";
import { uploadImage } from "../../../service-clients/image-service-client";
import { v4 } from "uuid";
import { allowedImageExtensions } from "../../../../models/constants";

interface IChatBox {
  channelId: string;
  channelName: string;
  userId: string;
  smallChat: boolean;
  user?: any;
  data?: IChatUsers;
  onBack: () => void;
}

export default function ChatBox(props: IChatBox): JSX.Element {
  const [messages, _setMessages] = useState<IMessages[]>([]);
  const [chatUsers, setchatUsers] = useState<any[]>([]);
  const [text, setText] = useState<string>("");
  const [infoSection, setInfoSection] = useState(false);
  const [logoPicker, setLogoPicker] = React.useState(false)

  const messageRef = useRef<IMessages[]>(messages);

  const setMessages = (data: any): void => {
    _setMessages(data);
    messageRef.current = data;
  };

  const sendMessage = async (): Promise<void> => {
    if (text.length) {
      await frontendSupabase.from("messages").insert({
        channel_id: props.channelId,
        send_by: props.user.id,
        message: text.trim(),
        metadata: null,
      });
      await frontendSupabase
        .from("chat_users")
        .update({ last_message: text, updatedAt: new Date().toISOString })
        .eq("channel_id", props.channelId);
      setText("");
    }
  };

  const removeUserFromGroup = async (userId: string): Promise<void> => {
    const chatUsersRes = await frontendSupabase
      .from("chat_users")
      .delete()
      .eq("channel_id", props.channelId)
      .eq("user_id", userId);
    setchatUsers(chatUsersRes.data || []);
    await fetchUsers();
  };

  const fetchUsers = async (): Promise<void> => {
    const chatUsersRes = await frontendSupabase
      .from("chat_users")
      .select("*")
      .eq("channel_id", props.channelId);
    setchatUsers(chatUsersRes.data || []);
  }

  const fetchMessages = async (): Promise<void> => {
    const messages = await frontendSupabase
      .from("messages")
      .select("*")
      .eq("channel_id", props.channelId);
    setMessages(messages.data as IMessages[]);
  };

  useEffect(() => {
    fetchUsers();
    fetchMessages();
    const messageListener = frontendSupabase
      .from("messages")
      .on("INSERT", (payload) => {
        if (payload.new.channel_id === props.channelId) {
          const updateMessages = [...messageRef.current, payload.new];
          setMessages(updateMessages);
        }
      })
      .subscribe();
    return () => {
      messageListener.unsubscribe();
    };
  }, []);

  return (
    <Box display={"flex"} flex={props.smallChat ? 1 : 0.75}>
      <Box
        display={props.smallChat && infoSection ? "none" : "flex"}
        flexDirection={"column"}
        justifyContent={"flex-end"}
        flex={infoSection ? 0.7 : 1}
      >
        <Box
          p={2}
          style={{
            borderBottomColor: "rgba(255,255,255,0.1)",
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
          }}
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display={"flex"}>
            <IconButton aria-label="back" size="small" onClick={props.onBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography
              textAlign={"left"}
              ml={1}
              lineHeight={"35px"}
              color="#FFFFFF"
            >
              {props.channelName}
            </Typography>
            {props.data?.channel_type === "group" && (
              <IconButton
                aria-label="back"
                size="small"
                onClick={(): any => setInfoSection(!infoSection)}
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                <InfoOutlinedIcon />
              </IconButton>
            )}
          </Box>

          <Typography
            textAlign={"left"}
            variant="caption"
            color={"rgba(255,255,255,0.5)"}
          >
            {moment().format("dddd, MMMM DD YYYY")}
          </Typography>
          {/* <Typography textAlign={"left"}> </Typography> */}
        </Box>
        <Box
          p={1}
          display={"flex"}
          flex={1}
          flexDirection={"column-reverse"}
          overflow="scroll"
          className={"hide-scrollbar"}
        >
          <Box display={"flex"} flexDirection={"column"}>
            {messages.map((i) => {
              const user =
                i.send_by === props.userId
                  ? { user_name: props.user.username }
                  : chatUsers.find((j) => j.user_id === i.send_by);
              return (
                <Box
                  display={"flex"}
                  justifyContent={
                    i.send_by === props.userId ? "flex-end" : "flex-start"
                  }
                  p={1}
                  key={i.id}
                >
                  <Box
                    bgcolor={
                      i.send_by === props.userId
                        ? "rgb(105, 49, 249)"
                        : "rgba(255,255,255,0.05)"
                    }
                    pl={2}
                    pr={2}
                    pt={1}
                    pb={1}
                    borderRadius={2}
                    minWidth={100}
                  >
                    <Typography
                      fontSize={9}
                      textAlign={i.send_by === props.userId ? "right" : "left"}
                      lineHeight={"5px"}
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {user?.user_name}
                    </Typography>
                    <Typography
                      fontSize={14}
                      textAlign={i.send_by === props.userId ? "right" : "left"}
                      color={"#FFFFFF"}
                    >
                      {i.message}
                    </Typography>
                    <Typography
                      fontSize={9}
                      lineHeight={"5px"}
                      textAlign={i.send_by === props.userId ? "right" : "left"}
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {moment(new Date(i.created_at)).fromNow()}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box display={"flex"} justifyContent="center" m={1}>
          <TextField
            margin="none"
            style={{ marginBottom: 0 }}
            fullWidth={true}
            value={text}
            onKeyPress={(e): void => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            onChange={(e): void => {
              setText(e.target.value);
            }}
          />
          <Button
            size="small"
            variant="text"
            sx={{ padding: 0 }}
            onClick={(): void => {
              sendMessage();
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
      <Box
        flex={infoSection ? (props.smallChat ? 1 : 0.3) : 0}
        display={infoSection ? "block" : "none"}
        style={{
          borderLeftColor: "rgba(255,255,255,0.1)",
          borderLeftWidth: 1,
          borderLeftStyle: "solid",
        }}
      >
        <Box
          style={{
            borderBottomColor: "rgba(255,255,255,0.1)",
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
          }}
          display={"flex"}
          justifyContent={"space-between"}
          p={2}
        >
          <Typography
            textAlign={"left"}
            ml={1}
            lineHeight={"35px"}
            color="#FFFFFF"
          >
            Info
          </Typography>
          <IconButton
            aria-label="back"
            size="small"
            onClick={(): any => setInfoSection(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box display={"flex"} justifyContent="center" mt={2}>
          <Avatar
            src={props?.data?.chat_image}
            style={{ height: 150, width: 150 }}
          />
        </Box>
        <Box display={"flex"} justifyContent="center" mt={2}>
          <Button onClick={(): any => setLogoPicker(true)}>
            Change Team Image
          </Button>
        </Box>
        <Box display={"flex"} justifyContent="center" mt={2}>
          <Typography
            textAlign={"left"}
            ml={1}
            lineHeight={"35px"}
            variant={"h5"}
            color="#FFFFFF"
          >
            {props.channelName}
          </Typography>
        </Box>
        <Box p={2}>
          <Typography variant="caption">Participants</Typography>
          <Box mt={1}>
            {chatUsers.map((u, idx) => (
              <Box display={"flex"} justifyContent="space-between" key={idx}>
                <Typography>{u.user_name}</Typography>
                <Button onClick={(): any => removeUserFromGroup(u.user_id)}>
                  Remove
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <NoobFilePicker
        onFileSelected={async (file): Promise<any> => {
          if (file?.length) {
            const fileName = `${v4()}.png`;
            const { data, error } = await uploadImage(
              "public-files",
              `chat/group/${fileName}`,
              file[0]
            );
            if (error) {
              alert("Some error while update team logo");
            } else {
              await frontendSupabase
                .from("chat_users")
                .update({
                  chat_image: (data?.Key || "").replace("public-files/", ""),
                })
                .eq("channel_id", props.channelId);
            }
          }
          setLogoPicker(false);
        }}
        onError={(error): void => {
          console.error(error);
          setLogoPicker(false);
        }}
        allowedExtensions={allowedImageExtensions}
        show={logoPicker}
        maxFiles={1}
        minFiles={0}
        maxFileSizeInBytes={10000 * 10000}
      />
    </Box>
  );
}
