import {
  Box,
  Button,
  Container,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import React, { Fragment } from "react";
import { getAuthHeader } from "../../src/frontend/utils/headers";
import {
  useAppSelector,
} from "../../src/frontend/redux-store/redux-store";
import { isLoggedInSelector } from "../../src/frontend/redux-store/authentication/authentication-selectors";
import "react-alice-carousel/lib/alice-carousel.css";
import NoobPage from "../../src/frontend/components/page/noob-page";
import Heading from "../../src/frontend/components/ui-components/typography/heading";

const Notification = (): JSX.Element => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const [notifications, setNotifications] = React.useState<any>([]);

  const fetchNotifications = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get("/api/notifications", {
        headers: { ...headers },
      })
      .then((res: any) => {
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
      .catch((err: any) => {
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

  return (
    <NoobPage
      title="Notification"
      metaData={{ description: "Noob Storm Notification page" }}
    >
      <Fragment>
        <Container maxWidth="xl">
          <Heading divider heading={"Notification"} />

          {notifications.map(
            (i: any, idx: number) =>
              idx < 10 && (
                <List
                  sx={{
                    width: "100%",
                    minWidth: 500,
                    bgcolor: "background.paper",
                  }}
                >
                  {/* <Divider variant="middle" component="li" /> */}
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <img alt="Travis Howard" src={i.message.image} />
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <Box ml={1} display={"flex"} flexDirection={"column"}>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {i.message.text}
                          </Typography>
                          {i.isActionRequired && (
                            <Box display={"flex"} flexDirection={"row"} mt={2}>
                              <Button
                                variant="contained"
                                onClick={(): void => {
                                  submitNotification(i.id, "ACCEPTED");
                                }}
                                sx={{ mr: 1 }}
                              >
                                Accept
                              </Button>
                              <Button
                                variant="outlined"
                                onClick={(): void => {
                                  submitNotification(i.id, "REJECT");
                                }}
                                sx={{ mr: 1 }}
                              >
                                Decline
                              </Button>
                            </Box>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider variant="middle" component="li" />
                </List>
              )
          )}
        </Container>
      </Fragment>
    </NoobPage>
  );
};

export default Notification;