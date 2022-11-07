import { AppBar, IconButton, Button, Box, Divider, Popover, ListSubheader, Typography, InputBase, List, CircularProgress, ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import styles from "./noob-mobile-header.module.css";
import * as React from "react";
import { useState } from "react";
import NoobDrawer from "../drawer/noob-drawer";
import LoginModal from "../auth/login-modal/login-modal";
import { useAppDispatch, useAppSelector } from "../../redux-store/redux-store";
import { isLoggedInSelector } from "../../redux-store/authentication/authentication-selectors";
import { signOut } from "../../service-clients/auth-service-client";
import { setMobileHeaderHeight } from "../../redux-store/layout/layout-slice";
import { mobileHeaderHeightSelector } from "../../redux-store/layout/layout-selectors";
import { useRouter } from "next/router";
import style from "./mobile-sidebar.module.css";
import { walletDetaislSelector } from "../../redux-store/wallet/wallet-selector";
import BasicPopover from "./notification-popover";
import { getAuthHeader } from "../../utils/headers";
import axios from "axios";
import { INotifications } from "../../../backend/services/database/models/i-notifications";
import { getUserProfileImage } from "../../service-clients/image-service-client";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import frontendConfig from "../../utils/config/front-end-config";
import { ISearchPeopleByUsernameResponse } from "../../service-clients/messages/i-search";
import { searchPeopleByText } from "../../service-clients/search-service-client";

export default function MobileDrawer(): JSX.Element {
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [notifications, setNotifications] = React.useState<any[]>([]);
  // const [notificationLength,setNotificationLength]=React.useState<number>(0);
  // const [notificationPayload, setNotificationPayload] = React.useState<any>()
  // const [gameIdModal, setGameIdModal] = React.useState(false);
  const [gameId, setGameId] = React.useState("")
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [userList, setUserList] = React.useState<
    ISearchPeopleByUsernameResponse[]
  >([]);
  const [isFetching, setIsFetching] = React.useState(false);

  const toggleDrawer = (): void => setShowMenu(true);
  const hideMenu = (): void => setShowMenu(false);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const appDispatch = useAppDispatch();
  const currentHeight = useAppSelector(mobileHeaderHeightSelector);
  const router = useRouter();
  const wallet = useAppSelector(walletDetaislSelector);

  function onSuccessfulLogin(): void {
    setShowLoginModal(false);
  }

  function onLoginClick(): void {
    setShowLoginModal(true);
    hideMenu();
  }

  async function onLogoutClick(): Promise<void> {
    hideMenu();
    await signOut();
  }

  const updateMobileHeight = (element: HTMLDivElement | null): void => {
    if (!element?.clientHeight) return;
    if (currentHeight === element?.clientHeight) return;
    appDispatch(setMobileHeaderHeight(element?.clientHeight || 0));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const renderResults = (): JSX.Element => {
    if (isFetching) {
      return (
        <List
          className={styles.searchListLoder}
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <CircularProgress />
        </List>
      );
    } else if (!isFetching && userList.length) {
      return (
        <List
          className={styles.searchList}
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {userList.map((data, i) => (
            <ListItem key={Date.now() + i}>
              <ListItemButton
                onClick={(): unknown =>
                  router.replace(`/account/${data.username}`)
                }
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

    // eslint-disable-next-line no-else-return
    else {
      return (
        <></>
        /*  <List className={styles.searchListLoder} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
           <h1>No data found</h1>
         </List> */
      );
    }
  };

  async function searchByUserName(username: string): Promise<void> {
    setIsFetching(true);
    setUserList([]);
    if (!username) {
      setIsFetching(false);
      return;
    }
    const response = await searchPeopleByText({ search: username });
    if (response.length) setUserList(response);
    setIsFetching(false);
  }

  const submitNotification = async (id: string, response: string): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .post(
        "/api/notifications",
        { id, response, gameUniqueId: gameId },
        {
          headers: { ...headers },
        }
      )
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        // setNotificationPayload(undefined);
        setAnchorEl(null);
        // setGameIdModal(false);
        fetchNotifications();
      });
  };

  const fetchNotifications = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get("/api/notifications", {
        headers: { ...headers },
      })
      .then(async (res) => {
        const notificationWithImages = await Promise.all(
          ((res?.data?.data as Array<INotifications>) || []).map((i) =>
            getUserProfileImage(i.sent_by || "", i))
        );

        const notificatiosData = notificationWithImages.map((i: any) => {
          return {
            id: i.id,
            publicURL: i.publicURL,
            message:{ image: i.publicURL, text: i.message },
            data: i,
            isActionRequired: i.is_action_required,
            redirect: i?.data?.redirect,
            username: i?.username,
            createdAt:i?.created_at,
          };
        });
        // setNotificationLength(notificatiosData?.length);
        setNotifications(notificatiosData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    if(isLoggedIn){
      fetchNotifications();
    } else{
      setNotifications([]);
    }
  }, [isLoggedIn])

  return (
    <>
      <AppBar
        position="fixed"
        className={styles.appBar}
        ref={updateMobileHeight}
      >
        <div className={style.container}>
          <Box>
            <IconButton onClick={toggleDrawer}>
              <img
                src="/icons/Vector-MenuIcon.png"
                style={{ height: 15, width: 20 }}
              />
            </IconButton>
          </Box>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              src="/icons/logo-white-1.png"
              style={{ height: 25, width: 15 }}
            />
            <div
              style={{
                height: 15,
                width: 1,
                backgroundColor: "white",
                marginLeft: 10,
              }}
            />
            <img
              src="/images/noobstorm-logo-small.png"
              style={{ height: 35, width: 120, marginLeft: 10 }}
            />
          </div>
          {isLoggedIn && (
            <Box>
              <Button
                variant="text"
                className={style.button1}
                startIcon={<img src="/icons/Vector-Wallet.png" />}
                onClick={(): any => router.push("/wallet/info")}
              >
                {wallet?.balance}
              </Button>
            </Box>
          )}
          <Box>
            <div onClick={(e: any): void => handleClick(e)}>
              <img src="/icons/Vector-Bell.png" className={style.img3} />
              <img src="/icons/Vector-Ellipse.png" className={style.img4} />
            </div>
          </Box>
        </div>
        {/* {isSearchVisible && (
          <div style={{ display: "flex", padding: "0px 20px 0px 20px" }}>
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              style={{ flex: 1, fontSize: 10, paddingTop: 7 }}
            />
          </div>
        )} */}
        {isSearchVisible && (
          <Box>
            <Box
              style={{ border: "1px solid #6931F9" }}
              sx={{ borderRadius: "16px" }}
            >
              <InputBase
                size="small"
                placeholder="Search anything..."
                sx={{ p: 1, width: "85%" }}
                onChange={(e): any => {
                  searchByUserName(e.target.value);
                }}
              />
              <IconButton sx={{ mr: 1 }}>
                <img src="/icons/search-icon.png" />
              </IconButton>
            </Box>
            {renderResults()}
          </Box>
        )}
        <Divider />
        {isLoggedIn && (
          <div className={styles.bottomHeader}>
            <IconButton
              className={styles.bottomHeaderIcons}
              onClick={(): Promise<boolean> => router.push("/")}
            >
              <img
                src="/images/menu/Home.png"
                style={{ height: 20, width: 20 }}
              />
            </IconButton>
            <IconButton
              className={styles.bottomHeaderIcons}
              onClick={(): Promise<boolean> => router.push("/tournaments-list")}
            >
              <img
                src="/images/menu/Tournaments.png"
                style={{ height: 25, width: 25 }}
              />
            </IconButton>
            <IconButton
              className={styles.bottomHeaderIcons}
              onClick={(): Promise<boolean> => router.push("/leaderboard")}
            >
              <img
                src="/images/menu/Leader-Board.png"
                style={{ height: 25, width: 25 }}
              />
            </IconButton>
            <IconButton
              className={styles.bottomHeaderIcons}
              onClick={(): Promise<boolean> => router.push("/chat")}
            >
              <img
                src="/images/menu/Chat.png"
                style={{ height: 25, width: 25 }}
              />
            </IconButton>
            <IconButton
              className={styles.bottomHeaderIcons}
              onClick={(): void => setIsSearchVisible(!isSearchVisible)}
            >
              <SearchIcon />
            </IconButton>
          </div>
        )}
      </AppBar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ textAlign: "center", width: "80%" }}
      >
        <ListSubheader
          sx={{
            fontStyle: "norma",
            fontSize: "10px",
            fontWeight: 700,
            fontFamily: "Inter",
            color: "#FFFFFF",
            minWidth: 500,
            textAlign: "left",
          }}
        >
          Notifications
        </ListSubheader>
        {notifications
          ?.sort(function (a: any, b: any) {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateA < dateB ? 1 : -1;
          })
          .map(
            (i: any, idx: number) =>
              idx < 10 && (
                <BasicPopover
                  message={i.message}
                  type={i.data.type}
                  data={i.data.data}
                  onAccept={(): void => {
                    if (i.data.type === "TOURNAMENT_INVITE") {
                      setGameId("");
                      // setGameIdModal(true);
                      // setNotificationPayload(i.id);
                    } else {
                      submitNotification(i.id, "ACCEPTED");
                    }
                  }}
                  onDecline={(): void => {
                    submitNotification(i.id, "REJECTED");
                  }}
                  onNevigation={(): void => {
                    i.redirect
                      ? router.push(i.redirect)
                      : router.push(`/account/${i.username}`);
                  }}
                  isActionRequired={i.isActionRequired}
                  key={idx}
                />
              )
          )}
        <Button
          variant="text"
          onClick={(): any => router.push(`/notification`)}
        >
          <Typography sx={{ fontSize: 10 }}>View All</Typography>
        </Button>
      </Popover>
      <NoobDrawer
        show={showMenu}
        onClose={hideMenu}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
      />
      <LoginModal
        show={showLoginModal}
        onCancel={(): void => setShowLoginModal(false)}
        onSuccessfulLogin={onSuccessfulLogin}
      />
    </>
  );
}
