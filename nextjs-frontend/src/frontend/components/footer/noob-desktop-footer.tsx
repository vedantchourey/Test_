import React from 'react';
import {
  Container,
  Grid,
  IconButton,
  // IconButton,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import styles from "./noob-footer.module.css"
import { Box } from '@mui/system';
import { Instagram, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import router from 'next/router';

export default function NoobDesktopFooter(): JSX.Element {

  const items = [
    {
      title: 'About us',
      path: '/about-us'
    },
    {
      title: 'How it Works',
      path: '/how-it-works'
    },
    {
      title: 'Terms of Service',
      path: '/'
    },
    {
      title: 'Privacy Policy',
      path: '/'
    },
    {
      title: 'FAQ',
      path: '/faq'
    },
    {
      title: 'Disputes and Code of Conduct',
      path: '/disputes'
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
  
  async function gotoYoutubeLink(): Promise<void> {
    await router.push('https://www.youtube.com/@noobstormgaming4953/featured')
  }

  async function gotoTwitterLink(): Promise<void> {
    await router.push('https://twitter.com/NoobstormGaming')
  }

  async function gotoInstagramLink(): Promise<void> {
    await router.push('https://www.instagram.com/noobstorm_gaming/')
  }

  async function gotoLinkedInLink(): Promise<void> {
    await router.push('https://www.linkedin.com/company/noobstorm-gaming/about/?viewAsMember=true')
  }

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
              <IconButton
                size="medium"
                color="default"
                aria-label="Instagram"
                component="span"
                onClick={gotoInstagramLink}
              >
                <Instagram />
              </IconButton>
              <IconButton
                size="medium"
                color="default"
                aria-label="Twitter"
                component="span"
                onClick={gotoTwitterLink}
              >
                <Twitter />
              </IconButton>
              <IconButton
                size="medium"
                color="default"
                aria-label="LinkedIn"
                component="span"
                onClick={gotoLinkedInLink}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                size="medium"
                color="default"
                aria-label="Youtube"
                component="span"
                onClick={gotoYoutubeLink}
              >
                <YouTube />
              </IconButton>
              
            </Box>
          </Grid>
        </Grid>
        <Typography color={"rgba(255,255,255,0.5)"} variant="subtitle1" style={{ fontSize: "13px" }} textAlign={"center"} mt={4}>
        Copyright © 2022. All Rights Reserved By NOOBSTORM
      </Typography>
      <Typography color={"rgba(255,255,255,0.5)"} variant="subtitle1" style={{ fontSize: "13px" }} textAlign={"center"} mt={1}>
      EA Sports and the EA Sports logo are trademarks of Electronic Arts, Inc. All rights reserved. Electronic Arts, Inc is not affiliated with noobstorm.gg. 2K Games is a registered trademark of Take-Two Interactive Software, Inc. All rights reserved. Take-Two Interactive Software, Inc is not affiliated with noobstorm.gg. Xbox and Xbox One are registered trademarks of Microsoft Corporation. All rights reserved. Microsoft Corporation is not affiliated with noobstorm.gg. Playstation and Playstation 5 are registered trademarks of Sony Computer Entertainment. All rights reserved. Sony Computer Entertainment is not affiliated with noobstorm.gg. Wii is a registered trademark of Nintendo of America Inc. All rights reserved. Nintendo of America Inc. is not affiliated with noobstorm.gg. All other trademarks are the property of their respective owners.
      </Typography>
      </Container>
    </div >
  )
}
