import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, AppBar, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './followers-list-modal.module.css';
import { fetchUserFollowerList, fetchUserFollowingList } from '../../service-clients/profile-service-client';
import { IOthersProfileResponse, IProfileResponse } from "../../service-clients/messages/i-profile";
import { IFollowersList } from '../../service-clients/messages/i-followers-list-response';
import Followersmodal from "./followers-modal";
import { isDeviceTypeSelector } from "../../../../src/frontend/redux-store/layout/layout-selectors";
import { deviceTypes } from '../../../../src/frontend/redux-store/layout/device-types';
import { useAppSelector } from "../../redux-store/redux-store";

interface IProps {
  userList?: IFollowersList[],
  userData?: IOthersProfileResponse | IProfileResponse,
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
  borderRadius: '10px',
};

const mobileStyle = {
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  backgroundColor: "#08001C",
  width: "75%",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const FollowersModal = ({ handleClose, userData, showModal, listType, userList }: IProps): JSX.Element => {
  const [list, setList] = useState<IFollowersList[]>([]);
  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));

  useEffect(() => {
    if (userList) setList(userList);
  }, [userList]);

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={!isDesktop ? mobileStyle : style}>
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