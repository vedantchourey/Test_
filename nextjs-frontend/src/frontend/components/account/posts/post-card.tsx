import React, { useRef, useState } from 'react'
import { CardActions, IconButton, Card, CardMedia, Typography, Box, Avatar, Backdrop, Modal, Fade, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Slider from '../../ui-components/swiper'
import styles from './post.module.css'

interface Props {

}

const PostCard = ({ }: Props) => {

    const [showMenu, setShowMenu] = useState(false)
    const [likePost, setLikePost] = useState(false);
    const menuRef = useRef()

    const handleCloseMenu = () => setShowMenu(false)
    const handleOpenMenu = () => setShowMenu(true)

    const handleToggleLike = () => setLikePost(pre => !pre)

    return (
        <Card className={styles.postCard} sx={{ my: 3 }}>
            <Box sx={{
                display: 'inline-flex',
                gap: 2,
                padding: 2
            }}>
                <Avatar
                    className={styles.postAvatar}
                    alt="Remy Sharp"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe1_6-PtcF48iM3PkReAZlBpbSaLDhKNyisg&usqp=CAU"
                />
                <Box>
                    <Box className={styles.flexRow} sx={{ justifyContent: "space-between", width: '100%' }}>
                        <Box className={styles.flexRow} sx={{ gap: 1 }}>
                            <Typography variant={'h3'}>
                                ShaigExp
                            </Typography>
                            <Typography variant="caption" color='text.secondary'>
                                3m
                            </Typography>
                        </Box>
                        <IconButton onClick={handleOpenMenu}>
                            <MoreVertIcon />
                        </IconButton>
                    </Box>

                    <Typography align='left' paragraph>
                        Last week saw the relaunch of the Trials of Osiris in Destiny 2's Season of the Lost, which has been drastically improved by Bungie's recent changes to how it works.
                    </Typography>
                </Box>
            </Box>

            <Slider
                slides={[
                    <CardMedia
                        component="img"
                        className={styles.postImage}
                        image="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt="user avatar"
                    />,
                    <video className={styles.postVideo} autoPlay controls>
                        <source src="https://player.vimeo.com/external/539040662.sd.mp4?s=720645642b1c5b26cd4703fd60bd70ba57e0a2de&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ]}
            />

            <CardActions sx={{ gap: 3 }}>
                <Box className={styles.flexRow}>
                    <Button variant='text' color='inherit' startIcon={likePost ? <FavoriteIcon /> : <FavoriteBorderIcon />} onClick={handleToggleLike}>
                        30
                    </Button>
                </Box>
                <Box className={styles.flexRow}>
                    <Button variant='text' color='inherit' startIcon={<ChatBubbleOutlineIcon />}>
                        100
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
                    <List sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        p: 0,
                        bgcolor: 'white',
                        border: '2px solid #000',
                        boxShadow: 24,
                        borderRadius: '30px'
                    }}>
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
    )
}

export default PostCard