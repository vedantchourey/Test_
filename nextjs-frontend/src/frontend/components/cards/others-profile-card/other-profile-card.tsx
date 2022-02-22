import React from 'react';
import { Avatar, Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import styles from './other-profile-card.module.css'
import CollectionsIcon from '@mui/icons-material/Collections';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { IProfileResponse } from "../../../service-clients/messages/i-profile";

const OtherProfileCard = (props: { userData: IProfileResponse }): JSX.Element => {
  const {
    firstName,
    lastName,
    state,
    country
  } = props.userData;
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
                555 K
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
                555
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
                55
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box className={styles.btnSection}>
          <Button className={styles.bottomBtn} startIcon={<PersonAddAltIcon />} variant='contained'>
            Follow
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