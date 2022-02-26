import React from "react";
import { Box, Typography, Modal, AppBar, IconButton, Divider, Avatar, Button, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './user-profile-card.module.css';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    width: 500,
    borderRadius: '10px'
};

const FollowersModal = ({ handleClose }): JSX.Element => {
    return (
        <Modal
            open
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <AppBar position="static" className={styles.appBar}>
                    <Box sx={{ textAlign: 'center', position: 'relative' }}>
                        <Typography variant="h3" color='black' fontSize={20}>
                            Followers
                        </Typography>
                        <Box sx={{ position: 'absolute', right: 0, top: '-6px' }}>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </AppBar>
                <Divider />
                <Box sx={{ p: 3 }} className={styles.userListContainer}>
                    {['', '', '', '', '', '', '', '', ''].map((i) => (
                        <Box className={styles.userList} key={i}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ width: 50, height: 50 }} src='https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg' />
                                <Box>
                                    <Typography sx={{ ml: 3 }} variant="h3" color='black' fontSize={16}>
                                        Sandeep Rai
                                    </Typography>
                                    <Typography sx={{ ml: 3, fontWeight: 500 }} variant="caption" color='#B5B5B5'>
                                        @Sandy7531
                                    </Typography>
                                </Box>
                            </Box>
                            <Button className={styles.followBtn} startIcon={<PersonAddAltIcon />} variant='contained'>
                                Follow
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Modal >
    );
};
export default FollowersModal