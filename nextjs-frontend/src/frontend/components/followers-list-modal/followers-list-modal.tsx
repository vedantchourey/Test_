import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, AppBar, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './followers-list-modal.module.css';
import { fetchUserFollowerList, fetchUserFollowingList } from '../../service-clients/profile-service-client';
import { IOthersProfileResponse, IProfileResponse } from "../../service-clients/messages/i-profile";
import { IFollowersList } from '../../service-clients/messages/i-followers-list-response';
import Followersmodal from "./followers-modal";

interface IProps {
  userData: IOthersProfileResponse | IProfileResponse,
  handleClose: () => void;
  showModal: boolean;
  listType: 'followers' | 'following'
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#08001c',
  boxShadow: 24,
  width: 500,
  borderRadius: '10px'
};

const FollowersModal = ({ handleClose, userData, showModal, listType }: IProps): JSX.Element => {
  const [list, setList] = useState<IFollowersList[]>([]);

  useEffect(() => {
    (async (): Promise<void> => {
      const result = listType === 'followers' ? await fetchUserFollowerList(userData.id) : await fetchUserFollowingList(userData.id);
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
            <Typography variant="h3" color='white' fontSize={20}>
              {
                listType === 'followers' ? 'Followers' : 'Following'
              }
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
          {list.length ? list.map((data, i) => (
            <Followersmodal username={data.follower.username} key={i}/>
          )) : (
            <Box>
              <Typography>
                {
                  listType === 'followers' ? 'No Followers' : 'No Followings'
                }
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Modal >
  );
};
export default FollowersModal