import { Avatar, Card, Divider, Fab, Typography, useTheme } from '@mui/material';
import { ChangeEvent, useRef } from 'react';
import { updateImage, uploadImage } from '../../../service-clients/image-service-client';
import { useAppDispatch, useAppSelector } from '../../../redux-store/redux-store';
import { avatarBackgroundImageBlobUrlSelector, avatarImageBlobUrlSelector, isLoggedInSelector, userProfileSelector } from '../../../redux-store/authentication/authentication-selectors';
import styles from './user-profile-card.module.css';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { toLocalDDMMYYYY } from '../../../../common/utils/date-time-utils';
import { setIsLoading } from '../../../redux-store/screen-animations/screen-animation-slice';
import { v4 } from 'uuid';
import { updateProfileImages } from '../../../service-clients/profile-service-client';
import { forceFetchAvatarBackgroundImageBlob, forceFetchAvatarImageBlob, setUserProfile } from '../../../redux-store/authentication/authentication-slice';
import { ProfileImageTypes } from '../../../../backend/services/profile-service/profile-image-types';
import { isDeviceTypeSelector } from '../../../redux-store/layout/layout-selectors';
import { deviceTypes } from '../../../redux-store/layout/device-types';


type ImagePrefix = 'avatar' | 'avatarBackground';

export default function UserProfileCard(): JSX.Element {
  const userProfile = useAppSelector(userProfileSelector);
  const backgroundInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const appDispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));
  const avatarImageBlobUrl = useAppSelector(avatarImageBlobUrlSelector);
  const avatarBackgroundImageBlobUrl = useAppSelector(avatarBackgroundImageBlobUrlSelector);
  const theme = useTheme();
  const avatarUrl = userProfile?.avatarUrl;
  const backgroundImageUrl = userProfile?.profileBackgroundImageUrl;

  function showUploadBackgroundPicker(): void {
    backgroundInputRef.current?.click();
  }

  function generateFileUrl(prefix: ImagePrefix, file: File): string {
    if (userProfile == null) throw new Error('user cannot be null');
    if (prefix === 'avatar' && avatarUrl != null) return avatarUrl;
    if (prefix === 'avatarBackground' && backgroundImageUrl != null) return backgroundImageUrl;
    const fileExt = file.name
                        .split('.')
                        .pop()
                        ?.toLowerCase();
    return `avatars/${prefix}${userProfile.id}${v4()}.${fileExt}`;
  }

  async function updateUserProfile(fileUrl: string, file: File, imageType: ProfileImageTypes): Promise<void> {
    const response = await updateProfileImages({url: fileUrl, imageType: imageType});
    if (response.isError) return console.error(response);
    appDispatch(setUserProfile(response));
  }

  async function onUploadAvatar(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    await uploadImageAndLinkToProfile('avatar', file, ProfileImageTypes.avatar);
    appDispatch(forceFetchAvatarImageBlob());
  }

  async function updateOrUploadImage(fileUrl: string, file: File, type: ImagePrefix): Promise<{ data: { Key: string } | null; error: Error | null }> {
    const isUpdatingBackground = type === 'avatarBackground' && backgroundImageUrl != null;
    const isUpdatingAvatar = type === 'avatar' && avatarUrl != null;
    if (isUpdatingBackground || isUpdatingAvatar) {
      return await updateImage('resources', fileUrl, file)
    }
    return await uploadImage('resources', fileUrl, file);
  }

  async function uploadImageAndLinkToProfile(prefix: ImagePrefix, file: File, imageType: ProfileImageTypes): Promise<void> {
    appDispatch(setIsLoading(true));
    try {
      const fileUrl = generateFileUrl(prefix, file);
      const uploadResult = await updateOrUploadImage(fileUrl, file, prefix);
      if (uploadResult.error != null) throw uploadResult.error;
      if (backgroundImageUrl != null && imageType === ProfileImageTypes.background) return;
      if (avatarUrl != null && imageType === ProfileImageTypes.avatar) return;
      await updateUserProfile(fileUrl, file, imageType);
    } finally {
      appDispatch(setIsLoading(false));
    }
  }

  async function onUploadBackground(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    await uploadImageAndLinkToProfile('avatarBackground', file, ProfileImageTypes.background);
    appDispatch(forceFetchAvatarBackgroundImageBlob());
  }

  function showUploadAvatarPicker(): void {
    avatarInputRef.current?.click();
  }

  const backgroundColor = isDesktop ? theme.palette.background.paper : theme.palette.background.default;
  const backgroundImage = isDesktop ? '' : 'none';
  if (!isLoggedIn) return (<></>);
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
          src={avatarImageBlobUrl || "/images/default-user-profile-background.jpg"}/>
        <div style={{overflow: 'hidden', flexGrow: 1}}>
          <img className={styles.imageBackground}
            src={avatarBackgroundImageBlobUrl || "/images/default-user-profile-background.jpg"}
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
