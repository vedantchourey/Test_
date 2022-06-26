import { Avatar, Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { updateAvatar, updateProfileBackground } from '../../../service-clients/image-service-client';
import { useAppDispatch, useAppSelector } from '../../../redux-store/redux-store';
import { avatarBackgroundImageBlobUrlSelector, avatarImageBlobUrlSelector, isLoggedInSelector, userProfileSelector } from '../../../redux-store/authentication/authentication-selectors';
import styles from './user-profile-card.module.css';
import { setIsLoading } from '../../../redux-store/screen-animations/screen-animation-slice';
import { fetchUserProfileThunk, forceFetchAvatarBackgroundImageBlob, forceFetchAvatarImageBlob } from '../../../redux-store/authentication/authentication-slice';
import NoobFilePicker from '../../utils/noob-file-picker';
import { allowedImageExtensions } from '../../../../models/constants';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CollectionsIcon from '@mui/icons-material/Collections';
import FollowersModal from '../../followers-list-modal/followers-list-modal';
import moment from 'moment';

export default function UserProfileCard(): JSX.Element {
  const userProfile = useAppSelector(userProfileSelector);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
  const appDispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const avatarImageBlobUrl = useAppSelector(avatarImageBlobUrlSelector);
  const avatarBackgroundImageBlobUrl = useAppSelector(avatarBackgroundImageBlobUrlSelector);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false)

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

  if (!isLoggedIn) return (<></>);

  const handleOpenFollowersModal = (): void => {
    setOpenFollowersModal(true)
  }
  const handleCloseFollowersModal = (): void => {
    setOpenFollowersModal(false)
  }

  const handleOpenFollowingModal = (): void => {
    setOpenFollowingModal(true)
  }
  const handleCloseFollowingModal = (): void => {
    setOpenFollowingModal(false)
  }


  return (
    <Box className={styles.otherProfileCard}>
      <Box className={styles.background} style={{
        backgroundImage: `linear-gradient(180deg, rgba(64, 64, 64, 0.3), rgba(8, 0, 28, 1)), url(${avatarBackgroundImageBlobUrl} )`
      }}>
        <Box sx={{ textAlign: 'right', position: 'relative' }}>
          <IconButton onClick={showUploadBackgroundPicker} sx={{ padding: '10px' }}>
            <AddPhotoAlternateOutlinedIcon />
          </IconButton>
        </Box>
        <Box className={styles.profileSection}>
          <Box sx={{ position: 'relative' }}>
            <Avatar sx={{ width: 85, height: 85, marginBottom: 2 }} alt="Remy Sharp" src={avatarImageBlobUrl || "/images/default-user-profile-background.jpg"}>
            </Avatar>
            <IconButton className={styles.selectImg} onClick={showUploadAvatarPicker} >
              {/* <img src='icons/gallery.svg' alt='icon' /> */}
              <CollectionsIcon />
            </IconButton>
          </Box>
          <Typography variant='h3' fontSize={18} color='#695B6E' >
            @{userProfile?.username}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} light className={styles.divider} />
      <Box className={styles.bottom}>
        <Box className={styles.detailsContainer} sx={{ width: "100%" }}>
          <Grid container p={2}>
            <Grid item md={5} sx={{ textAlign: 'left' }}>
              <Typography variant='caption' fontSize={12}>
                Team
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Avatar sx={{ mr: 1, width: 35, height: 35 }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <Typography variant='h3' fontSize={14}>
                  Legend Club
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className={styles.verticalDivider} />
            </Grid>
            <Grid item md={5} >
              <Typography variant='caption' fontSize={12}>
                Member since
              </Typography>
              <Typography sx={{ textAlign: 'center', mt: 1 }} variant='h3' fontSize={14}>
                {moment(userProfile?.createdAt).format("DD MMM YYYY")}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 3 }} light className={styles.divider} />
          <Grid container>
            <Grid item md={3} sx={{ textAlign: 'center' }}>
              <Typography variant='caption' fontSize={14}>
                Followers
              </Typography>
              <Typography sx={{ cursor: 'pointer' }} onClick={handleOpenFollowersModal} variant='h3' color='#6931F9' fontSize={16}>
                {userProfile?.totalFollowers || 0}
              </Typography>
            </Grid>
            <Grid item md={1} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div className={styles.verticalDivider} />
            </Grid>
            <Grid item md={4} sx={{ textAlign: 'center' }}>
              <Typography variant='caption' fontSize={14}>
                Following
              </Typography>
              <Typography onClick={handleOpenFollowingModal} sx={{ cursor: 'pointer' }} variant='h3' color='#6931F9' fontSize={16}>
                {userProfile?.totalFollowing || 0}
              </Typography>
            </Grid>
            <Grid item md={1} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div className={styles.verticalDivider} />
            </Grid>
            <Grid item md={3} sx={{ textAlign: 'center' }}>
              <Typography variant='caption' fontSize={14}>
                Posts
              </Typography>
              <Typography variant='h3' color='#6931F9' fontSize={16}>
                {userProfile?.totalPosts || 0}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <NoobFilePicker onFileSelected={onUploadAvatar}
        onError={(error): void => console.error(error)}
        allowedExtensions={allowedImageExtensions}
        show={showAvatarPicker}
        maxFiles={1}
        minFiles={0}
        maxFileSizeInBytes={10000 * 10000}
      />

      <NoobFilePicker onFileSelected={onUploadBackground}
        onError={(error): void => console.error(error)}
        allowedExtensions={allowedImageExtensions}
        show={showBackgroundPicker}
        maxFiles={1}
        minFiles={0}
        maxFileSizeInBytes={10000 * 10000}
      />
      {
        userProfile && (
          <>
            <FollowersModal handleClose={handleCloseFollowersModal} userData={userProfile} showModal={openFollowersModal} listType="followers" />

            <FollowersModal handleClose={handleCloseFollowingModal} userData={userProfile} showModal={openFollowingModal} listType="following" />
          </>
        )
      }
    </Box >
  )
}

