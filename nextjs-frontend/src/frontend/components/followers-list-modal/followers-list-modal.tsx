import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, AppBar, IconButton, Divider, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './followers-list-modal.module.css';
import { fetchUserFollowerList } from '../../service-clients/profile-service-client';
import { IOthersProfileResponse } from "../../service-clients/messages/i-profile";
import { IFollowersList } from '../../service-clients/messages/i-followers-list-response';
import { useRouter } from "next/router";

interface IProps {
  userData: IOthersProfileResponse,
  handleClose: () => void;
  showModal: boolean;
}


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

const FollowersModal = ({ handleClose, userData, showModal }: IProps): JSX.Element => {
  const [list, setList] = useState<IFollowersList[]>([]);
  const router = useRouter()

  useEffect(() => {
    (async (): Promise<void> => {
      const result = await fetchUserFollowerList(userData.id);
      setList(result);
    })()
  }, [])


  return (
    <Modal
      open={showModal}
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
          {list.map((data, i) => (
            <Box className={styles.userList} key={i}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 50, height: 50 }}>
                  {
                    data.follower.firstName.split('')[0].toUpperCase()
                  }
                </Avatar>
                <Box sx={{ cursor: 'pointer' }} onClick={(): unknown => router.push(`/account/${data.follower.username}`)}>
                  <Typography sx={{ ml: 3 }} variant="h3" color='black' fontSize={16}>
                    {data.follower.firstName} {data.follower.lastName}
                  </Typography>
                  <Typography sx={{ ml: 3, fontWeight: 500 }} variant="caption" color='#B5B5B5'>
                    {data.follower.username}
                  </Typography>
                </Box>
              </Box>
              {/* <Button className={styles.followBtn} startIcon={<PersonAddAltIcon />} variant='contained'>
                Follow
              </Button> */}
            </Box>
          ))}
        </Box>
      </Box>
    </Modal >
  );
};
export default FollowersModal