import React, { useState } from 'react';
import { Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, Typography } from '@mui/material';
import { CheckOutlined } from '@mui/icons-material'
import styles from './other-profile-card.module.css'
import CollectionsIcon from '@mui/icons-material/Collections';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { IOthersProfileResponse } from "../../../service-clients/messages/i-profile";
import { followUser, unFollowUser } from '../../../service-clients/follow-service';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { blockUser, unBlockUser } from '../../../service-clients/block-service';
import frontendConfig from '../../../utils/config/front-end-config';
import FollowersModal from '../../followers-list-modal/followers-list-modal';

const OtherProfileCard = (props: { userData: IOthersProfileResponse }): JSX.Element => {
  const [userData, setUserData] = useState(props.userData)
  const [showMenu, setShowMenu] = useState(false);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false);

  const {
    totalFollowers,
    totalPosts,
    totalFollowing,
    isFollowing
  } = userData;

  const followAction = (): void => {
    if (!isFollowing) {
      followUser(userData.id);
      setUserData((prev) => {
        return {
          ...prev,
          isFollowing: true,
          totalFollowers: totalFollowers + 1
        }
      })
      // eslint-disable-next-line no-useless-return
      return;
    }
    unFollowUser(userData.id);
    setUserData((prev) => {
      return {
        ...prev,
        isFollowing: false,
        totalFollowers: totalFollowers - 1
      }
    })

  }
  const handleCloseMenu = (): void => setShowMenu(false);
  const handleToggleMenu = (): void => setShowMenu((pre) => !pre)

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

  async function block(): Promise<void> {
    setUserData((pre) => {
      return {
        ...pre,
        isBlocked: true
      }
    })
    await blockUser(userData.id);
    handleCloseMenu()
  }
  async function unBlock(): Promise<void> {
    setUserData((pre) => {
      return {
        ...pre,
        isBlocked: false
      }
    })
    await unBlockUser(userData.id);
    handleCloseMenu()
  }


  return (
    <Box className={styles.otherProfileCard}>
      <Box className={styles.background} style={{
        backgroundImage: `linear-gradient(180deg, rgba(64, 64, 64, 0.3), rgba(8, 0, 28, 1)), url(${frontendConfig.storage.publicBucketUrl}/${frontendConfig.storage.publicBucket}/${userData.avatarUrl})`
      }}>
        <Box sx={{ textAlign: 'right', position: 'relative' }}>
          <IconButton sx={{ padding: '10px' }} onClick={handleToggleMenu} >
            <MoreVertIcon />
          </IconButton>
          {showMenu && (
            <List className={styles.optionsContainer}>
              {userData.isBlocked ?
                <ListItem disablePadding>
                  <Button
                    fullWidth
                    onClick={(): unknown => unBlock()}
                    className={styles.optionsBtn}
                    sx={{ color: 'red' }}
                  >
                    Unblock
                  </Button>
                </ListItem>
                :
                <ListItem disablePadding>
                  <Button
                    fullWidth
                    className={styles.optionsBtn}
                    sx={{ color: 'red' }}
                    onClick={(): unknown => block()}
                  >
                    <img src='/icons/error.svg' alt='icon' />
                    Block
                  </Button>
                </ListItem>
              }
            </List>
          )}
        </Box>
        <Box className={styles.profileSection}>
          <Box sx={{ position: 'relative' }}>
            <Avatar sx={{ width: 85, height: 85, marginBottom: 2 }} src={`${frontendConfig.storage.publicBucketUrl}/${frontendConfig.storage.publicBucket}/${userData.avatarUrl}`}>
            </Avatar>
            <IconButton className={styles.selectImg} >
              {/* <img src='icons/gallery.svg' alt='icon' /> */}
              <CollectionsIcon />
            </IconButton>
          </Box>
          <Typography variant='h3' fontSize={18} color='#695B6E' >
            @{userData.username}
          </Typography>
        </Box>
      </Box>

      <Box className={styles.bottom}>
        <Box className={styles.detailsContainer} sx={{ width: "100%" }}>
          {/* <Grid container p={2}>
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
              <Typography sx={{ textAlign: 'left', mt: 1 }} variant='h3' fontSize={14}>
                Nov 1, 2021
              </Typography>
            </Grid>
          </Grid> */}

          <Divider sx={{ mb: 3 }} light className={styles.divider} />
          <Grid container>
            <Grid item md={3} sx={{ textAlign: 'center' }}>
              <Typography variant='caption' fontSize={14}>
                Followers
              </Typography>
              <Typography onClick={handleOpenFollowersModal} sx={{ cursor: 'pointer' }} variant='h3' color='#6931F9' fontSize={16}>
                {totalFollowers || 0}
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
                {totalFollowing || 0}
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
                {totalPosts || 0}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box className={styles.btnSection}>
          <Button className={styles.bottomBtn} startIcon={isFollowing ? <CheckOutlined /> : <PersonAddAltIcon />} variant='contained' onClick={followAction}>
            {
              isFollowing ? 'Following' : 'Follow'
            }
          </Button>
          <Button className={styles.bottomBtn} variant='outlined'>
            Message
          </Button>
        </Box>
      </Box>

      <>
        <FollowersModal handleClose={handleCloseFollowersModal} userData={userData} showModal={openFollowersModal} listType="followers" />

        <FollowersModal handleClose={handleCloseFollowingModal} userData={userData} showModal={openFollowingModal} listType="following" />
      </>
    </Box >
  )
}
export default OtherProfileCard;