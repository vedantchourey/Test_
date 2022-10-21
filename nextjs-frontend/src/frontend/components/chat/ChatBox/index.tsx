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
import GroupIcon from "@mui/icons-material/Group";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { deviceTypes } from "../../../../../src/frontend/redux-store/layout/device-types";
import { isDeviceTypeSelector } from "../../../../../src/frontend/redux-store/layout/layout-selectors";
import { screenWidthSelector } from "../../../../../src/frontend/redux-store/layout/layout-selectors";
import { useAppSelector } from "../../../redux-store/redux-store";

interface IChatBox {
  channelId: string;
  channelName: string;
  userId: string;
  smallChat: boolean;
  user?: any;
  data?: IChatUsers;
  onBack: () => void;
  fetchChat: () => Promise<void>;
  addMember: (channelId: string) => void;
  hideInfo?: boolean;
}

export default function ChatBox(props: IChatBox): JSX.Element {
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;
  const defaultMessage: string | string[] | undefined = query.message;

  const isDesktop = useAppSelector((x) =>
    isDeviceTypeSelector(x, deviceTypes.desktop));

  const screenWidth = useAppSelector((x) =>
    screenWidthSelector(x));

  const [messages, _setMessages] = useState<IMessages[]>([]);
  const [chatUsers, setchatUsers] = useState<any[]>([]);
  const [text, setText] = useState<string>((defaultMessage as string) || "");
  const [infoSection, setInfoSection] = useState(false);
  const [logoPicker, setLogoPicker] = React.useState(false);

  const messageRef = useRef<IMessages[]>(messages);

  const setMessages = (data: any): void => {
    _setMessages(data);
    messageRef.current = data;
  };

  const sendMessage = async (): Promise<void> => {
    if (text.length) {
      await frontendSupabase.from("messages").insert({
        channel_id: props.channelId,
        send_by:
          (props.data?.channel_type === "support" ||
            props.data?.channel_type === "match") &&
          props.user?.userRoles[0] === "noob-admin"
            ? "Support"
            : props.user.id,
        message: text.trim(),
        metadata: null,
      });
      await frontendSupabase
        .from("chat_users")
        .update({
          last_message: text,
          updated_at: moment().add(5.5, "hour")
.toISOString(),
          last_message_by:
            (props.data?.channel_type === "support" ||
              props.data?.channel_type === "match") &&
            props.user?.userRoles[0] === "noob-admin"
              ? "Support"
              : props.user.username,
          unread: true,
        })
        .eq("channel_id", props.channelId);
      setText("");
    }
  };

  const deleteChat = async (): Promise<void> => {
    await frontendSupabase
      .from("chat_users")
      .delete()
      .eq("channel_id", props.channelId)
      .eq("user_id", props.userId);

    props.onBack();
    props.fetchChat();
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
    await frontendSupabase
      .from("chat_users")
      .update({
        unread: false,
      })
      .eq("channel_id", props.channelId);
  };

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
      .on("INSERT", async (payload) => {
        if (payload.new.channel_id === props.channelId) {
          const updateMessages = [...messageRef.current, payload.new];
          setMessages(updateMessages);

          await frontendSupabase
            .from("chat_users")
            .update({
              unread: false,
            })
            .match({ user_id: props.userId, channel_id: props.channelId });
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
            flexDirection: !isDesktop ? "column" : "row",
          }}
          display="flex"
          justifyContent={"space-between"}
          alignItems={!isDesktop ? "left" : "center"}
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
              fontSize={!isDesktop ? 13 : 15}
            >
              {props.channelName}
            </Typography>
            {!props.hideInfo && (
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
            style={{ marginLeft: !isDesktop ? 40 : 0 }}
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

              const isCurrentUserMessage =
                props.user?.userRoles[0] === "noob-admin" &&
                i.send_by === "Support"
                  ? true
                  : i.send_by === props.userId;

              return (
                <Box
                  display={"flex"}
                  justifyContent={
                    isCurrentUserMessage ? "flex-end" : "flex-start"
                  }
                  p={1}
                  key={i.id}
                >
                  <Box
                    bgcolor={
                      isCurrentUserMessage
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
                      textAlign={isCurrentUserMessage ? "right" : "left"}
                      lineHeight={"5px"}
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {user?.user_name || i.send_by}
                    </Typography>
                    <Typography
                      fontSize={14}
                      textAlign={isCurrentUserMessage ? "right" : "left"}
                      color={"#FFFFFF"}
                    >
                      {i.message}
                    </Typography>
                    <Typography
                      fontSize={9}
                      lineHeight={"5px"}
                      textAlign={isCurrentUserMessage ? "right" : "left"}
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
            style={{ marginBottom: 0, marginRight: "10px" }}
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
            variant="contained"
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
          {props?.data?.chat_image ? (
            <Avatar
              src={props?.data?.chat_image}
              style={{ height: 150, width: 150 }}
            />
          ) : (
            <GroupIcon
              style={{
                height: 150,
                width: 150,
                borderRadius: 75,
                background: "rgba(0,0,0,0.4)",
              }}
            />
          )}
        </Box>
        {props.data?.channel_type === "group" && (
          <Box display={"flex"} justifyContent="center" mt={2}>
            <Button
              onClick={(): any => {
                setLogoPicker(true);
                setTimeout(() => {
                  setLogoPicker(false);
                }, 500);
              }}
            >
              Change Team Image
            </Button>
          </Box>
        )}

        {props.data?.channel_type === "group" && (
          <Box mt={1} mb={1}>
            <Button
              fullWidth
              onClick={(): any => props.addMember(props.channelId)}
            >
              Add new member
            </Button>
          </Box>
        )}

        <Box display={"flex"} justifyContent="center" mt={2}>
          <Button
            onClick={(): any => deleteChat()}
            color="error"
            variant="outlined"
          >
            Delete Chat
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

        {props.data?.channel_type === "group" && (
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
        )}
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
            await props.fetchChat();
            props.onBack();
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
