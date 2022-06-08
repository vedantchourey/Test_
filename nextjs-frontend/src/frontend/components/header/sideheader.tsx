import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  Popover,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import * as React from "react";
import {
  isLoggedInSelector,
  userNameSelector,
} from "../../redux-store/authentication/authentication-selectors";
import { useAppSelector } from "../../redux-store/redux-store";
import { walletDetaislSelector } from "../../redux-store/wallet/wallet-selector";
import { getAuthHeader } from "../../utils/headers";
import style from "./desktop-sidebar.module.css";
import BasicPopover from "./notification-popover";

export default function SideHeader(): JSX.Element {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const username = useAppSelector(userNameSelector);
  const wallet = useAppSelector(walletDetaislSelector);
  const router = useRouter();
  const [notifications, setNotifications] = React.useState<any>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const fetchNotifications = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get("/api/notifications", {
        headers: { ...headers },
      })
      .then((res) => {
        const notificatiosData = (res?.data?.data || [])?.map((i: any) => ({
          id: i.id,
          message:
            i.type === "TOURNAMENT_INVITE"
              ? {
                  image: "/icons/notification-data-image.svg",
                  text: "You have new tournament invitations",
                }
              : {
                  image: "/icons/notification-data-image.svg",
                  text: "New notifications",
                },
          data: i,
          isActionRequired: i.is_action_required,
        }));
        setNotifications(notificatiosData);
      })
      .catch((err) => {
        console.error(err);
      });
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
                />
                <IconButton sx={{ mr: 1 }}>
                  <img src="/icons/search-icon.png" />
                </IconButton>
              </Box>
              <IconButton onClick={handleClick} sx={{ mr: 1, ml: 1 }}>
                <img src="/icons/notification-icon.svg" />
              </IconButton>
              <img
                src="/images/16276393842661.png"
                className={style.img3}
                alt="logo"
                style={{ height: "50px", width: "50px" }}
              />
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
      >
        {notifications.map((i: any, idx: number) => (
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
        ))}
      </Popover>
    </>
  );
}
