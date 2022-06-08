import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import * as React from "react";

interface Message {
  image: string;
  text: string;
}

interface Props {
  message: Message;
  onAccept: () => void;
  onDecline: () => void;
  isActionRequired: boolean;
}

export default function BasicPopover(props: Props): JSX.Element {
  const { message, onAccept, onDecline } = props;
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      subheader={
        <ListSubheader
          sx={{
            fontStyle: "norma",
            fontSize: "20px",
            fontWeight: 700,
            fontFamily: "Inter",
            color: "#FFFFFF",
          }}
        >
          Notifications
        </ListSubheader>
      }
    >
      <Divider variant="middle" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <img alt="Travis Howard" src={message.image} />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {message.text}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem sx={{ justifyContent: "left" }}>
        <ListItemAvatar />
        {props.isActionRequired && (
          <>
            <Button variant="contained" onClick={onAccept} sx={{ mr: 1 }}>
              Accept
            </Button>
            <Button variant="outlined" onClick={onDecline} sx={{ mr: 1 }}>
              Decline
            </Button>
          </>
        )}
      </ListItem>
      <Divider variant="middle" component="li" />
    </List>
  );
}
