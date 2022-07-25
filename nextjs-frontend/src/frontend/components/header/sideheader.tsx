import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputBase,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Popover,
  Typography,
  List,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import {
  avatarImageBlobUrlSelector,
  isLoggedInSelector,
  userNameSelector,
} from "../../redux-store/authentication/authentication-selectors";
import { useAppDispatch, useAppSelector } from "../../redux-store/redux-store";
import { walletDetaislSelector } from "../../redux-store/wallet/wallet-selector";
import { setWalletDetails } from "../../redux-store/wallet/wallet.-slice";
import { ISearchPeopleByUsernameResponse } from "../../service-clients/messages/i-search";
import { searchPeopleByText } from "../../service-clients/search-service-client";
import { getAuthHeader } from "../../utils/headers";
import style from "./desktop-sidebar.module.css";
import BasicPopover from "./notification-popover";
import styles from "./logged-in-user-menu.module.css";
import frontendConfig from "../../utils/config/front-end-config";
import { getUserProfileImage } from "../../service-clients/image-service-client";
import { INotifications } from "../../../backend/services/database/models/i-notifications";

export default function SideHeader(): JSX.Element {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const username = useAppSelector(userNameSelector);
  const wallet = useAppSelector(walletDetaislSelector);
  const router = useRouter();
  const [notifications, setNotifications] = React.useState<any>([]);
  const [notificationLength,setNotificationLength]=React.useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const avatarImageBlobUrl = useAppSelector(avatarImageBlobUrlSelector);

  const [userList, setUserList] = React.useState<
    ISearchPeopleByUsernameResponse[]
  >([]);
  const [isFetching, setIsFetching] = React.useState(false);

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
            message:{
                    image: i.publicURL,
                    text: i.message,
                  },
            data: i,
            isActionRequired: i.is_action_required,
          };
        });
        setNotificationLength(notificatiosData?.length);
        setNotifications(notificatiosData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const appDispatch = useAppDispatch();
  const fetchWalletDetails = async (): Promise<void> => {
    const headers = await getAuthHeader();
    const { data } = await axios.get(`/api/wallet/details`, {
      headers,
    });
    if (data) appDispatch(setWalletDetails(data));
  };

  const submitNotification = async (
    id: string,
    response: string
  ): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .post(
        "/api/notifications",
        { id, response },
        {
          headers: { ...headers },
        }
      )
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setAnchorEl(null);
        fetchNotifications();
      });
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      fetchWalletDetails();
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

  return (
    <>
      {isLoggedIn && (
        <Grid container spacing={1}>
          <Grid item md={7}></Grid>
          <Grid item md={5}>
            <div
              className={style.container4}
              style={{ justifyContent: "flex-end" }}
            >
              <Box
                style={{ border: "1px solid #6931F9" }}
                sx={{ borderRadius: "16px" }}
              >
                <InputBase
                  size="small"
                  placeholder="Search anything..."
                  sx={{ p: 1 }}
                  onChange={(e): any => {
                    searchByUserName(e.target.value);
                  }}
                />
                <IconButton sx={{ mr: 1 }}>
                  <img src="/icons/search-icon.png" />
                </IconButton>
                {renderResults()}
              </Box>
              <IconButton onClick={handleClick} sx={{ mr: 1, ml: 1 }} >
              {notificationLength>0&&<Typography className={style.notification}>{notificationLength}</Typography>}
                <img src="/icons/notification-icon.svg" />
              </IconButton>
              <Button
                variant="text"
                onClick={(): any => router.push("/account")}
              >
                <img
                  src={avatarImageBlobUrl || "/images/16276393842661.png"}
                  className={style.img3}
                  alt="logo"
                  style={{ height: "50px", width: "50px" }}
                />
              </Button>

              <Box>
                <Typography className={style.text1}>{username}</Typography>
                <Button
                  variant="text"
                  size="small"
                  className={style.button4}
                  onClick={(): any => router.push("/wallet/info")}
                  startIcon={<img src="/icons/Vector-Wallet.png" />}
                >
                  {wallet?.balance}
                </Button>
              </Box>
            </div>
          </Grid>
        </Grid>
      )}
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
        sx={{ textAlign: "center" }}
      >
        <ListSubheader
          sx={{
            fontStyle: "norma",
            fontSize: "20px",
            fontWeight: 700,
            fontFamily: "Inter",
            color: "#FFFFFF",
            minWidth: 500,
          }}
        >
          Notifications
        </ListSubheader>
        {notifications.map(
          (i: any, idx: number) =>
            idx < 10 && (
              <BasicPopover
                message={i.message}
                onAccept={(): void => {
                  submitNotification(i.id, "ACCEPTED");
                }}
                onDecline={(): void => {
                  submitNotification(i.id, "REJECT");
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
          View All
        </Button>
      </Popover>
    </>
  );
}
