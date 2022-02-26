import { Dialog } from '@mui/material';
import { useState, useEffect } from 'react';
import { fetchUserFollowerList } from '../../../service-clients/profile-service-client';
import { IOthersProfileResponse } from "../../../service-clients/messages/i-profile";

interface IProps {
  userData: IOthersProfileResponse
}

const FollowersListModal = (props: IProps): JSX.Element => {
  const [isModalOpen] = useState<boolean>(false);

  useEffect(() => {
    (async (): Promise<void> => {
      await fetchUserFollowerList(props.userData.id);
    })()
  }, [])

  return (
    <Dialog
      open={isModalOpen}
    >
      <h1>Modal</h1>
    </Dialog >
  )
}

export default FollowersListModal;