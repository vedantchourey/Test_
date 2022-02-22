import React, { useState } from 'react';
import { Avatar, Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import { CheckOutlined } from '@mui/icons-material'
import styles from './other-profile-card.module.css'
import CollectionsIcon from '@mui/icons-material/Collections';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { IProfileResponse } from "../../../service-clients/messages/i-profile";
import { followUser, unFollowUser } from '../../../service-clients/follow-service';

const OtherProfileCard = (props: { userData: IProfileResponse }): JSX.Element => {
  const [userData, setUserData] = useState(props.userData)
  const {
    firstName,
    lastName,
    state,
    country,
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
          isFollowing: true
        }
      })
      // eslint-disable-next-line no-useless-return
      return;
    }
    unFollowUser(userData.id);
    setUserData((prev) => {
      return {
        ...prev,
        isFollowing: false
      }
    })

  }

  return (
    <Box className={styles.otherProfileCard}>
      <Box className={styles.background}>
        <Box className={styles.profileSection}>
          <Box sx={{ position: 'relative' }}>
            <Avatar sx={{ width: 85, height: 85, marginBottom: 2 }} alt="Remy Sharp" src="" />
            <IconButton className={styles.selectImg} >
              {/* <img src='icons/gallery.svg' alt='icon' /> */}
              <CollectionsIcon />
            </IconButton>
          </Box>
          <Typography variant='h2' fontSize={24} my={2} sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography variant='h3' fontSize={18} color='#695B6E' >
            {`${state?.displayName}, ${country?.displayName} `}
          </Typography>
        </Box>
      </Box>

      <Box className={styles.bottom}>
        <Box sx={{ width: "100%" }}>
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

          <Divider sx={{ mb: 3 }} light />
          <Grid container>
            <Grid item md={3} sx={{ textAlign: 'center' }}>
              <Typography variant='caption' fontSize={14}>
                Followers
              </Typography>
              <Typography variant='h3' color='#6931F9' fontSize={16}>
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
              <Typography variant='h3' color='#6931F9' fontSize={16}>
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
    </Box >
  )
}
export default OtherProfileCard;