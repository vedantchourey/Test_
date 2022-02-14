import React, { Fragment, useState } from 'react'
import { Button, Paper, Grid, TextField, Typography, IconButton, Box, CardContent, Card, Avatar } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DoneIcon from '@mui/icons-material/Done';
import styles from './chat.module.css'

interface Chat {
  profileImage: string,
  comment: string,
  userName: string,
  created_at: string,
}

interface Props {
  ticketNumber: string;
  ticketSubject: string;
  chats: Chat[];
}

export default function TicketChats({ ticketNumber, ticketSubject, chats }: Props): JSX.Element {
  const [message, setMessage] = useState("")
  // const [errors, setErrors] = useState({
  //   message: ""
  // })

  return (
    <Fragment>

      <Grid item xs={12} my={5}>
        <Box className={styles.paperContainer} p={1}>
          <TextField
            id="message"
            placeholder='Type in your message...'
            variant="standard"
            value={message}
            // error={propsHasError(errors, "message")}
            // helperText={getErrorForProp(errors, "message")}
            onChange={(e): void => setMessage(e.target.value)}
            fullWidth
            InputProps={{ disableUnderline: true }}
            inputProps={{
              style: {
                padding: 12,
              }
            }}
          />
          <IconButton color="default" component="span">
            <AttachmentIcon />
          </IconButton>

          <Button variant="contained">
            Send
          </Button>
        </Box>
      </Grid>

      <Paper elevation={5} className={styles.paperContainer} sx={{ flexDirection: 'column' }} square>

        <Card elevation={0} sx={{ width: "100%" }}>
          <CardContent className={styles.paperContainer}>
            <Typography variant='h3' align='left'>
              #{ticketNumber} - {ticketSubject}
            </Typography >
            <IconButton color="default" sx={{
              backgroundColor: "orange",
              borderRadius: 0
            }} component="span">
              <DoneIcon />
            </IconButton>
          </CardContent >


          {
            chats.map((_, i) => (
              <Fragment key={i}>
                <CardContent className={styles.paperContainer} style={{ borderTop: '1px solid #FFFFFF1A' }}>
                  <Box className={styles.paperContainer}>
                    <Avatar alt='user profile image' />
                    <Typography align='left' ml={2} variant="h3" color="default">
                      {_.userName}
                    </Typography>
                  </Box>
                  <Typography align='left' variant="body1" color="text.secondary">
                    {_.created_at}
                  </Typography>
                </CardContent>
                <CardContent className={styles.paperContainer}>
                  <Typography align='left' variant="body1" color="text.secondary">
                    {_.comment}
                  </Typography>
                </CardContent>
              </Fragment>
            ))
          }
        </Card >
      </Paper >
    </Fragment >
  )
}
