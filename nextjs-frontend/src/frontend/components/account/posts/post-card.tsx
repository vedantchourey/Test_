/* eslint-disable indent */
import React, { useState } from 'react'
import { CardActions, IconButton, Card, CardMedia, Typography, Box, Avatar, Backdrop, Modal, Fade, List, ListItem, ListItemButton, ListItemText, Button, Grid, Divider } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from './post.module.css';
import { IPostsResponse } from "../../../service-clients/messages/i-posts-response";
import config from '../../../utils/config/front-end-config';

interface IProps {
    data : IPostsResponse
}

const PostIconStyles = {
    color: 'rgba(255,255,255,0.4)'
}

const {getObjectUrl} = config.supabase.storage;

const PostCard = (props:IProps): JSX.Element => {
    const [values,setValues] = useState<IPostsResponse>(props.data);
    const [showMenu, setShowMenu] = useState(false)

    const handleCloseMenu = (): void => setShowMenu(false)
    const handleOpenMenu = (): void => setShowMenu(true)

    const handleToggleLike = (): void => {
        setValues({...values, isLiked : true})
    }

    return (
        <Grid item md={8}>
            <Card className={styles.postCard} sx={{ my: 3 }} elevation={0}>
                <Box sx={{
                    display: 'inline-flex',
                    gap: 2,
                    padding: 2
                }}>
                    <Avatar
                        alt="avatar"
                        src={getObjectUrl(values.postOwner.avatarUrl)}
                    />
                    <Box>
                        <Box className={styles.flexRow} sx={{ justifyContent: "space-between", width: '100%' }}>
                            <Typography variant={'h3'} fontSize={15}>
                                {values.postOwner.firstName + ' ' + values.postOwner.lastName }
                                <Typography variant="caption" color='text.secondary' sx={{ ml: 1 }}>
                                    {new Date(values.createdAt).toDateString()}
                                </Typography>
                            </Typography>

                            <IconButton onClick={handleOpenMenu} size={'small'}>
                                <MoreVertIcon />
                            </IconButton>
                        </Box>

                        <Typography align='left' fontSize={14} fontWeight={100} paragraph>
                            {values.postContent}
                        </Typography>
                    </Box>
                </Box>

                <CardMedia
                    component="img"
                    className={styles.postImage}
                    image={getObjectUrl(values.postImgUrl)}
                    alt="user avatar"
                    key={'as'}
                />

                <CardActions sx={{ gap: 3 }}>
                    <Box className={styles.flexRow}>
                        <Button variant='text' startIcon={<FavoriteBorderIcon />} onClick={handleToggleLike} sx={PostIconStyles}>
                            {'values.likesCount'}
                        </Button>
                    </Box>
                    <Box className={styles.flexRow}>
                        <Button variant='text' color='inherit' startIcon={<ChatBubbleOutlineIcon />} sx={PostIconStyles}>
                            {'values.commentsCount'}
                        </Button>
                    </Box>
                    <Box className={styles.flexRow}>
                        <IconButton size="small" sx={PostIconStyles}>
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
            <Box my={4}>
                <Divider light />
            </Box>
        </Grid>
    )
}

export default PostCard