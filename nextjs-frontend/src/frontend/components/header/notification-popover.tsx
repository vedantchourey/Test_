import {
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { useAppSelector } from "../../../../src/frontend/redux-store/redux-store";
import { deviceTypes } from "../../../../src/frontend/redux-store/layout/device-types";
import { isDeviceTypeSelector } from "../../../../src/frontend/redux-store/layout/layout-selectors";

interface Message {
  image: string;
  text: string;
}

interface Props {
  message: Message;
  onAccept: () => void;
  onDecline: () => void;
  onNevigation: () => void;
  isActionRequired: boolean;
  type: string;
  data: any;
}

export default function BasicPopover(props: Props): JSX.Element {
  const { message, onAccept, onDecline, onNevigation, type, data } = props;
  const [popVisible, setPopupVisible] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<string>("");
  const router = useRouter();

  const isDesktop = useAppSelector((x) =>
    isDeviceTypeSelector(x, deviceTypes.desktop));

  const toggle = (data: string): void => {
    setImage(data);
    setPopupVisible(!popVisible);
  };

  return (
    <List sx={{ width: "100%", minWidth: 500, bgcolor: "background.paper" }}>
      {/* <Divider variant="middle" component="li" /> */}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            // alt="Travis Howard"
            src={message.image}
            style={{ height: !isDesktop ? 25 : 55, width: !isDesktop ? 25 : 55 }}
          />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <Box ml={1} display={"flex"} flexDirection={"column"}>
              <Typography
                sx={{ display: "inline", fontSize: !isDesktop ? 10 : 15 }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {message.text}
              </Typography>
              {props.isActionRequired ? (
                <Box display={"flex"} flexDirection={"row"} mt={2}>
                  <Button variant="contained" onClick={onAccept} sx={{ mr: 1 }}>
                    <Typography sx={{ fontSize: !isDesktop ? 10 : 15 }}>
                      Accept
                    </Typography>
                  </Button>
                  <Button variant="outlined" onClick={onDecline} sx={{ mr: 1 }}>
                    <Typography sx={{ fontSize: !isDesktop ? 10 : 15 }}>
                      Decline
                    </Typography>
                  </Button>
                  {type === "MATCH_RESULT" && (
                    <Button
                      variant="outlined"
                      onClick={(): any => toggle(data?.screenshot || "")}
                      sx={{ mr: 1 }}
                    >
                      <Typography sx={{ fontSize: !isDesktop ? 10 : 15 }}>
                        View
                      </Typography>
                    </Button>
                  )}
                  {type === "TOURNAMENT_INVITE" && (
                    <Button
                      variant="outlined"
                      onClick={(): any =>
                        router.push(
                          `/view-tournament/${data.tournament_id}/details`
                        )
                      }
                      sx={{ mr: 1 }}
                    >
                      <Typography sx={{ fontSize: !isDesktop ? 10 : 15 }}>
                        View tournament
                      </Typography>
                    </Button>
                  )}

                  {data?.type === "TEAM_INVITATION" && (
                    <Button
                      variant="outlined"
                      onClick={(): any => router.push(data.data.url)}
                      sx={{ mr: 1 }}
                    >
                      <Typography sx={{ fontSize: !isDesktop ? 10 : 15 }}>
                        View Team
                      </Typography>
                    </Button>
                  )}
                </Box>
              ) : (
                <Box display={"flex"} flexDirection={"row"} mt={2}>
                  <Button
                    variant="contained"
                    onClick={(): any => {
                      onNevigation();
                      onAccept();
                    }}
                    sx={{ mr: 1 }}
                  >
                    <Typography sx={{ fontSize: !isDesktop ? 10 : 15 }}>
                      View
                    </Typography>
                  </Button>
                </Box>
              )}
            </Box>
          }
        />
      </ListItem>
      <Divider variant="middle" />

      <Dialog
        open={popVisible}
        onClose={(): void => toggle("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <img height={"70%"} src={image} />
      </Dialog>
    </List>
  );
}
