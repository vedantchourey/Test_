import { Avatar, Card, Divider, Fab, Typography, useTheme } from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';
import { uploadImage } from '../../../services/front-end-services/image-service';
import { useAppDispatch, useAppSelector } from '../../../store/redux-store';
import { avatarBackgroundUrlSelector, avatarUrlSelector, userProfileSelector } from '../../../store/authentication/authentication-selectors';
import styles from './user-profile-card.module.css';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { toLocalDDMMYYYY } from '../../../utils/date-time-utils';
import { setIsLoading } from '../../../store/screen-animations/screen-animation-slice';
import { v4 } from 'uuid';
import { updateProfileImages } from '../../../services/front-end-services/profile-service';
import { setUserProfile } from '../../../store/authentication/authentication-slice';
import { ProfileImageTypes } from '../../../services/backend-services/profile-service/profile-image-types';
import { isDeviceTypeSelector } from '../../../store/layout/layout-selectors';
import { deviceTypes } from '../../../store/layout/device-types';


export default function UserProfileCard() {
  const userProfile = useAppSelector(userProfileSelector);
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const appDispatch = useAppDispatch();
  const isDesktop = useAppSelector(x => isDeviceTypeSelector(x, deviceTypes.desktop));
  const avatarUrl = useAppSelector(avatarUrlSelector);
  const avatarBackgroundUrl = useAppSelector(avatarBackgroundUrlSelector);
  const theme = useTheme();

  function showUploadBackgroundPicker() {
    backgroundInputRef.current?.click();
  }

  function generateFileUrl(type: 'avatar' | 'avatarBackground', file: File) {
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    return `avatars/${type}${userProfile!.id}${v4()}.${fileExt}`;
  }

  async function updateUserProfile(fileUrl: string, file: File, imageType: ProfileImageTypes) {
    const response = await updateProfileImages({url: fileUrl, imageType: imageType});
    if (response.isError) return console.error(response);
    appDispatch(setUserProfile(response));
  }

  async function onUploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length == 0) return;
    const file = event.target.files[0];
    await uploadImageAndLinkToProfile('avatar', file, ProfileImageTypes.avatar);
  }

  async function uploadImageAndLinkToProfile(imageNamePrefix: 'avatar' | 'avatarBackground', file: File, imageType: ProfileImageTypes) {
    appDispatch(setIsLoading(true));
    try {
      const fileUrl = generateFileUrl(imageNamePrefix, file);
      const uploadResult = await uploadImage('resources', fileUrl, file);
      if (uploadResult.error == null) await updateUserProfile(fileUrl, file, imageType);
    } finally {
      appDispatch(setIsLoading(false));
    }
  }

  async function onUploadBackground(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length == 0) return;
    const file = event.target.files[0];
    await uploadImageAndLinkToProfile('avatarBackground', file, ProfileImageTypes.background);
  }

  function showUploadAvatarPicker() {
    avatarInputRef.current?.click();
  }

  const backgroundColor = isDesktop ? theme.palette.background.paper : theme.palette.background.default;
  const backgroundImage = isDesktop ? '' : 'none';

  return (
    <Card sx={{
      maxWidth: 440,
      borderRadius: 0,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: backgroundColor,
      backgroundImage: backgroundImage
    }}>
      <div className={styles.imageBackgroundContainer}>
        <Fab color="primary" aria-label="edit" size="small" className={styles.editBackgroundButton} onClick={showUploadBackgroundPicker}>
          <AddPhotoAlternateOutlinedIcon/>
        </Fab>
        <Fab color="primary" aria-label="edit" size="small" className={styles.editAvatarButton} onClick={showUploadAvatarPicker}>
          <AddPhotoAlternateOutlinedIcon/>
        </Fab>
        <Avatar alt="Remy Sharp"
                sx={{width: 156, height: 156}}
                className={styles.userProfilePic}
                src={avatarUrl || "/images/default-user-profile-background.jpg"}/>
        <div style={{overflow: 'hidden', flexGrow: 1}}>
          <img className={styles.imageBackground}
               src={avatarBackgroundUrl || "/images/default-user-profile-background.jpg"}
               alt="profile background"/>
        </div>
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
      <input type="file" ref={backgroundInputRef} style={{display: 'none'}} onChange={onUploadBackground} accept=".jpeg,.jpg,.png"/>
      <input type="file" ref={avatarInputRef} style={{display: 'none'}} onChange={onUploadAvatar} accept=".jpeg,.jpg,.png"/>
    </Card>
  )
}
