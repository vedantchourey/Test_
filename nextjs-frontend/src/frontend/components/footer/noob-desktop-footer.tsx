import React from 'react';
import {
  Container,
  Grid,
  // IconButton,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import styles from "./noob-footer.module.css"
import { Box } from '@mui/system';

export default function NoobDesktopFooter(): JSX.Element {

  const items = [
    {
      title: 'About us',
      path: '/'
    },
    {
      title: 'How it Works',
      path: '/'
    },
    {
      title: 'Terms of Service',
      path: '/'
    },
    {
      title: 'Privacy Policy',
      path: '/'
    }
  ]
  const items2 = [
    {
      title: 'Business Inquiries',
      path: '/'
    },
    {
      title: 'Help Center',
      path: '/support'
    }
  ]

  return (
    <div className={styles.footerContainer}>
      <Container maxWidth='lg'>
        <Grid container>
          <Grid item md={7}>
            <Box className={styles.heading}>
              <Typography color={"default"} variant="h3" mb={2}>
                Learn More
              </Typography>
              <div className={styles.headingBorder} />
            </Box>
            <List>
              {items.map((data, i) => (
                <ListItem key={i} disablePadding >
                  <Link href={data.path} underline="none">
                    <Typography color={"#7B7588"} variant="body1" mb={1}>
                      {data.title}
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
            {/* <Box>
              <Box sx={{ mt: 4, display: 'inline-flex', mb: 2 }}>
                <Typography color={"white"} variant="body2">
                  Terms of Service
                </Typography>
                <div className={styles.customeDivider} />
                <Typography color={"white"} variant="body2">
                  Terms of Service
                </Typography>
              </Box>
              <Typography color={"white"} variant="body2">
                Do Not Sell My Personal Information
              </Typography>
            </Box> */}
          </Grid>
          <Grid item md={5}>
            <Box className={styles.heading}>
              <Typography color={"default"} variant="h3" mb={2}>
                Contact Us
              </Typography>
              <div className={styles.headingBorder} />
            </Box>
            <List>
              {items2.map((data, i) => (
                <ListItem key={i} disablePadding >
                  <Link href={data.path} underline="none">
                    <Typography color={"#7B7588"} variant="body1" mb={1}>
                      {data.title}
                    </Typography>
                  </Link>
                </ListItem>
              ))}
            </List>
            <Box mt={5}>
              {/* <IconButton color="default" aria-label="Youtube" component="span">
                <img src='/icons/twitter.svg' alt='twitter icon' />
              </IconButton>
              <IconButton color="default" aria-label="Twitch" component="span">
                <img src='/icons/facebook.svg' alt='twitter icon' />
              </IconButton>
              <IconButton color="default" aria-label="Discord" component="span">
                <img src='/icons/youtube.svg' alt='twitter icon' />
              </IconButton> */}
            </Box>
          </Grid>
        </Grid>
        <Typography color={"rgba(255,255,255,0.5)"} variant="subtitle1" style={{ fontSize: "13px" }} textAlign={"center"} mt={4}>
        Copyright © 2021. All Rights Reserved By NOOBSTORM
      </Typography>
      </Container>
    </div >
  )
}
