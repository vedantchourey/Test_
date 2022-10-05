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
  Avatar,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { Fragment } from "react";
import { getAuthHeader } from "../../src/frontend/utils/headers";
import { useAppSelector } from "../../src/frontend/redux-store/redux-store";
import {
  isLoggedInSelector,
  userProfileSelector,
} from "../../src/frontend/redux-store/authentication/authentication-selectors";
import "react-alice-carousel/lib/alice-carousel.css";
import NoobPage from "../../src/frontend/components/page/noob-page";
import Heading from "../../src/frontend/components/ui-components/typography/heading";
import { INotifications } from "../../src/backend/services/database/models/i-notifications";
import { getUserProfileImage } from "../../src/frontend/service-clients/image-service-client";
import { useRouter } from "next/router";
import { frontendSupabase } from "../../src/frontend/services/supabase-frontend-service";

const Notification = (): JSX.Element => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const [notifications, setNotifications] = React.useState<any>([]);
  const router = useRouter();
  const [notificationPayload, setNotificationPayload] = React.useState<any>();
  const [gameIdModal, setGameIdModal] = React.useState(false);
  const [gameId, setGameId] = React.useState("");
  const [popVisible, setPopupVisible] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<string>("");

  const user = useAppSelector(userProfileSelector);

  const toggle = (data: string): void => {
    setImage(data);
    setPopupVisible(!popVisible);
  };

  const fetchNotifications = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get("/api/notifications", {
        headers: { ...headers },
      })
      .then(async (res: any) => {
        const notificationWithImages = await Promise.all(
          ((res?.data?.data as Array<INotifications>) || []).map((i) =>
            getUserProfileImage(i.sent_by || "", i))
        );
        const notificatiosData = notificationWithImages.map((i: any) => {
          return {
            id: i.id,
            publicURL: i.publicURL,
            message: {
              image: i.publicURL,
              text: i.message,
            },
            data: i,
            isActionRequired: i.is_action_required,
            redirect: i?.data?.redirect,
            username: i?.username,
          };
        });
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
        { id, response, gameUniqueId: gameId },
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
    if(isLoggedIn){
      fetchNotifications();
    }
    const messageListener = frontendSupabase
      .from("notifications")
      .on("*", async (payload) => {
        if (payload.new.user_id === user?.id && isLoggedIn) {
          fetchNotifications();
        }
        if (!isLoggedIn) {
          setNotifications([]);
        }
      })
      .subscribe();
    return () => {
      messageListener.unsubscribe();
    };
  }, [isLoggedIn]);

  return (
    <NoobPage
      title="Notification"
      metaData={{ description: "Noob Storm Notification page" }}
    >
      <Fragment>
        <Container maxWidth="xl">
          <Heading divider heading={"Notification"} />
          {notifications.map((i: any, idx: number) => (
            <List
              sx={{
                width: "100%",
                minWidth: 500,
                bgcolor: "background.paper",
              }}
              key={idx}
            >
              {/* <Divider variant="middle" component="li" /> */}
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Travis Howard"
                    src={i.message.image}
                    style={{ height: 55, width: 55 }}
                  />
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
                      {i.isActionRequired ? (
                        <Box display={"flex"} flexDirection={"row"} mt={2}>
                          <Button
                            variant="contained"
                            onClick={(): void => {
                              if (i.data.type === "TOURNAMENT_INVITE") {
                                setGameId("");
                                setGameIdModal(true);
                                setNotificationPayload(i.id);
                              } else {
                                submitNotification(i.id, "ACCEPTED");
                              }
                            }}
                            sx={{ mr: 1 }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={(): void => {
                              submitNotification(i.id, "REJECTED");
                            }}
                            sx={{ mr: 1 }}
                          >
                            Decline
                          </Button>
                          {i.data.type === "MATCH_RESULT" && (
                            <Button
                              variant="outlined"
                              onClick={(): any =>
                                toggle(i.data.data?.screenshot || "")
                              }
                              sx={{ mr: 1 }}
                            >
                              View
                            </Button>
                          )}
                          {i.data.type === "TOURNAMENT_INVITE" && (
                            <Button
                              variant="outlined"
                              onClick={(): any =>
                                router.push(
                                  `/view-tournament/${i.data.data.tournament_id}/details`
                                )
                              }
                              sx={{ mr: 1 }}
                            >
                              View tournament
                            </Button>
                          )}

                          {i.data.type === "TEAM_INVITATION" && (
                            <Button
                              variant="outlined"
                              onClick={(): any => router.push(i.data.data.url)}
                              sx={{ mr: 1 }}
                            >
                              View Team
                            </Button>
                          )}
                        </Box>
                      ) : (
                        <Box display={"flex"} flexDirection={"row"} mt={2}>
                          <Button
                            style={{ marginLeft: "30px" }}
                            variant="contained"
                            onClick={(): void => {
                              submitNotification(i.id, "ACCEPTED");
                              i.redirect
                                ? router.push(i.redirect)
                                : router.push(`/account/${i.username}`);
                            }}
                            sx={{ mr: 1 }}
                          >
                            View
                          </Button>
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
              <Divider variant="middle" component="li" />
            </List>
          ))}
        </Container>
        <Dialog open={gameIdModal}>
          <DialogContent>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography mb={2}>
                Please enter your Account ID (PSN/XBOX/PC/Mobile) associated
                with relevant game/tournament
              </Typography>
              <TextField
                label={"Enter your game id"}
                size={"small"}
                value={gameId}
                onChange={(e): any => setGameId(e.target.value)}
              />
              <Box display={"flex"} justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={(): any =>
                    submitNotification(notificationPayload, "ACCEPTED")
                  }
                >
                  Join
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
        <Dialog
          open={popVisible}
          onClose={(): void => toggle("")}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <img height={"70%"} src={image} />
        </Dialog>
      </Fragment>
    </NoobPage>
  );
};

export default Notification;
