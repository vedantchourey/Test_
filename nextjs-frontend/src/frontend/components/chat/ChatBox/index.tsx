import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { IMessages } from "../../../../backend/services/database/models/i-messages";
import { frontendSupabase } from "../../../services/supabase-frontend-service";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface IChatBox {
  channelId: string;
  channelName: string;
  userId: string;
  smallChat: boolean;
  onBack: () => void;
}

export default function ChatBox(props: IChatBox): JSX.Element {
  const [messages, _setMessages] = useState<IMessages[]>([]);
  const [text, setText] = useState<string>("");

  const messageRef = useRef<IMessages[]>(messages);

  const setMessages = (data: any): void => {
    _setMessages(data);
    messageRef.current = data;
  };

  const sendMessage = async (): Promise<void> => {
    if(text.length){
      await frontendSupabase.from("messages").insert({
        channel_id: props.channelId,
        send_by: props.userId,
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

  const fetchMessages = async (): Promise<void> => {
    const messages = await frontendSupabase
      .from("messages")
      .select("*")
      .eq("channel_id", props.channelId);
    setMessages(messages.data as IMessages[]);
  };

  useEffect(() => {
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
    <Box
      flex={props.smallChat ? 1 : 0.75}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-end"}
      // pl={1}
      // pr={1}
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
          <Typography textAlign={"left"} ml={1} lineHeight={"35px"}>
            {props.channelName}
          </Typography>
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
      >
        <Box display={"flex"} flexDirection={"column"}>
          {messages.map((i) => (
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
              >
                <Typography fontSize={14}>{i.message}</Typography>
              </Box>
            </Box>
          ))}
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
  );
}
