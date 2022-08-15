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
  Avatar
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
import { INotifications } from "../../src/backend/services/database/models/i-notifications";
import { getUserProfileImage } from "../../src/frontend/service-clients/image-service-client";
import {useRouter} from "next/router";

const Notification = (): JSX.Element => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const [notifications, setNotifications] = React.useState<any>([]);
  const router = useRouter();

  const fetchNotifications = async (): Promise<void> => {
    const headers = await getAuthHeader();
    axios
      .get("/api/notifications", {
        headers: { ...headers },
      })
      .then(async(res: any) => {
        const notificationWithImages = await Promise.all(
          ((res?.data?.data as Array<INotifications>) || []).map((i) =>
            getUserProfileImage(i.sent_by || "", i))
        );
        const notificatiosData =notificationWithImages.map((i: any) => {
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
            (i: any, idx: number) => (
              (
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
                          ) : (
                            <Box display={"flex"} flexDirection={"row"} mt={2}>
                              <Button
                                style={{ marginLeft: "30px" }}
                                variant="contained"
                                onClick={(): void => {
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
              )
            )
          )}
        </Container>
      </Fragment>
    </NoobPage>
  );
};

export default Notification;
