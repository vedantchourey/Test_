import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
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
    >
      {/* <Divider variant="middle" component="li" /> */}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <img alt="Travis Howard" src={message.image} />
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
                {message.text}
              </Typography>
              {props.isActionRequired && (
          <Box display={"flex"} flexDirection={"row"} mt={2}>
            <Button variant="contained" onClick={onAccept} sx={{ mr: 1 }}>
              Accept
            </Button>
            <Button variant="outlined" onClick={onDecline} sx={{ mr: 1 }}>
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
  );
}
