import { Card, Divider, Fab, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { downloadImage } from '../../../services/front-end-services/image-service';
import { useAppSelector } from '../../../store/redux-store';
import { userProfileSelector } from '../../../store/authentication/authentication-selectors';
import styles from './user-profile-pic.module.css';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';

export default function UserProfilePic() {

  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const userProfile = useAppSelector(userProfileSelector);

  useEffect(() => {
    (async () => {
      if (userProfile?.avatarUrl == null) return;
      const usersAvatar = await downloadImage('resources', userProfile?.avatarUrl);
      if (usersAvatar.data == null) return;
      const objectURL: string = URL.createObjectURL(usersAvatar.data);
      setImageUrl(objectURL);
    })();
  }, [userProfile]);


  return (
    <Card sx={{maxWidth: 440, borderRadius: 0, display: 'flex', flexDirection: 'column', backgroundColor: '#100626'}}>
      <div className={styles.imageBackgroundContainer}>
        <Fab color="primary" aria-label="edit" className={styles.editBackgroundButton}>
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
            <Typography className={styles.value}>{userProfile?.username}</Typography>
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
    </Card>
  )
}
