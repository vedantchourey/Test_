import { Avatar, Box, Card, Divider, Fab, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { updateAvatar, updateProfileBackground } from '../../../service-clients/image-service-client';
import { useAppDispatch, useAppSelector } from '../../../redux-store/redux-store';
import { avatarImageBlobUrlSelector, isLoggedInSelector, userProfileSelector } from '../../../redux-store/authentication/authentication-selectors';
import styles from './user-profile-card.module.css';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { toLocalDDMMYYYY } from '../../../../common/utils/date-time-utils';
import { setIsLoading } from '../../../redux-store/screen-animations/screen-animation-slice';
import { fetchUserProfileThunk, forceFetchAvatarBackgroundImageBlob, forceFetchAvatarImageBlob } from '../../../redux-store/authentication/authentication-slice';
import { isDeviceTypeSelector } from '../../../redux-store/layout/layout-selectors';
import { deviceTypes } from '../../../redux-store/layout/device-types';
import NoobFilePicker from '../../utils/noob-file-picker';
import { allowedImageExtensions } from '../../../../models/constants';


export default function UserProfileCard(): JSX.Element {
  const userProfile = useAppSelector(userProfileSelector);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
  const appDispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const isDesktop = useAppSelector((x) => isDeviceTypeSelector(x, deviceTypes.desktop));
  const avatarImageBlobUrl = useAppSelector(avatarImageBlobUrlSelector);
  const theme = useTheme();

  async function onUploadAvatar(files: FileList | null): Promise<void> {
    setShowAvatarPicker(false);
    if (files == null || files.length === 0) return;
    try {
      appDispatch(setIsLoading(true));
      await updateAvatar(files[0])
      appDispatch(fetchUserProfileThunk());
      appDispatch(forceFetchAvatarImageBlob());
    } finally {
      appDispatch(setIsLoading(false));
    }
  }

  async function onUploadBackground(files: FileList | null): Promise<void> {
    setShowBackgroundPicker(false);
    if (files == null || files.length === 0) return;
    try {
      appDispatch(setIsLoading(true));
      await updateProfileBackground(files[0])
      appDispatch(fetchUserProfileThunk());
      appDispatch(forceFetchAvatarBackgroundImageBlob());
    } finally {
      appDispatch(setIsLoading(false));
    }
  }

  const showUploadAvatarPicker = (): void => setShowAvatarPicker(true);
  const showUploadBackgroundPicker = (): void => setShowBackgroundPicker(true);

  const backgroundColor = isDesktop ? theme.palette.background.paper : theme.palette.background.default;
  const backgroundImage = isDesktop ? '' : 'none';
  if (!isLoggedIn) return (<></>);
  return (
    <Card sx={{
      maxWidth: 440,
      borderRadius: 4,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: backgroundColor,
      backgroundImage: backgroundImage,
      margin: 'auto',
    }}>
      <div className={styles.imageBackgroundContainer} style={{
        backgroundImage: `linear-gradient(180deg, rgba(64, 64, 64, 0.3), rgba(8, 0, 28, 1)), url('https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg')`
      }}>
        <Fab color="primary" aria-label="edit" size="small" className={styles.editBackgroundButton} onClick={showUploadBackgroundPicker}>
          <AddPhotoAlternateOutlinedIcon />
        </Fab>

        <Box sx={{ position: 'relative', width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar sx={{ width: 85, height: 85, marginBottom: 2 }} alt="Remy Sharp"
              src={avatarImageBlobUrl || "/images/default-user-profile-background.jpg"} />
            <Fab className={styles.editAvatarButton} color="primary" aria-label="edit" size="small" onClick={showUploadAvatarPicker}>
              <AddPhotoAlternateOutlinedIcon />
            </Fab>
          </Box>
        </Box>

        {/* <div style={{ overflow: 'hidden', flexGrow: 1, zIndex: 1 }}>
          <ReduxCachedBlobImage blobSelector={avatarBackgroundImageBlobUrlSelector}
            defaultImage="/images/default-user-profile-background.jpg"
            layout="fill"
            alt="profile background"
          />
        </div> */}
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
        <Divider className={styles.userDetailsRow} />
        <div className={styles.userDetailsRow}>
          <div className={styles.userDetailKey}>
            <Typography className={styles.heading}>Elo Rating</Typography>
          </div>
          <div className={styles.userDetailValue}>
            <Typography className={styles.value}>{userProfile?.username}</Typography>
          </div>
        </div>
        <Divider className={styles.userDetailsRow} />
        <div className={styles.userDetailsRow}>
          <div className={styles.userDetailKey}>
            <Typography className={styles.heading}>Team</Typography>
          </div>
          <div className={styles.userDetailValue}>
            <Typography className={styles.value}>{userProfile?.username}</Typography>
          </div>
        </div>
        <Divider className={styles.userDetailsRow} />
        <div className={styles.userDetailsRow}>
          <div className={styles.userDetailKey}>
            <Typography className={styles.heading}>Joined</Typography>
          </div>
          <div className={styles.userDetailValue}>
            <Typography className={styles.value}>{toLocalDDMMYYYY(userProfile?.createdAt)}</Typography>
          </div>
        </div>
        <Divider className={styles.userDetailsRow} />
        <div className={styles.userDetailsRow}>
          <div className={styles.userDetailKey}>
            <Typography className={styles.heading}>Tournament Wins</Typography>
          </div>
          <div className={styles.userDetailValue}>
            <Typography className={styles.value}>{userProfile?.username}</Typography>
          </div>
        </div>
      </div>
      <NoobFilePicker onFileSelected={onUploadBackground}
        onError={(error): void => console.error(error)}
        allowedExtensions={allowedImageExtensions}
        show={showBackgroundPicker}
        maxFiles={1}
        minFiles={0}
        maxFileSizeInBytes={1024 * 1204}
      />
      <NoobFilePicker onFileSelected={onUploadAvatar}
        onError={(error): void => console.error(error)}
        allowedExtensions={allowedImageExtensions}
        show={showAvatarPicker}
        maxFiles={1}
        minFiles={0}
        maxFileSizeInBytes={1024 * 1204}
      />
    </Card>
  )
}
