import React, { Fragment, useState } from 'react'
import { Button, Paper, Grid, TextField, Typography, IconButton, Box, CardContent, Card, CardHeader, Avatar } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DoneIcon from '@mui/icons-material/Done';
import styles from './chat.module.css'

export default function TicketChats() {

    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState({
        message: ""
    })

    return (
        <Fragment>

            <Grid item xs={12} my={5}>
                <Box className={styles.paperContainer}>
                    <TextField
                        id="message"
                        placeholder='Type in your message...'
                        variant="standard"
                        value={message}
                        // error={propsHasError(errors, "message")}
                        // helperText={getErrorForProp(errors, "message")}
                        onChange={e => setMessage(e.target.value)}
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

                <Card elevation={5}>
                    <CardContent className={styles.paperContainer}>
                        <Typography variant='h3' align='left'>
                            #2020-8697 - Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Typography>
                        <IconButton color="default" sx={{
                            backgroundColor: "orange",
                            borderRadius: 0
                        }} component="span">
                            <DoneIcon />
                        </IconButton>
                    </CardContent>
                </Card>


                {new Array(4).fill("").map((_, i) => (
                    <Card key={i} color='transparent' variant='elevation'>
                        <CardHeader
                            avatar={
                                <Avatar>
                                    G
                                </Avatar>
                            }
                            action={
                                <Typography variant="body1" color="text.secondary">
                                    04/09/2021, 19:21
                                </Typography>
                            }
                            title="Guy Hawkins"
                        />
                        <CardContent>
                            <Typography align='left' variant="body1" color="text.secondary">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </Typography>
                        </CardContent>
                    </Card>

                ))}
            </Paper>
        </Fragment>
    )
}