/* eslint-disable indent */
import React, { useState } from 'react'
import { CardActions, IconButton, Card, CardMedia, Typography, Box, Avatar, Backdrop, Modal, Fade, List, ListItem, ListItemButton, ListItemText, Button, Grid } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from './post.module.css'

const PostCard = () => {
    const [values, setValues] = useState({
        user: {
            name: 'ShaigExp',
            avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe1_6-PtcF48iM3PkReAZlBpbSaLDhKNyisg&usqp=CAU'
        },
        media: {
            image: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            video: "https://player.vimeo.com/external/539040662.sd.mp4?s=720645642b1c5b26cd4703fd60bd70ba57e0a2de&profile_id=164&oauth2_token_id=57447761"
        },
        liked: false,
        likesCount: 100,
        comment: 'this is just a comment',
        commentsCount: 30,
        created_at: '2022-02-05T04:52:38.097Z'
    })
    const [showMenu, setShowMenu] = useState(false)

    const handleCloseMenu = () => setShowMenu(false)
    const handleOpenMenu = () => setShowMenu(true)

    const handleToggleLike = () => {
        setValues((pre) => {
            return {
                ...pre,
                likesCount: pre.liked ? --pre.likesCount : ++pre.likesCount,
                liked: !pre.liked
            }
        })
    }

    return (
        <Grid md={8}>
            <Card className={styles.postCard} sx={{ my: 3 }}>
                <Box sx={{
                    display: 'inline-flex',
                    gap: 2,
                    padding: 2
                }}>
                    <Avatar
                        className={styles.postAvatar}
                        alt="Remy Sharp"
                        src={values.user.avatarUrl}
                    />
                    <Box>
                        <Box className={styles.flexRow} sx={{ justifyContent: "space-between", width: '100%' }}>
                            <Box className={styles.flexRow} sx={{ gap: 1 }}>
                                <Typography variant={'h3'}>
                                    {values.user.name}
                                </Typography>
                                <Typography variant="caption" color='text.secondary'>
                                    {new Date(values.created_at).toDateString()}
                                </Typography>
                            </Box>
                            <IconButton onClick={handleOpenMenu}>
                                <MoreVertIcon />
                            </IconButton>
                        </Box>

                        <Typography align='left' paragraph>
                            Last week saw the relaunch of the Trials of Osiris in Destiny Season of the Lost, which has been drastically improved by Bungie recent changes to how it works.
                        </Typography>
                    </Box>
                </Box>

                <CardMedia
                    component="img"
                    className={styles.postImage}
                    image={values.media.image}
                    alt="user avatar"
                    key={'as'}
                />

                <CardActions sx={{ gap: 3 }}>
                    <Box className={styles.flexRow}>
                        <Button variant='text' color={values.liked ? 'primary' : 'inherit'} startIcon={<FavoriteBorderIcon />} onClick={handleToggleLike}>
                            {values.likesCount}
                        </Button>
                    </Box>
                    <Box className={styles.flexRow}>
                        <Button variant='text' color='inherit' startIcon={<ChatBubbleOutlineIcon />}>
                            {values.commentsCount}
                        </Button>
                    </Box>
                    <Box className={styles.flexRow}>
                        <IconButton size="small">
                            <ShareIcon />
                        </IconButton>
                    </Box>
                </CardActions>

                <Modal
                    open={showMenu}
                    onClose={handleCloseMenu}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                >
                    <Fade in={showMenu}>
                        <List className={styles.postCardOptionsContainer}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primaryTypographyProps={{
                                        color: 'error.main'
                                    }} primary="Report" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Share" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemText primary="Unfollow" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={handleCloseMenu}>
                                    <ListItemText primary="Hide" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Fade>
                </Modal>
            </Card>
        </Grid>
    )
}

export default PostCard