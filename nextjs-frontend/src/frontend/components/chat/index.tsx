import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  TextField,
  Typography,
  InputBase,
  Link,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import styles from "../header/logged-in-user-menu.module.css";
import SearchIcon from "@mui/icons-material/Search";
import _ from "lodash";
import { searchPeopleByText } from "../../service-clients/search-service-client";
import { ISearchPeopleByUsernameResponse } from "../../service-clients/messages/i-search";
import frontendConfig from "../../utils/config/front-end-config";
import CloseIcon from "@mui/icons-material/Close";

export default function Chat(props: {
  smallChat: boolean;
  social?: boolean;
  setChatCount?: (count: number) => void;
}): JSX.Element {
  const router = useRouter();
  const query: ParsedUrlQuery = router.query;
  const otheruser: string | string[] | undefined = query.user;
  const name: string | string[] | undefined = query.name;

  const user = useAppSelector(userProfileSelector);
  const [chats, _setChats] = useState<object>({});
  const [currentChat, setCurrentChat] = useState<string | null>();
  const [currentChatData, setCurrentChatData] = useState<any>();
  const [currentChatName, setCurrentChatName] = useState("");
  const [supportChatChannel, setSupportChatChannel] = useState<boolean>(false);
  const [teamData, setTeamData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState<ISearchPeopleByUsernameResponse[]>(
    []
  );
  const [userParam, setUserParam] = useState<any>();
  const [createGroup, setCreateGroup] = useState(false);
  const [userListForGroup, setUserListForGroup] = useState<
    ISearchPeopleByUsernameResponse[]
  >([]);
  const [selectedUserListForGroup, setSelectedUserListForGroup] = useState<
    ISearchPeopleByUsernameResponse[]
  >([]);
  const [addInGroup, setAddInGroup] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = useState(false);
  const checkChannel = async (oUser?: string, oName?: string): Promise<any> => {
    const _otheruser = oUser || otheruser;
    const _name = oName || name;
    if (_otheruser && _name) {
      const res = await frontendSupabase
        .from("chat_users")
        .select()
        .eq("user_id", user?.id || "")
        .eq("other_user", _otheruser);
      if (res.data?.length) {
        setCurrentChat(res.data?.[0]?.channel_id || null);
        setCurrentChatData(res.data?.[0]);
        setCurrentChatName(name as string);
      } else {
        createNewChat(_otheruser as string, _name as string);
      }
    }
    setOpen(false);
    setAddInGroup("");
    setCreateGroup(false);
    setGroupName("");
    setSelectedUserListForGroup([]);
    setUserListForGroup([]);
  };

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
    setLoading(true);
    const query = frontendSupabase.from("chat_users").select();

    if (user?.userRoles[0] === "noob-admin")
      query.or(`user_id.eq.${user?.id},user_id.eq.support`);
    else {
      query.eq("user_id", user?.id);
    }

    const res = await query;

    const data: any = {};

    if (!res.error) {
      res.data.map((i: IChatUsers) => {
        data[i.channel_id] = i;
      });
    }
    setChats(data);
    setLoading(false);
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

  const renderResults = (group?: boolean): JSX.Element => {
    if (isFetching) {
      return (
        <List
          // className={styles.searchListLoder}
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <CircularProgress />
        </List>
      );
    } else if (
      !isFetching &&
      (group ? userListForGroup.length : userList.length)
    ) {
      return (
        <List sx={{ width: "100%" }}>
          {_.differenceBy(
            group ? userListForGroup : userList,
            selectedUserListForGroup,
            "username"
          ).map((data, i) => (
            <ListItem key={Date.now() + i}>
              <ListItemButton
                onClick={(): void => {
                  if (addInGroup) {
                    addMemberInGroup(addInGroup, data);
                  }
                  if (group) {
                    setSelectedUserListForGroup([
                      ...selectedUserListForGroup,
                      data,
                    ]);
                  } else checkChannel(data.id, data.username);
                }}
                sx={{ padding: "2px 18px", my: 1 }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{ width: 35, height: 35 }}
                    alt="profile image"
                    src={`${frontendConfig.storage.publicBucketUrl}/${frontendConfig.storage.publicBucket}/${data.avatarUrl}`}
                  >
                    {data.username.split("")[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText className={styles.listText}>
                  <Typography>@{data.username}</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      );
    }
    return (
      <></>
      /*  <List className={styles.searchListLoder} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
           <h1>No data found</h1>
         </List> */
    );
  };

  const chatsList: IChatUsers[] = Object.values(chats).sort(
    (a: IChatUsers, b: IChatUsers) => {
      return (
        parseInt(moment(b.updated_at).format("X")) -
        parseInt(moment(a.updated_at).format("X"))
      );
    }
  );

  const createNewChat = async (
    other_user: string,
    name: string
  ): Promise<any> => {
    setLoading(true);
    const channel_id = v4();
    const res = await frontendSupabase.from("chat_users").insert({
      channel_id,
      user_id: user?.id || "",
      other_user,
      channel_name: name,
      user_name: user?.username,
      channel_type: "one-to-one",
    });

    if (res.data?.length) {
      setCurrentChat(channel_id);
      setCurrentChatData(res.data?.[0]);
    }
    setCurrentChatName(name);
    await frontendSupabase.from("chat_users").insert({
      channel_id,
      user_id: other_user,
      other_user: user?.id || "",
      channel_name: user?.username,
      user_name: "support",
      channel_type: "one-to-one",
    });
    await frontendSupabase.from("messages").insert({
      channel_id,
      send_by: user?.id,
      message: "Hey",
      metadata: null,
    });
    await frontendSupabase
      .from("chat_users")
      .update({
        last_message: "Hey",
        updatedAt: new Date().toISOString,
      })
      .eq("channel_id", `${user?.id}_support`);
    fetchSupportChannel();
    fetchChannels();
    setLoading(false);
  };

  const addMemberInGroup = async (
    channel_id: string,
    player: ISearchPeopleByUsernameResponse
  ): Promise<void> => {
    setLoading(true);
    const chatsData: any = chats;
    const group = chatsData[channel_id] as any;
    const check = await frontendSupabase
      .from("chat_users")
      .select("*")
      .eq("channel_id", channel_id)
      .eq("user_id", player?.id);
    if (check.data?.length) {
      const addUserData = {
        ...group,
        channel_id,
        user_id: player?.id || "",
        other_user: channel_id,
        channel_name: group.channel_name,
        user_name: player?.username,
        channel_type: "group",
      };
      delete addUserData.id;

      await frontendSupabase.from("chat_users").insert(addUserData);
    }

    setOpen(false);
    setAddInGroup("");
    setCreateGroup(false);
    setGroupName("");
    setSelectedUserListForGroup([]);
    setUserListForGroup([]);
    fetchSupportChannel();
    fetchChannels();
    setLoading(false);
  };

  const createNewGroupChat = async (): Promise<any> => {
    setLoading(true);
    const channel_id = v4();
    const res = await frontendSupabase.from("chat_users").insert({
      channel_id,
      user_id: user?.id || "",
      other_user: channel_id,
      channel_name: groupName,
      user_name: user?.username,
      channel_type: "group",
    });

    setCurrentChatName(groupName);
    await Promise.all(
      selectedUserListForGroup.map((u) =>
        frontendSupabase.from("chat_users").insert({
          channel_id,
          user_id: u.id,
          other_user: channel_id,
          channel_name: groupName,
          user_name: u.username,
          channel_type: "group",
        }))
    );

    if (res.data?.length) {
      setCurrentChat(channel_id);
      setCurrentChatData(res.data?.[0]);
    }
    setOpen(false);
    setAddInGroup("");
    setCreateGroup(false);
    setGroupName("");
    setSelectedUserListForGroup([]);
    setUserListForGroup([]);

    fetchSupportChannel();
    fetchChannels();
    setLoading(false);
  };

  const createSupportChat = async (): Promise<any> => {
    setLoading(true);
    await frontendSupabase.from("chat_users").insert({
      channel_id: `${user?.id}_support`,
      user_id: user?.id || "",
      other_user: "support",
      channel_name: "support",
      user_name: user?.username,
      channel_type: "one-to-one",
      type: "support",
    });
    await frontendSupabase.from("chat_users").insert({
      channel_id: `${user?.id}_support`,
      user_id: "support",
      other_user: user?.id || "",
      channel_name: user?.username,
      user_name: "support",
      channel_type: "one-to-one",
      type: "support",
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

  async function searchByUserName(
    username: string,
    group = false
  ): Promise<void> {
    setIsFetching(true);
    setUserList([]);
    if (!username) {
      setIsFetching(false);
      return;
    }
    const response = await searchPeopleByText({ search: username });
    if (response.length) {
      if (group) setUserListForGroup(response);
      else setUserList(response);
    }
    setIsFetching(false);
  }

  const renderChatList = (): JSX.Element => {
    const chatByGroup = _(chatsList)
      .groupBy("channel_type")
      .map(function (items, type) {
        return {
          type,
          values: items,
        };
      })
      .value();

      const users: any = [];
      for (let user = 0; user < chatByGroup?.length; user++) {
        chatByGroup[user]?.values?.map((item) => users?.push(item?.channel_name))
      }

    return (
      <>
        <Box
          style={{ border: "1px solid #6931F9", display: 'flex' }}
          sx={{ borderRadius: "16px" }}
        >
          <InputBase
            size="small"
            placeholder="Search anything..."
            sx={{ p: 1 }}
            onChange={(e): any => {
              const names = users.filter((item: any) => item.toLowerCase().includes(e.target.value))
              names?.length > 0 ? setUserParam(names[0]) : null;
            }}
          />
          <Link
            href={userParam === undefined
              ? "/chat"
              : "/chat?user=" + userParam?.toLowerCase() + "&name=" + userParam
            }
            underline="none"
          >
            <img src="/icons/search-icon.png" style={{ height: 20, width: 20, marginRight: 10, marginTop: 10 }} />
          </Link>
        </Box>
        {chatByGroup.map((c) => (
          <>
            <Typography variant={"h6"} m={1}>
              {c.type === "team" && "Team"}
              {c.type === "one-to-one" && "Friends"}
              {c.type === "group" && "Groups"}
              {c.type === "support" && "Support"}
            </Typography>
            {c.values.map((i) => {
              const findTeam = teamData?.find((t) => t.id === i.other_user);
              const chatIcon =
                i.chat_image || findTeam?.teamLogo
                  ? (frontendSupabase.storage
                      .from("public-files")
                      .getPublicUrl(
                        i.channel_type === "group"
                          ? i.chat_image
                          : findTeam?.teamLogo
                      ).publicURL as string)
                  : null;

              return (
                <ChatCard
                  key={i.id}
                  image={chatIcon || ""}
                  name={i.channel_name}
                  otherUser={i.other_user}
                  message={i.last_message}
                  type={i.channel_type}
                  lastMessageUser={i.last_message_by}
                  onClick={(): void => {
                    setCurrentChat(null);
                    setCurrentChatData(null);
                    setTimeout((): void => {
                      setCurrentChatName(i.channel_name);
                      setCurrentChatData({ ...i, chat_image: chatIcon });
                      setCurrentChat(i.channel_id);
                    }, 200);
                  }}
                  isUnreadMessage={i.unread}
                />
              );
            })}
          </>
        ))}
      </>
    );
  };

  useEffect(() => {
    if (user) {
      fetchSupportChannel();
      fetchChannels();
      checkChannel();
      userRef.current = user;
    }
  }, [user]);

  useEffect(() => {
    if(props.setChatCount){
      props.setChatCount(Object.values(chats).filter((i) => i.unread === true).length)
    }
  }, [chats])

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

  useEffect(() => {
    if (addInGroup.length) {
      setOpen(true);
    }
  }, [addInGroup]);

  if(loading) {
    return (
      <Box display={"flex"} height={400} alignItems={"center"} justifyContent={"center"}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      bgcolor={"rgba(255,255,255,0.05)"}
      display={"flex"}
      flex={1}
      overflow={"scroll"}
      className={"hide-scrollbar"}
      height={props.smallChat ? (props.social ? "80vh" : "20%") : "80vh"}
    >
      <Box
        flex={props.smallChat ? 1 : 0.25}
        style={{
          borderRightStyle: "solid",
          borderRightColor: "rgba(255,255,255,0.1)",
          borderRightWidth: 1,
          overflow: "scroll",
        }}
        display={props.smallChat && currentChat ? "none" : "block"}
        className={"hide-scrollbar"}
      >
        {!supportChatChannel && user?.userRoles[0] !== "noob-admin" ? (
          <Box mt={2} display={"none"}>
            <Button disabled={loading} onClick={(): any => createSupportChat()}>
              Create Support Chat
            </Button>
          </Box>
        ) : null}
        {renderChatList()}
        <Box
          position={"absolute"}
          bottom={10}
          marginLeft={props.smallChat ? "21vw" : "16vw"}
        >
          <Fab
            color="primary"
            aria-label="add"
            onClick={(): any => setOpen(true)}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>

      {currentChat ? (
        <ChatBox
          channelName={currentChatName}
          channelId={currentChat}
          userId={user?.id || ""}
          onBack={(): any => {
            setCurrentChat(undefined);
            setCurrentChatData(null);
          }}
          user={user}
          data={currentChatData}
          smallChat={props.smallChat}
          addMember={(cid): any => setAddInGroup(cid)}
          fetchChat={fetchChannels}
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

      {/* {!props.smallChat && currentChat && (
        <Box
          flex={props.smallChat ? 0 : 0.25}
          style={{
            borderLeftStyle: "solid",
            borderLeftColor: "rgba(255,255,255,0.1)",
            borderLeftWidth: 1,
          }}
        >
          <Typography variant={"h6"} m={2}>
            Info
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
            <Avatar style={{height: 120, width: 120}} />          
          </Box>
        </Box>
      )} */}
      <Modal
        open={open}
        onClose={(): any => {
          setOpen(false);
          setCreateGroup(false);
          setAddInGroup("");
          setGroupName("");
          setSelectedUserListForGroup([]);
          setUserListForGroup([]);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid md={3} xs={0} />
          <Grid
            item
            md={6}
            xs={12}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Card>
              <Box p={2}>
                <Box style={{justifyContent:'space-between',marginBottom:'20px'}} display="flex">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {createGroup?"Create Group":"Search Someone" }
                </Typography>
                <Button
                  variant="outlined"
                  onClick={(): any => setCreateGroup(!createGroup)}
                  >
                    {createGroup?"Search Someone":"Create Group" }
                  </Button>
                </Box>
                <Box >
                {createGroup && !addInGroup && (
                    <Box
                      flex={1}
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        alignItems: "center",
                        alignSelf: "center",
                        display: "flex",
                        borderRadius: 3,
                        paddingRight: 2,
                        mr: 1,
                        flex:1,
                        marginLeft:'10px',
                        marginBottom:"15px",
                      }}
                    >
                      <TextField
                        placeholder="Group Name"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        value={groupName}
                        margin="none"
                        sx={{ marginBottom: 0, padding: 1, flex: 1 }}
                        onChange={(e): void => {
                          setGroupName(e.target.value);
                        }}
                      />
                    </Box>
                  )}
                  <Box
                    flex={1}
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      alignItems: "center",
                      alignSelf: "center",
                      display: "flex",
                      borderRadius: 3,
                      paddingRight: 2,
                      ml: 1,
                    }}
                  >
                    <TextField
                      placeholder={createGroup?"Add a Member":"Search by username"}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                      }}
                      value={searchText}
                      margin="none"
                      sx={{ marginBottom: 0, padding: 1, flex: 1 }}
                      onChange={(e): void => {
                        setSearchText(e.target.value);
                        searchByUserName(e.target.value, createGroup);
                      }}
                    />
                    <SearchIcon color="primary" />
                  </Box>
                </Box>
                {selectedUserListForGroup.map((data, i) => (
                  <ListItem key={Date.now() + i}>
                    <ListItemButton sx={{ padding: "2px 5px" }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ width: 35, height: 35 }}
                          alt="profile image"
                          src={`${frontendConfig.storage.publicBucketUrl}/${frontendConfig.storage.publicBucket}/${data.avatarUrl}`}
                        >
                          {data.username.split("")[0].toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText className={styles.listText}>
                        <Typography>@{data.username}</Typography>
                      </ListItemText>
                      <ListItemText
                        style={{ display: "flex", justifyContent: "flex-end" }}
                        onClick={(): any =>
                          setSelectedUserListForGroup(
                            selectedUserListForGroup.filter(
                              (i) => i.username !== data.username
                            )
                          )
                        }
                      >
                        <IconButton>
                          <CloseIcon />
                        </IconButton>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
                {renderResults(createGroup)}
                <Box display={"flex"} mt={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={(): any => {
                      setOpen(false);
                      setAddInGroup("");
                      setCreateGroup(false);
                      setGroupName("");
                      setSelectedUserListForGroup([]);
                      setUserListForGroup([]);
                    }}
                  >
                    Cancel
                  </Button>
                  {createGroup&&<Button
                    variant="contained"
                    sx={{ ml: 1 }}
                    onClick={(): any => createNewGroupChat()}
                    disabled={
                      !selectedUserListForGroup.length || !groupName || loading
                    }
                  >
                    Create
                  </Button>}
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Modal>
    </Box>
  );
}
