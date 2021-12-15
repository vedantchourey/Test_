import { Card, Divider, Fab, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { downloadImage, uploadImage } from '../../../services/front-end-services/image-service';
import { useAppDispatch, useAppSelector } from '../../../store/redux-store';
import { userProfileSelector } from '../../../store/authentication/authentication-selectors';
import styles from './user-profile-pic.module.css';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { toLocalDDMMYYYY } from '../../../utils/date-time-utils';
import { setIsLoading } from '../../../store/screen-animations/screen-animation-slice';
import { v4 } from 'uuid';

export default function UserProfilePic() {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const userProfile = useAppSelector(userProfileSelector);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (userProfile?.avatarUrl == null) return;
      const usersAvatar = await downloadImage('resources', userProfile?.avatarUrl);
      if (usersAvatar.data == null) return;
      const objectURL: string = URL.createObjectURL(usersAvatar.data);
      setImageUrl(objectURL);
    })();
  }, [userProfile]);

  function showUploadBackgroundPicker() {
    fileInputRef.current?.click();
  }

  function generateFileName(file: File) {
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    return `${userProfile!.id}${v4()}.${fileExt}`;
  }

  async function onUploadBackground(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length == 0) return;
    appDispatch(setIsLoading(true));
    try {
      const file = event.target.files[0];
      const fileName = generateFileName(file);
      const uploadResult = await uploadImage('resources', `avatars/${fileName}`, file);
    } finally {
      appDispatch(setIsLoading(false));
    }
  }

  return (
    <Card sx={{maxWidth: 440, borderRadius: 0, display: 'flex', flexDirection: 'column', backgroundColor: '#100626'}}>
      <div className={styles.imageBackgroundContainer}>
        <Fab color="primary" aria-label="edit" className={styles.editBackgroundButton} onClick={showUploadBackgroundPicker}>
          <AddPhotoAlternateOutlinedIcon/>
        </Fab>
        {imageUrl || <img className={styles.imageBackground} src="/images/default-user-profile-background.jpg" alt="profile background"/>}
      </div>
      <div className={styles.userDetailsContainer}>
        <div className={styles.userDetailsRow}>
          <div className={styles.userDetailKey}>
            <Typography className={styles.heading}>Username</Typography>
          </div>
          <div className={styles.userDetailValue}>
            <Typography className={styles.value}>{userProfile?.username}</Typography>
          </div>
        </div>
        <Divider className={styles.userDetailsRow}/>
        <div className={styles.userDetailsRow}>
          <div className={styles.userDetailKey}>
            <Typography className={styles.heading}>Elo Rating</Typography>
          </div>
          <div className={styles.userDetailValue}>
            <Typography className={styles.value}>{userProfile?.username}</Typography>
          </div>
        </div>
        <Divider className={styles.userDetailsRow}/>
        <div className={styles.userDetailsRow}>
          <div className={styles.userDetailKey}>
            <Typography className={styles.heading}>Team</Typography>
          </div>
          <div className={styles.userDetailValue}>
            <Typography className={styles.value}>{userProfile?.username}</Typography>
          </div>
        </div>
        <Divider className={styles.userDetailsRow}/>
        <div className={styles.userDetailsRow}>
          <div className={styles.userDetailKey}>
            <Typography className={styles.heading}>Joined</Typography>
          </div>
          <div className={styles.userDetailValue}>
            <Typography className={styles.value}>{toLocalDDMMYYYY(userProfile?.createdAt)}</Typography>
          </div>
        </div>
        <Divider className={styles.userDetailsRow}/>
        <div className={styles.userDetailsRow}>
          <div className={styles.userDetailKey}>
            <Typography className={styles.heading}>Tournament Wins</Typography>
          </div>
          <div className={styles.userDetailValue}>
            <Typography className={styles.value}>{userProfile?.username}</Typography>
          </div>
        </div>
      </div>
      <input type="file" ref={fileInputRef} style={{display: 'none'}} onChange={onUploadBackground} accept=".jpeg,.jpg,.png"/>
    </Card>
  )
}
