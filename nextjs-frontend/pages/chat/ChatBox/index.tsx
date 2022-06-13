import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IMessages } from "../../../src/backend/services/database/models/i-messages";
import { frontendSupabase } from "../../../src/frontend/services/supabase-frontend-service";

interface IChatBox {
  channelId: string;
  channelName: string;
  userId: string;
}

export default function ChatBox(props: IChatBox): JSX.Element {
  const [messages, _setMessages] = useState<IMessages[]>([]);
  const [text, setText] = useState("");

  const messageRef = useRef(messages);

  const setMessages = (data: any) => {
    _setMessages(data);
    messageRef.current = data;
  };

  const sendMessage = async () => {
    if(text.length){
      await frontendSupabase.from("messages").insert({
        channel_id: props.channelId,
        send_by: props.userId,
        message: text.trim(),
        metadata: null,
      });
      const data = await frontendSupabase
        .from("chat_users")
        .update({ last_message: text, updatedAt: new Date().toISOString })
        .eq("channel_id", props.channelId);
      console.log("data -> ", data);
      setText("");
    }
  };

  const fetchMessages = async () => {
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
      flex={0.6}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"flex-end"}
      pl={1}
      pr={1}
    >
      <Box p={1} bgcolor={"rgb(125, 69, 255)"}>
        <Typography>{props.channelName}</Typography>
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
      <Box display={"flex"} justifyContent="center" mt={1} mb={1}>
        <TextField
          margin="none"
          style={{ marginBottom: 0 }}
          fullWidth={true}
          value={text}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          onChange={(e) => {
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
